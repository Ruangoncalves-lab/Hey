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

const addMetricsColumns = async () => {
    const client = await pool.connect();
    try {
        console.log('Adding missing columns to metrics table...');

        await client.query(`
            ALTER TABLE metrics 
            ADD COLUMN IF NOT EXISTS entity_id TEXT,
            ADD COLUMN IF NOT EXISTS entity_type TEXT,
            ADD COLUMN IF NOT EXISTS platform TEXT,
            ADD COLUMN IF NOT EXISTS date TIMESTAMP,
            ADD COLUMN IF NOT EXISTS granularity TEXT,
            ADD COLUMN IF NOT EXISTS metrics JSONB;
        `);

        console.log('Metrics columns added successfully!');
    } catch (err) {
        console.error('Error adding columns:', err);
    } finally {
        client.release();
        await pool.end();
    }
};

addMetricsColumns();
