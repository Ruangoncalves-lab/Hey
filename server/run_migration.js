import pg from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const runMigration = async () => {
    console.log('Running migration...');

    const connectionString = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;

    if (!connectionString) {
        console.error('Error: DATABASE_URL or SUPABASE_DB_URL not found in .env');
        process.exit(1);
    }

    const client = new pg.Client({
        connectionString,
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();
        console.log('Connected to database.');

        const schemaPath = path.join(__dirname, 'alter_users_table.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');

        console.log('Executing SQL...');
        await client.query(schemaSql);

        console.log('Migration complete!');

    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        await client.end();
    }
};

runMigration();
