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

const addColumns = async () => {
    const client = await pool.connect();
    try {
        console.log('Adding missing columns to campaigns table...');

        await client.query(`
            ALTER TABLE campaigns 
            ADD COLUMN IF NOT EXISTS external_id TEXT,
            ADD COLUMN IF NOT EXISTS performance_summary JSONB,
            ADD COLUMN IF NOT EXISTS platform TEXT,
            ADD COLUMN IF NOT EXISTS objective TEXT,
            ADD COLUMN IF NOT EXISTS budget JSONB,
            ADD COLUMN IF NOT EXISTS start_time TIMESTAMP,
            ADD COLUMN IF NOT EXISTS stop_time TIMESTAMP;
        `);

        console.log('Columns added successfully!');
    } catch (err) {
        console.error('Error adding columns:', err);
    } finally {
        client.release();
        await pool.end();
    }
};

addColumns();
