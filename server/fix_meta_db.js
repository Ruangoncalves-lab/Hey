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

const fixDatabase = async () => {
    const client = await pool.connect();
    try {
        console.log('Cleaning up duplicate connections...');

        // 1. Remove duplicates (keep latest)
        await client.query(`
            DELETE FROM connections a USING connections b
            WHERE a._id < b._id 
            AND a.tenant_id = b.tenant_id 
            AND a.platform = b.platform;
        `);

        console.log('Adding unique constraint to connections table...');

        // 2. Add Unique Constraint
        await client.query(`
            ALTER TABLE connections 
            ADD CONSTRAINT unique_tenant_platform UNIQUE (tenant_id, platform);
        `);

        console.log('Database fixed successfully!');
    } catch (err) {
        if (err.code === '42710') {
            console.log('Constraint already exists, skipping.');
        } else {
            console.error('Error fixing database:', err);
        }
    } finally {
        client.release();
        await pool.end();
    }
};

fixDatabase();
