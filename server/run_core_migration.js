import pg from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
    console.error('❌ Error: DATABASE_URL is missing in .env');
    process.exit(1);
}

const client = new pg.Client({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false }
});

async function migrate() {
    try {
        await client.connect();
        console.log('Connected to PostgreSQL...');

        const sqlPath = path.join(__dirname, 'setup_core_tables.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        console.log('Running Core Tables migration...');
        await client.query(sql);

        console.log('✅ Core Tables Migration successful!');
    } catch (err) {
        console.error('❌ Migration failed:', err);
    } finally {
        await client.end();
    }
}

migrate();
