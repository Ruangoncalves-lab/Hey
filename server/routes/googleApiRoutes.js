import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Middleware to get user's Google Token
const getGoogleToken = async (req, res, next) => {
    const userId = req.headers['x-user-id']; // Passed from frontend or extracted from session
    if (!userId) return res.status(401).json({ error: 'User ID required' });

    const { data, error } = await supabase
        .from('google_tokens')
        .select('*')
        .eq('user_id', userId)
        .single();

    if (error || !data) return res.status(401).json({ error: 'Google Token not found' });

    req.googleToken = data.access_token;
    req.refreshToken = data.refresh_token;
    next();
};

// 1. List Accounts (Accessible Customers)
router.get('/accounts', getGoogleToken, async (req, res) => {
    try {
        // In a real implementation, you would use the Google Ads API library
        // const customerService = client.getService('CustomerService');
        // const customers = await customerService.listAccessibleCustomers();

        // Mock response for now as setting up full Google Ads API client requires complex proto setup
        const mockAccounts = [
            { resourceName: 'customers/1234567890', id: '1234567890', descriptiveName: 'My Google Ads Account 1', currencyCode: 'BRL', timeZone: 'America/Sao_Paulo' },
            { resourceName: 'customers/0987654321', id: '0987654321', descriptiveName: 'Client Account A', currencyCode: 'USD', timeZone: 'America/New_York' }
        ];

        res.json(mockAccounts);
    } catch (error) {
        console.error('Google API Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// 2. Save Selected Accounts
router.post('/accounts/select', async (req, res) => {
    const { userId, accounts } = req.body;

    try {
        for (const acc of accounts) {
            await supabase.from('google_ad_accounts').upsert({
                user_id: userId,
                customer_id: acc.id,
                descriptive_name: acc.descriptiveName,
                currency_code: acc.currencyCode,
                time_zone: acc.timeZone,
                is_selected: true
            }, { onConflict: 'customer_id' });
        }
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
