import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { fetchMetaAdAccounts, syncMetaAccount } from './services/metaService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const fixAndSync = async () => {
    console.log('Finding active connection...');
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

    console.log(`Current Account ID: ${connection.account_id}`);
    console.log('Fetching available ad accounts...');

    try {
        const accounts = await fetchMetaAdAccounts(connection.access_token);
        console.log(`Found ${accounts.length} accounts.`);

        if (accounts.length === 0) {
            console.error('No ad accounts found for this token.');
            return;
        }

        const firstAccount = accounts[0];
        console.log(`Selecting first account: ${firstAccount.name} (${firstAccount.id})`);

        // Update connection with correct Ad Account ID
        const { error: updateError } = await supabase
            .from('connections')
            .update({
                account_id: firstAccount.id // Already has act_ prefix from service
            })
            .eq('_id', connection._id);

        if (updateError) {
            console.error('Failed to update connection:', updateError);
            return;
        }

        console.log('Connection updated. Starting sync...');

        // Refresh connection object
        const updatedConnection = { ...connection, account_id: firstAccount.id };
        const result = await syncMetaAccount(updatedConnection);
        console.log('Sync result:', result);

    } catch (err) {
        console.error('Error:', err.message);
        if (err.response && err.response.data) {
            console.error('API Error Details:', JSON.stringify(err.response.data, null, 2));
        }
    }
};

fixAndSync();
