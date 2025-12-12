import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const checkUserPostgres = async () => {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        console.error('DATABASE_URL not found');
        return;
    }

    const client = new pg.Client({
        connectionString,
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();
        const email = 'ruan.silva.gon@gmail.com';

        console.log(`Checking auth.users for ${email}...`);
        const authRes = await client.query('SELECT id, email, encrypted_password FROM auth.users WHERE email = $1', [email]);

        if (authRes.rows.length === 0) {
            console.log('User NOT found in auth.users');
        } else {
            console.log('User FOUND in auth.users:', authRes.rows[0]);
            const userId = authRes.rows[0].id;

            console.log(`Checking public.users for ${userId}...`);
            const publicRes = await client.query('SELECT * FROM public.users WHERE id = $1', [userId]);

            if (publicRes.rows.length === 0) {
                console.log('User NOT found in public.users (Profile missing)');
                // Create profile if missing
                console.log('Creating missing profile...');
                await client.query(`
                    INSERT INTO public.users (id, email, name, role)
                    VALUES ($1, $2, $3, 'admin')
                `, [userId, email, 'Ruan']);
                console.log('Profile created.');
            } else {
                console.log('User FOUND in public.users:', publicRes.rows[0]);
            }
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.end();
    }
};

checkUserPostgres();
