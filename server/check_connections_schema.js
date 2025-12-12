import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTable() {
    console.log('Checking connections table...');
    const { data, error } = await supabase
        .from('connections')
        .select('*')
        .limit(1);

    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Data:', data);
        if (data.length > 0) {
            console.log('Columns:', Object.keys(data[0]));
        } else {
            console.log('Table exists but is empty. Cannot determine columns easily via select *.');
            // Try to insert a dummy to see error or success
        }
    }
}

checkTable();
