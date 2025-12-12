import express from 'express';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';
import { Connection } from '../models/index.js';

const router = express.Router();

// Configuração do Supabase (usando as mesmas vars de ambiente do projeto)
// Note: createClient should be initialized after env vars are loaded, but if it's top level, we need dotenv/config
import 'dotenv/config';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const getMetaConfig = () => {
    return {
        FB_APP_ID: process.env.FB_APP_ID,
        FB_APP_SECRET: process.env.FB_APP_SECRET,
        BASE_URL: process.env.SERVER_URL || 'http://localhost:5000',
        REDIRECT_URI: `${process.env.SERVER_URL || 'http://localhost:5000'}/api/meta-auth/callback`
    };
};

/**
 * GET /api/meta-auth/url
 * Retorna a URL de login do Facebook para uso no frontend.
 */
router.get('/url', (req, res) => {
    const { tenantId, userId } = req.query;
    const { FB_APP_ID, REDIRECT_URI } = getMetaConfig();

    // Recria o state para manter segurança e contexto
    const state = Buffer.from(JSON.stringify({ tenantId, userId })).toString('base64');

    // Escopos necessários para Marketing API
    const scopes = [
        'ads_read',
        'ads_management',
        'business_management',
        'read_insights'
    ].join(',');

    // Constroi a URL
    const authUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${FB_APP_ID}&redirect_uri=${REDIRECT_URI}&state=${state}&scope=${scopes}`;

    // Retorna JSON para o frontend usar nos botões
    res.json({ url: authUrl });
});

/**
 * GET /api/meta-auth/login
 * Gera a URL de login do Facebook e redireciona.
 */
router.get('/login', (req, res) => {
    const { tenantId, userId } = req.query;
    const { FB_APP_ID, REDIRECT_URI } = getMetaConfig();

    // State para segurança e contexto
    const state = Buffer.from(JSON.stringify({ tenantId, userId })).toString('base64');

    const scopes = [
        'ads_read',
        'ads_management',
        'business_management',
        'read_insights'
    ].join(',');

    const authUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${FB_APP_ID}&redirect_uri=${REDIRECT_URI}&state=${state}&scope=${scopes}`;

    res.redirect(authUrl);
});

/**
 * GET /api/meta-auth/callback
 * Troca o code pelo token, obtém token de longo prazo e salva.
 */
router.get('/callback', async (req, res) => {
    const { code, state, error } = req.query;
    const { FB_APP_ID, FB_APP_SECRET, REDIRECT_URI } = getMetaConfig();

    if (error) {
        return res.redirect(`http://localhost:5173/integrations?error=${error}`);
    }

    if (!code) {
        return res.redirect(`http://localhost:5173/integrations?error=no_code`);
    }

    try {
        // 1. Decodificar State
        const decodedState = JSON.parse(Buffer.from(state, 'base64').toString('utf-8'));
        const { tenantId, userId } = decodedState;

        // 2. Trocar Code por Short-Lived Token
        const tokenRes = await axios.get('https://graph.facebook.com/v19.0/oauth/access_token', {
            params: {
                client_id: FB_APP_ID,
                client_secret: FB_APP_SECRET,
                redirect_uri: REDIRECT_URI,
                code
            }
        });

        const shortLivedToken = tokenRes.data.access_token;

        // 3. Trocar por Long-Lived Token
        const longTokenRes = await axios.get('https://graph.facebook.com/v19.0/oauth/access_token', {
            params: {
                grant_type: 'fb_exchange_token',
                client_id: FB_APP_ID,
                client_secret: FB_APP_SECRET,
                fb_exchange_token: shortLivedToken
            }
        });

        const { access_token: longLivedToken, expires_in } = longTokenRes.data;

        // Calcular data de expiração (aprox 60 dias)
        const expiresAt = new Date(Date.now() + (expires_in * 1000));

        // 4. (Opcional) Buscar dados do usuário do Facebook para salvar nome/id
        const meRes = await axios.get(`https://graph.facebook.com/v19.0/me?fields=id,name&access_token=${longLivedToken}`);
        const fbUser = meRes.data;

        // 5. Salvar ou Atualizar Conexão usando o Model (Adapter)
        // 5. Salvar ou Atualizar Conexão usando o Model (Adapter)
        const connection = await Connection.findOneAndUpdate(
            { tenant_id: tenantId, platform: 'meta' },
            {
                access_token: longLivedToken,
                account_id: fbUser.id,
                status: 'active',
                account_name: fbUser.name
            },
            { upsert: true }
        );

        // 5.1 Save to meta_tokens table (New System)
        const { error: tokenError } = await supabase
            .from('meta_tokens')
            .upsert({
                user_id: userId,
                access_token: shortLivedToken,
                long_lived_token: longLivedToken,
                expires_at: expiresAt,
                source: 'user'
            }, { onConflict: 'user_id' });

        if (tokenError) {
            console.error('Error saving to meta_tokens:', tokenError);
        }

        // 6. Fetch and Save Ad Accounts immediately
        try {
            const { MetaService } = await import('../services/metaService.js');
            const metaService = new MetaService(longLivedToken);
            const adAccounts = await metaService.getAdAccounts();

            // Save to Supabase (using userId from state, which matches auth.users id)
            await metaService.saveAdAccounts(userId, adAccounts);
            console.log(`Saved ${adAccounts.length} ad accounts for user ${userId}`);
        } catch (fetchError) {
            console.error('Error fetching/saving ad accounts:', fetchError);
            // Don't block the flow, but maybe log it
        }

        // 7. Redirecionar com sucesso
        res.redirect(`http://localhost:5173/auth/callback?platform=meta&token=${longLivedToken}&success=true&accounts_fetched=true`);

    } catch (err) {
        console.error('Meta Auth Error:', err);
        res.redirect(`http://localhost:5173/auth/callback?error=${encodeURIComponent(err.message)}`);
    }
});

export default router;
