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

const updateSchema = async () => {
    const client = await pool.connect();
    try {
        console.log('Updating schema for Meta Integration...');

        // Adicionar colunas na tabela connections se não existirem
        await client.query(`
            ALTER TABLE connections 
            ADD COLUMN IF NOT EXISTS long_lived_token text,
            ADD COLUMN IF NOT EXISTS expires_at timestamp with time zone,
            ADD COLUMN IF NOT EXISTS business_id text,
            ADD COLUMN IF NOT EXISTS name text;
        `);

        console.log('Schema updated successfully!');
    } catch (err) {
        console.error('Error updating schema:', err);
    } finally {
        client.release();
        await pool.end();
    }
};

updateSchema();
