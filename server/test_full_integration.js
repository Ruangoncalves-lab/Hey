import { User, Tenant } from './models/index.js';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const API_URL = 'http://localhost:5000/api';

async function runTest() {
    console.log('--- Starting Full Integration Test ---');

    try {
        // 1. Setup User and Tenant
        console.log('1. Setting up Test User and Tenant...');
        const email = 'test_integration@traffic.com';
        let user = await User.findOne({ email });
        let tenant;

        if (!user) {
            console.log('Creating new test user...');
            tenant = await Tenant.create({
                name: 'Test Integration Tenant',
                plan: 'pro'
            });

            const salt = await bcrypt.genSalt(10);
            const password_hash = await bcrypt.hash('123456', salt);

            user = await User.create({
                name: 'Test User',
                email,
                password_hash,
                tenant_id: tenant._id,
                role: 'admin'
            });
        } else {
            console.log('Test user found.');
            tenant = await Tenant.findById(user.tenant_id);
        }

        console.log(`User ID: ${user._id}`);
        console.log(`Tenant ID: ${tenant._id}`);

        // 2. Generate Token
        console.log('2. Generating JWT...');
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1h' }
        );
        console.log('Token generated.');

        // 3. Test Meta Accounts Endpoint
        console.log('3. Testing Protected Meta Endpoint...');
        const endpoint = `${API_URL}/tenants/${tenant._id}/connections/meta/accounts`;
        console.log(`POST ${endpoint}`);

        try {
            const response = await axios.post(
                endpoint,
                { access_token: 'INVALID_TOKEN_FOR_TESTING' },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('Response:', response.data);
        } catch (error) {
            if (error.response) {
                console.log('✅ API Error Response Received:');
                console.log('Status:', error.response.status);
                console.log('Data:', error.response.data);

                if (error.response.status === 500 && error.response.data.code === 'META_API_ERROR') {
                    console.log('✅ SUCCESS: The controller handled the error gracefully!');
                } else {
                    console.log('⚠️ WARNING: Status code or error format might not be exactly as expected, but it did not crash.');
                }
            } else {
                console.error('❌ Request failed completely:', error.message);
            }
        }

    } catch (err) {
        console.error('❌ Test Setup Failed:', err);
    } finally {
        process.exit();
    }
}

runTest();
