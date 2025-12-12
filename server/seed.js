import dotenv from 'dotenv';
import { Tenant, User } from './models/index.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const seed = async () => {
    try {
        console.log('Starting Supabase Seed...');

        // Supabase uses UUIDs, so we can't force a 24-char hex ID unless we change the schema or use a UUID.
        // Let's use a fixed UUID for consistency if possible, or just let it generate one.
        // But for the user to be linked, we need to know the tenant ID.

        // Let's try to find or create the tenant first.
        const tenantName = 'Demo Tenant';
        let tenant = await Tenant.findOne({ name: tenantName });

        if (!tenant) {
            tenant = await Tenant.create({
                name: tenantName,
                plan: 'pro'
            });
            console.log('Tenant created:', tenant._id);
        } else {
            console.log('Tenant already exists:', tenant._id);
        }

        // Create a demo user if not exists
        const email = 'demo@trafficpro.com';
        let user = await User.findOne({ email });

        if (!user) {
            const salt = await bcrypt.genSalt(10);
            const password_hash = await bcrypt.hash('123456', salt);

            user = await User.create({
                name: 'Demo User',
                email,
                password_hash,
                tenant_id: tenant._id,
                role: 'admin'
            });
            console.log('User created:', user.email);
        } else {
            // Update tenant_id if it's different (fixing the "Tenant not found" issue)
            if (user.tenant_id !== tenant._id) {
                console.log('Updating user tenant_id...');
                user.tenant_id = tenant._id;
                await user.save();
                console.log('User tenant_id updated.');
            } else {
                console.log('User already exists and linked to correct tenant.');
            }
        }

        console.log('✅ Seed completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Seed error:', error);
        process.exit(1);
    }
};

seed();
