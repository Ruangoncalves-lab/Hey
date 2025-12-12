import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
    console.error('❌ Error: DATABASE_URL is missing in .env');
    process.exit(1);
}

const client = new pg.Client({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false }
});

async function testMetaDb() {
    try {
        await client.connect();
        console.log('✅ Connected to PostgreSQL');

        // 1. Check if tables exist
        const tables = ['meta_tokens', 'meta_ad_accounts', 'meta_campaigns', 'meta_ad_sets', 'meta_ads', 'meta_metrics'];
        console.log('\n--- Checking Tables ---');
        for (const table of tables) {
            const res = await client.query(`
                SELECT EXISTS (
                    SELECT FROM information_schema.tables 
                    WHERE table_schema = 'public' 
                    AND table_name = $1
                );
            `, [table]);
            const exists = res.rows[0].exists;
            if (exists) {
                console.log(`✅ Table '${table}' exists.`);
            } else {
                console.error(`❌ Table '${table}' DOES NOT exist.`);
            }
        }

        // 2. Test Insert (requires a valid user_id from auth.users, which we might not have easily)
        // Instead, we will just check the table structure by querying it (empty result is fine)
        console.log('\n--- Checking Table Access (Select) ---');
        try {
            const res = await client.query('SELECT count(*) FROM meta_ad_accounts');
            console.log(`✅ Select from meta_ad_accounts successful. Count: ${res.rows[0].count}`);
        } catch (err) {
            console.error('❌ Select from meta_ad_accounts failed:', err.message);
        }

        console.log('\n✅ Database verification complete.');

    } catch (err) {
        console.error('❌ Database connection failed:', err);
    } finally {
        await client.end();
    }
}

testMetaDb();
