import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const fixUserPostgres = async () => {
    const connectionString = process.env.DATABASE_URL;
    const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } });

    try {
        await client.connect();
        const email = 'ruan.silva.gon@gmail.com';

        console.log(`Checking auth.users for ${email}...`);
        const authRes = await client.query('SELECT id, email FROM auth.users WHERE email = $1', [email]);

        if (authRes.rows.length === 0) {
            console.log('User NOT found in auth.users. Cannot proceed without auth user.');
            return;
        }

        const userId = authRes.rows[0].id;
        console.log('User FOUND in auth.users:', userId);

        console.log(`Checking public.users for ${userId}...`);
        const publicRes = await client.query('SELECT * FROM public.users WHERE _id = $1', [userId]);

        if (publicRes.rows.length === 0) {
            console.log('User NOT found in public.users. Creating profile...');
            // Need a tenant first?
            // Check if tenant exists
            const tenantRes = await client.query("SELECT _id FROM public.tenants LIMIT 1");
            let tenantId;
            if (tenantRes.rows.length > 0) {
                tenantId = tenantRes.rows[0]._id;
            } else {
                console.log('Creating default tenant...');
                const newTenant = await client.query("INSERT INTO public.tenants (name, plan) VALUES ('Default Tenant', 'pro') RETURNING _id");
                tenantId = newTenant.rows[0]._id;
            }

            await client.query(`
                INSERT INTO public.users (_id, tenant_id, email, name, role, created_at, updated_at)
                VALUES ($1, $2, $3, $4, 'admin', NOW(), NOW())
            `, [userId, tenantId, email, 'Ruan']);
            console.log('Profile created in public.users.');
        } else {
            console.log('User FOUND in public.users:', publicRes.rows[0]);
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.end();
    }
};

fixUserPostgres();
