import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const disableRLS = async () => {
    const connectionString = process.env.DATABASE_URL;
    const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } });

    try {
        await client.connect();
        console.log('Disabling RLS on meta_tokens...');
        await client.query('ALTER TABLE public.meta_tokens DISABLE ROW LEVEL SECURITY');
        console.log('RLS disabled on meta_tokens.');

        console.log('Disabling RLS on meta_ad_accounts...');
        await client.query('ALTER TABLE public.meta_ad_accounts DISABLE ROW LEVEL SECURITY');
        console.log('RLS disabled on meta_ad_accounts.');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.end();
    }
};

disableRLS();
