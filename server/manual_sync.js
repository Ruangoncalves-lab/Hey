import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { syncMetaAccount } from './services/metaService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const runSync = async () => {
    console.log('Fetching active connection...');
    const { data: connection, error } = await supabase
        .from('connections')
        .select('*')
        .eq('platform', 'meta')
        .eq('status', 'active')
        .single();

    if (error || !connection) {
        console.error('No active connection found:', error);
        return;
    }

    console.log(`Starting sync for tenant ${connection.tenant_id}...`);
    try {
        const result = await syncMetaAccount(connection);
        console.log('Sync result:', result);
    } catch (err) {
        console.error('Sync failed:', err);
    }
};

runSync();
