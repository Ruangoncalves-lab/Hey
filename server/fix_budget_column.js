import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

const fixBudget = async () => {
    const client = await pool.connect();
    try {
        console.log('Fixing budget column type...');

        // Drop the column and re-add it as JSONB (safe since table is empty-ish)
        await client.query(`
            ALTER TABLE campaigns 
            DROP COLUMN IF EXISTS budget;

            ALTER TABLE campaigns
            ADD COLUMN budget JSONB;
        `);

        console.log('Budget column fixed!');
    } catch (err) {
        console.error('Error fixing budget:', err);
    } finally {
        client.release();
        await pool.end();
    }
};

fixBudget();
