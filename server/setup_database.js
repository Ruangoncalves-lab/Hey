import pg from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const setup = async () => {
    console.log('Setting up database...');

    const connectionString = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;

    if (!connectionString) {
        console.error('Error: DATABASE_URL or SUPABASE_DB_URL not found in .env');
        console.log('Please add your Supabase connection string to .env file.');
        process.exit(1);
    }

    const client = new pg.Client({
        connectionString,
        ssl: { rejectUnauthorized: false } // Supabase requires SSL
    });

    try {
        await client.connect();
        console.log('Connected to database.');

        const schemaPath = path.join(__dirname, 'database_schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');

        console.log('Executing schema...');
        await client.query(schemaSql);

        console.log('Database setup complete!');
        console.log('Tables created successfully.');

    } catch (err) {
        console.error('Database setup failed:', err);
    } finally {
        await client.end();
    }
};

setup();
