import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

router.post('/:platform', async (req, res) => {
    const { platform } = req.params; // hotmart, eduzz, kiwify
    const payload = req.body;

    console.log(`Received webhook from ${platform}:`, payload);

    try {
        let transactionId, value, status, tm_cid, tm_aid;

        // Normalization Logic
        if (platform === 'hotmart') {
            transactionId = payload.transaction;
            value = payload.price;
            status = payload.status;
            // Hotmart sends custom args in 'xcod' or similar if configured, 
            // or we parse 'src' param if passed through checkout
            tm_cid = payload.tm_cid || payload.xcod?.split('_')[0];
            tm_aid = payload.tm_aid || payload.xcod?.split('_')[1];
        } else if (platform === 'eduzz') {
            transactionId = payload.trans_cod;
            value = payload.trans_value;
            status = payload.trans_status;
            tm_cid = payload.tm_cid;
            tm_aid = payload.tm_aid;
        } else {
            // Generic/Fallback
            transactionId = payload.id || payload.transaction_id;
            value = payload.value || payload.amount;
            status = payload.status;
            tm_cid = payload.tm_cid;
            tm_aid = payload.tm_aid;
        }

        // Save Conversion
        const { error } = await supabase.from('conversions').upsert({
            transaction_id: transactionId,
            platform,
            value,
            status,
            tm_cid,
            tm_aid,
            tm_plat: payload.tm_plat || 'unknown',
            meta_data: payload
        });

        if (error) throw error;

        // Attribution Logic (Simple)
        if (tm_aid) {
            await supabase.from('metrics_attribution').insert({
                conversion_id: transactionId,
                ad_id: tm_aid,
                platform: payload.tm_plat,
                attributed_value: value,
                attribution_date: new Date()
            });
        }

        res.json({ success: true });

    } catch (error) {
        console.error('Webhook Error:', error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
