import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

// 1. Initiate OAuth
router.get('/login', (req, res) => {
    const scope = [
        'https://www.googleapis.com/auth/adwords'
    ].join(' ');

    const state = req.query.userId; // Pass userId in state to persist it

    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=${scope}&access_type=offline&prompt=consent&state=${state}`;

    res.json({ url });
});

// 2. Callback
router.get('/callback', async (req, res) => {
    const { code, state: userId } = req.query;

    if (!code) return res.status(400).send('No code provided');

    try {
        // Exchange code for tokens
        const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                code,
                client_id: GOOGLE_CLIENT_ID,
                client_secret: GOOGLE_CLIENT_SECRET,
                redirect_uri: GOOGLE_REDIRECT_URI,
                grant_type: 'authorization_code'
            })
        });

        const tokens = await tokenRes.json();

        if (tokens.error) throw new Error(tokens.error_description || tokens.error);

        // Save to DB
        const { error } = await supabase.from('google_tokens').insert({
            user_id: userId,
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token, // Critical for offline access
            expires_at: new Date(Date.now() + tokens.expires_in * 1000),
            scope: tokens.scope
        });

        if (error) throw error;

        // Return HTML to close popup
        res.send(`
            <script>
                if (window.opener) {
                    window.opener.postMessage({ type: 'GOOGLE_AUTH_SUCCESS' }, '*');
                }
                window.close();
            </script>
        `);

    } catch (error) {
        console.error('Google Auth Error:', error);
        res.status(500).send(`
            <script>
                if (window.opener) {
                    window.opener.postMessage({ type: 'GOOGLE_AUTH_ERROR', message: '${error.message}' }, '*');
                }
                window.close();
            </script>
        `);
    }
});

export default router;
