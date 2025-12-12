import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase URL or Anon Key missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
}

const url = supabaseUrl || 'https://placeholder.supabase.co';
const key = supabaseAnonKey || 'placeholder';

if (url.includes('placeholder')) {
    console.error('⚠️ SUPABASE URL IS MISSING OR INVALID. Please check your .env file.');
} else {
    console.log('✅ Supabase Client Initialized with URL:', url);
}

export const supabase = createClient(url, key);
