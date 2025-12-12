import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const testColumns = async () => {
    console.log('Testing columns...');

    // Try inserting with meta_campaign_id
    const { error: error1 } = await supabase
        .from('campaigns')
        .insert({
            name: 'Test Column Meta',
            meta_campaign_id: 'test_123',
            tenant_id: 'test_tenant'
        });

    if (error1) {
        console.log('meta_campaign_id failed:', error1.message);
    } else {
        console.log('meta_campaign_id worked!');
    }

    // Try inserting with external_id
    const { error: error2 } = await supabase
        .from('campaigns')
        .insert({
            name: 'Test Column External',
            external_id: 'test_456',
            tenant_id: 'test_tenant'
        });

    if (error2) {
        console.log('external_id failed:', error2.message);
    } else {
        console.log('external_id worked!');
    }
};

testColumns();
