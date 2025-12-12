import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')

    if (!code) {
      throw new Error('No code provided from Meta')
    }

    // Decode state
    let userId = null;
    let tenantId = null;
    try {
      if (state) {
        const decoded = JSON.parse(atob(state));
        userId = decoded.userId;
        tenantId = decoded.tenantId;
      }
    } catch (e) {
      console.error('State decode error:', e);
    }

    const META_APP_ID = Deno.env.get('META_APP_ID')
    const META_APP_SECRET = Deno.env.get('META_APP_SECRET')
    const META_REDIRECT_URI = Deno.env.get('META_REDIRECT_URI')

    if (!META_APP_ID || !META_APP_SECRET || !META_REDIRECT_URI) {
      throw new Error('Missing server configuration')
    }

    // 1. Exchange code for token
    const tokenRes = await fetch(
      `https://graph.facebook.com/v21.0/oauth/access_token?client_id=${META_APP_ID}&redirect_uri=${META_REDIRECT_URI}&client_secret=${META_APP_SECRET}&code=${code}`
    );
    const tokenData = await tokenRes.json();

    if (tokenData.error) {
      throw new Error('Meta Token Error: ' + tokenData.error.message);
    }

    const shortToken = tokenData.access_token;

    // 2. Exchange for long-lived token
    const longTokenRes = await fetch(
      `https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${META_APP_ID}&client_secret=${META_APP_SECRET}&fb_exchange_token=${shortToken}`
    );
    const longTokenData = await longTokenRes.json();

    if (longTokenData.error) {
      throw new Error('Meta Long Token Error: ' + longTokenData.error.message);
    }

    const longToken = longTokenData.access_token;

    // Calculate expiration safely
    let expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 60); // Default 60 days

    if (longTokenData.expires_in && !isNaN(Number(longTokenData.expires_in))) {
      expiresAt = new Date(Date.now() + Number(longTokenData.expires_in) * 1000);
    }

    // 3. Redirect to Frontend Callback Page
    // We append the tokens to the URL so the frontend can pick them up
    // IMPORTANT: In production, consider using a secure cookie or a temporary code exchange if security is paramount.
    // For this implementation, we'll use query params for simplicity and speed.

    // Assuming the frontend is running on localhost for dev, or a production URL.
    // Ideally, we should pass the frontend URL in the state or env var.
    // For now, we'll try to infer or hardcode based on the environment.
    // Since this is a local dev environment mostly, we'll redirect to the origin if possible, but Edge Functions don't know the frontend origin easily.
    // Let's use a hardcoded base URL for now, or better, use the META_REDIRECT_URI base.

    // Extract base URL from META_REDIRECT_URI (which points to this function)
    // We want to redirect to http://localhost:5173/auth/callback (or production equivalent)

    // HACK: For this specific user environment, we know it's localhost:5173. 
    // In a real app, you'd have a FRONTEND_URL env var.
    const FRONTEND_URL = Deno.env.get('FRONTEND_URL') || 'http://localhost:5173';

    const redirectUrl = new URL(`${FRONTEND_URL}/auth/callback`);
    redirectUrl.searchParams.set('access_token', shortToken);
    redirectUrl.searchParams.set('long_lived_token', longToken);
    redirectUrl.searchParams.set('expires_at', expiresAt.toISOString());
    redirectUrl.searchParams.set('user_id', userId || '');

    return Response.redirect(redirectUrl.toString(), 302);

  } catch (error) {
    // Redirect to frontend with error
    const FRONTEND_URL = Deno.env.get('FRONTEND_URL') || 'http://localhost:5173';
    const redirectUrl = new URL(`${FRONTEND_URL}/auth/callback`);
    redirectUrl.searchParams.set('error', error.message);

    return Response.redirect(redirectUrl.toString(), 302);
  }
})
