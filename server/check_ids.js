import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY; // Use service role key if possible, but anon key might work for public tables if RLS allows

const supabase = createClient(supabaseUrl, supabaseKey);

const checkIds = async () => {
    const userId = '5773a8c9-4300-4030-bd57-803ac7780fd8';
    const tenantId = '6c7282b1-88c2-47fc-a27a-a7861c37dd35';

    console.log('Checking User ID:', userId);
    const { data: user, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('_id', userId)
        .single();

    if (userError) console.error('User Error:', userError);
    else console.log('User Found:', user);

    console.log('Checking Tenant ID:', tenantId);
    const { data: tenant, error: tenantError } = await supabase
        .from('tenants')
        .select('*')
        .eq('_id', tenantId)
        .single();

    if (tenantError) console.error('Tenant Error:', tenantError);
    else console.log('Tenant Found:', tenant);
};

checkIds();
