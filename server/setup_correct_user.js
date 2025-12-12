import { supabase } from './config/supabase.js';
import axios from 'axios';

const email = 'ruan.silva.gon@gmail.com';
const password = '33642518';
const name = 'Ruan Gonçalves';

async function setupUser() {
    console.log(`Setting up user: ${email}`);

    // 1. Clean up first (just in case)
    await supabase.from('users').delete().eq('email', email);
    // Note: We can't easily delete from Auth without service key, but if the previous script created it, 
    // we might need to use the same auth user or hope the register endpoint handles "User already exists" gracefully 
    // by just ensuring the DB profile exists.

    // Actually, since I don't have the service key to delete the Auth user I just created with the WRONG password,
    // I am in a bit of a bind if I want to set the password to '33642518'.
    // The only way to change the password is if I am logged in or use the admin api.

    // Let's try to Sign In with the temp password, then Update User to the desired password.
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: 'temp_password_123'
    });

    if (signInData.session) {
        console.log('Logged in with temp password. Updating to desired password...');
        const { error: updateError } = await supabase.auth.updateUser({ password: password });
        if (updateError) console.error('Error updating password:', updateError);
        else console.log('✅ Password updated to: 33642518');
    } else {
        console.log('Could not login with temp password. Maybe user does not exist or password wrong.');
        // If user doesn't exist, we register fresh.
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', {
                name,
                email,
                password,
                tenantName: 'TrafficMaster'
            });
            console.log('✅ Registration successful:', res.data);
        } catch (e) {
            console.error('Registration failed:', e.response?.data || e.message);
        }
    }
}

setupUser();
