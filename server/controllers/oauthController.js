import axios from 'axios';

const BASE_URL = process.env.SERVER_URL || 'http://localhost:5000';
const REDIRECT_URI = `${BASE_URL}/api/auth/facebook/callback`;

export const facebookLogin = (req, res) => {
    const FB_APP_ID = process.env.FB_APP_ID;
    const { tenantId } = req.query;
    const state = JSON.stringify({ tenantId });

    console.log('Initiating FB Login with App ID:', FB_APP_ID);

    const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${FB_APP_ID}&redirect_uri=${REDIRECT_URI}&state=${state}&scope=ads_management,ads_read,read_insights`;

    res.redirect(authUrl);
};

export const facebookCallback = async (req, res) => {
    const FB_APP_ID = process.env.FB_APP_ID;
    const FB_APP_SECRET = process.env.FB_APP_SECRET;

    const { code, state } = req.query;

    if (!code) {
        return res.redirect('http://localhost:5173/auth/callback?error=access_denied');
    }

    try {
        let tenantId;
        try {
            const parsedState = JSON.parse(state);
            tenantId = parsedState.tenantId;
        } catch (e) {
            console.error('Failed to parse state:', state);
            throw new Error('Invalid state parameter');
        }

        if (!tenantId) {
            throw new Error('Tenant ID missing in OAuth state');
        }

        // 1. Exchange code for short-lived access token
        const tokenRes = await axios.get('https://graph.facebook.com/v18.0/oauth/access_token', {
            params: {
                client_id: FB_APP_ID,
                client_secret: FB_APP_SECRET,
                redirect_uri: REDIRECT_URI,
                code
            }
        });

        const shortLivedToken = tokenRes.data.access_token;
        let finalToken = shortLivedToken;

        // 2. Try to exchange for long-lived token (60 days)
        try {
            const longLivedTokenRes = await axios.get('https://graph.facebook.com/v18.0/oauth/access_token', {
                params: {
                    grant_type: 'fb_exchange_token',
                    client_id: FB_APP_ID,
                    client_secret: FB_APP_SECRET,
                    fb_exchange_token: shortLivedToken
                }
            });
            finalToken = longLivedTokenRes.data.access_token;
        } catch (exchangeError) {
            console.warn('Long-lived token exchange failed, using short-lived token:', exchangeError.message);
        }

        // 3. IMPORTANT: We should ideally save the connection here on the backend 
        // to avoid sending the token to the frontend and back.
        // However, we need the user to select the specific Ad Account.
        // So we will send the token to the frontend, let them select the account, 
        // and THEN save the connection.

        // Redirect back to frontend with token AND tenantId to confirm context
        res.redirect(`http://localhost:5173/auth/callback?platform=meta&token=${finalToken}&tenantId=${tenantId}`);

    } catch (error) {
        console.error('FB Auth Error:', error.response?.data || error.message);
        res.redirect(`http://localhost:5173/auth/callback?error=${encodeURIComponent(error.message || 'Auth failed')}`);
    }
};
