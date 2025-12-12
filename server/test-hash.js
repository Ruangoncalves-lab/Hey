import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'data.json');

const verifyPassword = async () => {
    try {
        const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
        const user = data.users[0];
        console.log('User:', user.email);
        console.log('Hash:', user.password_hash);

        const isMatch = await bcrypt.compare('123456', user.password_hash);
        console.log('Password "123456" matches:', isMatch);
    } catch (e) {
        console.error(e);
    }
};

verifyPassword();
