import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const checkUser = async () => {
    const email = 'ruan.silva.gon@gmail.com';
    console.log(`Checking user: ${email}`);

    // Check auth.users (requires service role)
    const { data: { users }, error } = await supabase.auth.admin.listUsers();

    if (error) {
        console.error('Error listing users:', error);
        return;
    }

    const user = users.find(u => u.email === email);

    if (user) {
        console.log('User found in auth.users:', user.id);

        // Check public.users
        const { data: publicUser, error: publicError } = await supabase
            .from('users')
            .select('*')
            .eq('id', user.id)
            .single();

        if (publicError) {
            console.log('User NOT found in public.users (Profile missing).');
        } else {
            console.log('User found in public.users:', publicUser);
        }
    } else {
        console.log('User NOT found in auth.users.');
    }
};

checkUser();
