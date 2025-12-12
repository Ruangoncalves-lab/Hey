import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, 'server', '.env') });

const checkSchema = async () => {
    const connectionString = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;

    if (!connectionString) {
        console.log('No connection string found');
        return;
    }

    const client = new pg.Client({
        connectionString,
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();
        const res = await client.query(`
            SELECT column_name, is_nullable
            FROM information_schema.columns
            WHERE table_schema = 'public'
            AND table_name = 'users'
            AND column_name = 'password_hash';
        `);
        console.log('Column definition:', res.rows[0]);
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
};

checkSchema();
