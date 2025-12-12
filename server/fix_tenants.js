import { User, Tenant } from './models/index.js';
import dotenv from 'dotenv';

dotenv.config();

const checkUsers = async () => {
    console.log('Checking users and tenant IDs...');
    try {
        const users = await User.find({});
        console.log(`Found ${users.length} users.`);

        for (const user of users) {
            console.log(`User: ${user.email}, ID: ${user._id}, TenantID: ${user.tenant_id}`);

            if (!user.tenant_id) {
                console.log(`WARNING: User ${user.email} has NO tenant_id. Fixing...`);

                // Check if a tenant exists for this user (maybe by name?)
                // Or just create a new one.
                let tenant = await Tenant.findOne({ name: `${user.name}'s Organization` });
                if (!tenant) {
                    console.log('Creating new tenant...');
                    tenant = await Tenant.create({
                        name: `${user.name}'s Organization`,
                        plan: 'free'
                    });
                }

                user.tenant_id = tenant._id;
                await user.save();
                console.log(`FIXED: Assigned tenant ${tenant._id} to user ${user.email}`);
            }
        }
    } catch (error) {
        console.error('Error checking users:', error);
    }
    process.exit();
};

checkUsers();
