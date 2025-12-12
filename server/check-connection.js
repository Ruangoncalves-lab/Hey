import { supabase } from './config/supabase.js';

async function check() {
    console.log('Checking Supabase connection with SELECT...');
    const { data, error } = await supabase.from('users').select('*').limit(1);

    if (error) {
        console.error('Connection Error:', error);
        if (error.code === '42P01' || error.message.includes('does not exist')) {
            console.log('❌ Table "users" does not exist.');
        }
    } else {
        console.log('✅ Connected and "users" table exists!');
        console.log('Data:', data);
    }
}

check();
