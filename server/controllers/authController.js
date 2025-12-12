import { supabase } from '../config/supabase.js';
import { User, Tenant } from '../models/index.js';

export const register = async (req, res) => {
    const { name, email, password, tenantName } = req.body;

    try {
        // 1. Create user in Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { name }
            }
        });

        if (authError) {
            return res.status(400).json({ message: authError.message });
        }

        if (!authData.user) {
            return res.status(400).json({ message: 'Falha ao criar usuário no Supabase Auth' });
        }

        // 2. Create Tenant
        const tenant = await Tenant.create({
            name: tenantName || `${name}'s Organization`
        });

        // 3. Create User Profile in public.users linked to auth.users
        const user = await User.create({
            _id: authData.user.id, // Link to Auth ID
            name,
            email,
            tenant_id: tenant._id,
            role: 'admin'
        });

        // Update user metadata with tenant_id for easier access in RLS or frontend
        await supabase.auth.updateUser({
            data: { tenant_id: tenant._id }
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            tenant_id: user.tenant_id,
            token: authData.session?.access_token, // Return Supabase token
        });

    } catch (error) {
        console.error('Register Error:', error);
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Sign in with Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (authError) {
            console.error('Supabase Auth Error:', authError);
            if (authError.message.includes('Email not confirmed')) {
                return res.status(401).json({ message: 'Antes de se conectar, verifique o seu e-mail e ative a sua conta' });
            }
            return res.status(401).json({ message: 'Email ou senha inválidos' });
        }

        if (!authData.session) {
            // Sometimes Supabase returns no error but no session if unconfirmed or other issues
            return res.status(401).json({ message: 'Antes de se conectar, verifique o seu e-mail e ative a sua conta' });
        }

        // 2. Fetch User Profile
        let user = await User.findById(authData.user.id);

        // Self-healing: If profile doesn't exist but Auth does, create it
        if (!user) {
            console.log('User profile missing for Auth ID, attempting recovery...');

            // Try finding by email first to link if possible (legacy migration case)
            const existingUserByEmail = await User.findOne({ email });

            if (existingUserByEmail) {
                // Link existing legacy profile to new Auth ID
                // Note: This requires manual DB update usually, but here we can try to update the ID if your schema allows, 
                // OR just create a new one and maybe warn. 
                // Ideally, we should just create a new profile if it's a fresh Supabase setup.
                console.log('Found existing profile by email, but ID mismatch. Creating new linked profile.');
            }

            // Create new Tenant and User Profile on the fly
            const tenant = await Tenant.create({
                name: `${authData.user.user_metadata?.name || 'User'}'s Organization`
            });

            user = await User.create({
                _id: authData.user.id,
                name: authData.user.user_metadata?.name || 'User',
                email: email,
                tenant_id: tenant._id,
                role: 'admin'
            });

            // Sync tenant_id to Auth metadata
            await supabase.auth.updateUser({
                data: { tenant_id: tenant._id }
            });
        }

        if (!user) {
            return res.status(404).json({ message: 'Perfil de usuário não pôde ser criado ou encontrado.' });
        }

        // Update last login
        await supabase.from('users').update({ last_login: new Date() }).eq('_id', user._id);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            tenant_id: user.tenant_id,
            token: authData.session.access_token,
        });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: error.message });
    }
};

export const getMe = async (req, res) => {
    try {
        // req.user is populated by middleware (we need to ensure middleware uses Supabase token verification)
        // For now, let's assume the middleware extracts the user ID correctly or we fetch it from Supabase

        // If middleware sets req.user (from local JWT logic previously), we might need to adjust.
        // But if we are transitioning, let's assume we want to fetch by the ID passed in req.user._id

        const user = await User.findById(req.user._id);
        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                tenant_id: user.tenant_id
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
