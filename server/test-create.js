import { supabase } from './config/supabase.js';

async function testCreate() {
    console.log('Testing raw insert...');
    const { data, error } = await supabase
        .from('users')
        .insert({
            email: 'test' + Date.now() + '@example.com'
        })
        .select();

    if (error) {
        console.error('Insert Error:', error);
    } else {
        console.log('Insert Success:', data);
    }
}

testCreate();
