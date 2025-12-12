import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const supabase = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        const { user_id } = await req.json()

        if (!user_id) {
            throw new Error('Missing user_id')
        }

        // 1. Get Access Token
        const { data: tokenData, error: tokenError } = await supabase
            .from('meta_tokens')
            .select('access_token')
            .eq('user_id', user_id)
            .single()

        if (tokenError || !tokenData) {
            throw new Error('Meta token not found for user')
        }

        const accessToken = tokenData.access_token

        // 2. Fetch User Profile (Update basic info)
        const meRes = await fetch(`https://graph.facebook.com/v21.0/me?fields=id,name&access_token=${accessToken}`)
        const meData = await meRes.json()
        if (!meData.error) {
            await supabase.from('meta_tokens').update({
                meta_user_name: meData.name,
                meta_user_id: meData.id,
                updated_at: new Date().toISOString()
            }).eq('user_id', user_id);
        }

        // 3. Fetch All Ad Accounts (to update list)
        const accountsRes = await fetch(
            `https://graph.facebook.com/v21.0/me/adaccounts?fields=account_id,name,currency,business,business_name&limit=100&access_token=${accessToken}`
        )
        const accountsData = await accountsRes.json()
        if (accountsData.error) throw new Error(accountsData.error.message)

        const accounts = accountsData.data || []

        // Upsert accounts
        if (accounts.length > 0) {
            const upsertData = accounts.map((acc: any) => ({
                user_id: user_id,
                account_id: acc.account_id,
                name: acc.name || `Conta ${acc.account_id}`,
                currency: acc.currency,
                business_id: acc.business?.id,
                business_name: acc.business_name || acc.business?.name,
                updated_at: new Date().toISOString()
            }))
            await supabase.from('meta_ad_accounts').upsert(upsertData, { onConflict: 'account_id' })
        }

        // 4. Get SELECTED Ad Accounts for deep sync
        const { data: selectedAccounts } = await supabase
            .from('meta_ad_accounts')
            .select('account_id')
            .eq('user_id', user_id)
            .eq('is_selected', true)

        let totalCampaigns = 0;
        let totalInsights = 0;

        if (selectedAccounts && selectedAccounts.length > 0) {
            for (const account of selectedAccounts) {
                const accountId = account.account_id;
                const actId = `act_${accountId}`; // Meta API requires 'act_' prefix

                // A. Fetch Campaigns
                const campRes = await fetch(
                    `https://graph.facebook.com/v21.0/${actId}/campaigns?fields=id,name,status,objective,buying_type,spend_cap,start_time,stop_time&limit=500&access_token=${accessToken}`
                );
                const campData = await campRes.json();
                const campaigns = campData.data || [];

                if (campaigns.length > 0) {
                    const campUpsert = campaigns.map((c: any) => ({
                        id: c.id,
                        account_id: accountId,
                        name: c.name,
                        status: c.status,
                        objective: c.objective,
                        buying_type: c.buying_type,
                        spend_cap: c.spend_cap,
                        start_time: c.start_time,
                        stop_time: c.stop_time,
                        updated_at: new Date().toISOString()
                    }));
                    await supabase.from('meta_campaigns').upsert(campUpsert, { onConflict: 'id' });
                    totalCampaigns += campaigns.length;
                }

                // B. Fetch Ad Sets
                const adSetRes = await fetch(
                    `https://graph.facebook.com/v21.0/${actId}/adsets?fields=id,name,status,daily_budget,lifetime_budget,start_time,end_time,targeting,campaign_id&limit=500&access_token=${accessToken}`
                );
                const adSetData = await adSetRes.json();
                const adSets = adSetData.data || [];

                if (adSets.length > 0) {
                    const adSetUpsert = adSets.map((s: any) => ({
                        id: s.id,
                        campaign_id: s.campaign_id,
                        name: s.name,
                        status: s.status,
                        daily_budget: s.daily_budget,
                        lifetime_budget: s.lifetime_budget,
                        start_time: s.start_time,
                        end_time: s.end_time,
                        targeting: s.targeting ? JSON.stringify(s.targeting) : null,
                        updated_at: new Date().toISOString()
                    }));
                    await supabase.from('meta_ad_sets').upsert(adSetUpsert, { onConflict: 'id' });
                }

                // C. Fetch Ads
                const adsRes = await fetch(
                    `https://graph.facebook.com/v21.0/${actId}/ads?fields=id,name,status,creative,adset_id&limit=500&access_token=${accessToken}`
                );
                const adsData = await adsRes.json();
                const ads = adsData.data || [];

                if (ads.length > 0) {
                    const adsUpsert = ads.map((a: any) => ({
                        id: a.id,
                        ad_set_id: a.adset_id,
                        name: a.name,
                        status: a.status,
                        creative: a.creative ? JSON.stringify(a.creative) : null,
                        updated_at: new Date().toISOString()
                    }));
                    await supabase.from('meta_ads').upsert(adsUpsert, { onConflict: 'id' });
                }

                // D. Fetch Insights (Last 30 Days, Daily Breakdown)
                const insightsRes = await fetch(
                    `https://graph.facebook.com/v21.0/${actId}/insights?level=ad&date_preset=last_30d&time_increment=1&fields=account_id,campaign_id,adset_id,ad_id,date_start,impressions,clicks,spend,cpc,cpm,ctr,actions,action_values&limit=500&access_token=${accessToken}`
                );
                const insightsData = await insightsRes.json();
                const insights = insightsData.data || [];

                if (insights.length > 0) {
                    const metricsUpsert = insights.map((i: any) => {
                        // Calculate ROAS
                        let purchaseValue = 0;
                        if (i.action_values) {
                            const purchaseAction = i.action_values.find((a: any) => a.action_type === 'purchase' || a.action_type === 'offsite_conversion.fb_pixel_purchase');
                            if (purchaseAction) purchaseValue = Number(purchaseAction.value);
                        }
                        const spend = Number(i.spend) || 0;
                        const roas = spend > 0 ? purchaseValue / spend : 0;

                        return {
                            account_id: accountId, // Use our stored ID, not the one from insights which might have 'act_'
                            campaign_id: i.campaign_id,
                            ad_set_id: i.adset_id,
                            ad_id: i.ad_id,
                            date: i.date_start,
                            impressions: i.impressions,
                            clicks: i.clicks,
                            spend: spend,
                            cpc: i.cpc,
                            cpm: i.cpm,
                            ctr: i.ctr,
                            roas: roas,
                            actions: i.actions ? JSON.stringify(i.actions) : null,
                            created_at: new Date().toISOString()
                        };
                    });

                    // We need to handle potential duplicates if running multiple times a day. 
                    // The UNIQUE(ad_id, date) constraint will cause conflict. We want to update.
                    await supabase.from('meta_metrics').upsert(metricsUpsert, { onConflict: 'ad_id,date' });
                    totalInsights += insights.length;

                    // E. AI Analysis & Insights Generation
                    const newInsights = [];

                    // 1. High Spend, Low ROAS
                    const poorPerformers = insights.filter((i: any) => Number(i.spend) > 50 && (Number(i.spend) > 0 ? (getPurchaseValue(i) / Number(i.spend)) : 0) < 1.0);
                    if (poorPerformers.length > 0) {
                        newInsights.push({
                            user_id,
                            account_id: accountId,
                            type: 'optimization',
                            title: 'Campanhas com Baixo ROAS',
                            message: `Detectamos ${poorPerformers.length} anúncios com gasto superior a R$50 e ROAS abaixo de 1.0. Considere pausar ou otimizar.`,
                            impact_level: 'high',
                            data: { count: poorPerformers.length, sample_ad_id: poorPerformers[0].ad_id }
                        });
                    }

                    // 2. High CPM Alert
                    const highCpm = insights.filter((i: any) => Number(i.cpm) > 40); // Arbitrary threshold
                    if (highCpm.length > 0) {
                        newInsights.push({
                            user_id,
                            account_id: accountId,
                            type: 'alert',
                            title: 'CPM Alto Detectado',
                            message: `O CPM está acima de R$40 em ${highCpm.length} anúncios. Verifique a segmentação de público.`,
                            impact_level: 'medium',
                            data: { count: highCpm.length }
                        });
                    }

                    // 3. Success/Scale Opportunity
                    const topPerformers = insights.filter((i: any) => Number(i.spend) > 20 && (Number(i.spend) > 0 ? (getPurchaseValue(i) / Number(i.spend)) : 0) > 4.0);
                    if (topPerformers.length > 0) {
                        newInsights.push({
                            user_id,
                            account_id: accountId,
                            type: 'success',
                            title: 'Oportunidade de Escala',
                            message: `Você tem ${topPerformers.length} anúncios com ROAS acima de 4.0! Considere aumentar o orçamento.`,
                            impact_level: 'high',
                            data: { count: topPerformers.length }
                        });
                    }

                    if (newInsights.length > 0) {
                        await supabase.from('meta_insights').insert(newInsights);
                    }
                }
            }
        }

        return new Response(
            JSON.stringify({
                success: true,
                accounts: accounts.length,
                selected_synced: selectedAccounts?.length || 0,
                campaigns_synced: totalCampaigns,
                insights_synced: totalInsights
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

    } catch (error) {
        console.error('Sync Error:', error)
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
})

function getPurchaseValue(insight: any): number {
    if (!insight.action_values) return 0;
    const purchase = insight.action_values.find((a: any) => a.action_type === 'purchase' || a.action_type === 'offsite_conversion.fb_pixel_purchase');
    return purchase ? Number(purchase.value) : 0;
}
