import { User, Tenant } from './models/index.js';
import dotenv from 'dotenv';

dotenv.config();

const verify = async () => {
    console.log('Verifying database...');

    try {
        const users = await User.find({});
        console.log(`Found ${users.length} users.`);
        users.forEach(u => console.log(`- ${u.email} (Tenant: ${u.tenant_id})`));

        const tenants = await Tenant.find({});
        console.log(`Found ${tenants.length} tenants.`);
        tenants.forEach(t => console.log(`- ${t.name} (ID: ${t._id})`));

    } catch (error) {
        console.error('Verification failed:', error);
    }
    process.exit();
};

verify();
