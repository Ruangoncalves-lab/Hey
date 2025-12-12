import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const { tenantId, userId } = await req.json();

        if (!tenantId || !userId) {
            throw new Error('Missing tenantId or userId');
        }

        const META_APP_ID = Deno.env.get('META_APP_ID');
        const META_REDIRECT_URI = Deno.env.get('META_REDIRECT_URI');

        if (!META_APP_ID || !META_REDIRECT_URI) {
            throw new Error('Server misconfiguration: Missing META_APP_ID or META_REDIRECT_URI');
        }

        // State to pass through OAuth flow for security and context
        const state = btoa(JSON.stringify({ tenantId, userId }));

        const scopes = [
            'ads_management',
            'ads_read',
            'business_management',
            'public_profile',
            'email'
        ].join(',');

        const authUrl = `https://www.facebook.com/v21.0/dialog/oauth?client_id=${META_APP_ID}&redirect_uri=${META_REDIRECT_URI}&state=${state}&scope=${scopes}&response_type=code`;

        return new Response(
            JSON.stringify({ url: authUrl }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
});
