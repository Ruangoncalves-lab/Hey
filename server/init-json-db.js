import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'data.json');

const initDb = async () => {
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash('123456', salt);

    const data = {
        tenants: [
            {
                _id: "tenant_123",
                name: "Demo Tenant",
                plan: "pro",
                settings: { timezone: "UTC", currency: "USD" },
                created_at: new Date(),
                updated_at: new Date()
            }
        ],
        users: [
            {
                _id: "user_123",
                name: "Demo User",
                email: "demo@trafficpro.com",
                password_hash: password_hash,
                tenant_id: "tenant_123",
                role: "admin",
                created_at: new Date(),
                updated_at: new Date()
            }
        ],
        connections: []
    };

    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    console.log('Database initialized with user: demo@trafficpro.com / 123456');
};

initDb();
