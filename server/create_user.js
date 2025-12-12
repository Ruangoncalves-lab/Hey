import { User, Tenant } from './models/index.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const createUser = async () => {
    console.log('Creating user...');

    const email = 'admin@traffic.com';
    const password = '123456';
    const name = 'Admin User';

    try {
        // Check if user exists
        let user = await User.findOne({ email });

        if (user) {
            console.log('User already exists. Updating password...');
            const salt = await bcrypt.genSalt(10);
            user.password_hash = await bcrypt.hash(password, salt);
            await user.save();
            console.log(`Password updated for ${email}`);
        } else {
            console.log('Creating new user...');

            // Create Tenant
            const tenant = await Tenant.create({
                name: 'Admin Organization',
                plan: 'premium'
            });

            const salt = await bcrypt.genSalt(10);
            const password_hash = await bcrypt.hash(password, salt);

            user = await User.create({
                name,
                email,
                password_hash,
                tenant_id: tenant._id,
                role: 'admin'
            });
            console.log(`User created: ${email}`);
        }

        console.log('-----------------------------------');
        console.log('LOGIN CREDENTIALS:');
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        console.log('-----------------------------------');

    } catch (error) {
        console.error('Error:', error);
    }

    process.exit();
};

createUser();
