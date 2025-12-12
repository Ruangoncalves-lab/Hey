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

const fixConnection = async () => {
    console.log('Fixing connection ID...');

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

    if (!connection.account_id.startsWith('act_')) {
        const newId = `act_${connection.account_id}`;
        console.log(`Updating ${connection.account_id} to ${newId}`);

        const { error: updateError } = await supabase
            .from('connections')
            .update({ account_id: newId })
            .eq('_id', connection._id);

        if (updateError) {
            console.error('Update failed:', updateError);
        } else {
            console.log('Update successful.');
        }
    } else {
        console.log('Connection ID already has prefix.');
    }
};

fixConnection();
