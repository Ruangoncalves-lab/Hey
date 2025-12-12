import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const checkSchema = async () => {
    const connectionString = process.env.DATABASE_URL;
    const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } });

    try {
        await client.connect();
        console.log('Checking columns for public.users...');
        const res = await client.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_schema = 'public' AND table_name = 'users'
        `);
        console.table(res.rows);
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
};

checkSchema();
