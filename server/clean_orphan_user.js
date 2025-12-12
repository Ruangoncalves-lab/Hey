import { supabase } from './config/supabase.js';

const emailToDelete = 'ruan.silva.gon@gmail.com';

async function cleanUser() {
    console.log(`Cleaning up orphan profile for: ${emailToDelete}`);

    // Delete from public.users
    const { error } = await supabase
        .from('users')
        .delete()
        .eq('email', emailToDelete);

    if (error) {
        console.error('Error deleting user:', error.message);
    } else {
        console.log('✅ User profile deleted from public.users successfully.');
    }
}

cleanUser();
