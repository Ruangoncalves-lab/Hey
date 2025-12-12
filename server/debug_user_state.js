import { supabase } from './config/supabase.js';

const email = 'ruan.silva.gon@gmail.com';
const password = 'your_password_here'; // We can't set password directly via Admin API easily without service role key for admin methods, 
// but we can delete the user so they can register again cleanly.

async function resetUser() {
    console.log(`Resetting user: ${email}`);

    // 1. Delete from public.users (Profile)
    const { error: dbError } = await supabase
        .from('users')
        .delete()
        .eq('email', email);

    if (dbError) console.error('Error deleting DB profile:', dbError.message);
    else console.log('✅ Deleted DB profile.');

    // 2. Delete from Auth (requires Service Role Key usually, but let's try with what we have or just rely on the user registering again)
    // Since we don't have the service role key exposed in the code snippet we saw, we might be limited.
    // However, if we delete the DB profile, the "Self-healing" login logic I added *should* have worked if the Auth user existed.

    // Let's try to Sign Up again to see if it says "User already exists".
    const { data, error } = await supabase.auth.signUp({
        email,
        password: 'temp_password_123', // Just to check existence
    });

    if (error) {
        console.log('Auth Status:', error.message);
        if (error.message.includes('already registered')) {
            console.log('User exists in Auth. The self-healing should have worked.');
        }
    } else {
        console.log('User was not in Auth, so I just created it.');
    }
}

resetUser();
