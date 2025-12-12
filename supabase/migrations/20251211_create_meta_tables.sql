-- Create Meta Integration Tables

-- 1. Meta Campaigns
CREATE TABLE IF NOT EXISTS public.meta_campaigns (
    id text PRIMARY KEY,
    account_id text REFERENCES public.meta_ad_accounts(account_id),
    name text,
    status text,
    objective text,
    buying_type text,
    spend_cap numeric,
    start_time timestamptz,
    stop_time timestamptz,
    updated_at timestamptz DEFAULT now()
);

-- 2. Meta Ad Sets
CREATE TABLE IF NOT EXISTS public.meta_ad_sets (
    id text PRIMARY KEY,
    campaign_id text REFERENCES public.meta_campaigns(id),
    name text,
    status text,
    daily_budget numeric,
    lifetime_budget numeric,
    start_time timestamptz,
    end_time timestamptz,
    targeting jsonb,
    updated_at timestamptz DEFAULT now()
);

-- 3. Meta Ads
CREATE TABLE IF NOT EXISTS public.meta_ads (
    id text PRIMARY KEY,
    ad_set_id text REFERENCES public.meta_ad_sets(id),
    name text,
    status text,
    creative jsonb,
    updated_at timestamptz DEFAULT now()
);

-- 4. Meta Metrics (Daily Breakdown)
CREATE TABLE IF NOT EXISTS public.meta_metrics (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id text REFERENCES public.meta_ad_accounts(account_id),
    campaign_id text REFERENCES public.meta_campaigns(id),
    ad_set_id text REFERENCES public.meta_ad_sets(id),
    ad_id text REFERENCES public.meta_ads(id),
    date date,
    impressions bigint,
    clicks bigint,
    spend numeric,
    cpc numeric,
    cpm numeric,
    ctr numeric,
    roas numeric,
    actions jsonb DEFAULT '{}',
    created_at timestamptz DEFAULT now(),
    UNIQUE(ad_id, date) -- Prevent duplicate daily metrics for the same ad
);

-- 5. Meta AI Insights
CREATE TABLE IF NOT EXISTS public.meta_insights (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id),
    account_id text REFERENCES public.meta_ad_accounts(account_id),
    type text, -- 'optimization', 'alert', 'success'
    title text,
    message text,
    impact_level text, -- 'high', 'medium', 'low'
    data jsonb DEFAULT '{}',
    is_read boolean DEFAULT false,
    created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.meta_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meta_ad_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meta_ads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meta_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meta_insights ENABLE ROW LEVEL SECURITY;

-- Policies (Simplified for now, assuming user owns the account via join if needed, but for speed we might just check if the user has access to the account in the app logic. 
-- However, strict RLS would require joining up to meta_ad_accounts -> user_id.
-- For now, let's allow authenticated users to read everything if they are the owner of the account.)

-- Helper policy for campaigns
CREATE POLICY "Users can view their own campaigns" ON public.meta_campaigns
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.meta_ad_accounts a
            WHERE a.account_id = public.meta_campaigns.account_id
            AND a.user_id = auth.uid()
        )
    );

-- Helper policy for ad sets
CREATE POLICY "Users can view their own ad sets" ON public.meta_ad_sets
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.meta_campaigns c
            JOIN public.meta_ad_accounts a ON a.account_id = c.account_id
            WHERE c.id = public.meta_ad_sets.campaign_id
            AND a.user_id = auth.uid()
        )
    );

-- Helper policy for ads
CREATE POLICY "Users can view their own ads" ON public.meta_ads
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.meta_ad_sets s
            JOIN public.meta_campaigns c ON c.id = s.campaign_id
            JOIN public.meta_ad_accounts a ON a.account_id = c.account_id
            WHERE s.id = public.meta_ads.ad_set_id
            AND a.user_id = auth.uid()
        )
    );

-- Helper policy for metrics
CREATE POLICY "Users can view their own metrics" ON public.meta_metrics
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.meta_ad_accounts a
            WHERE a.account_id = public.meta_metrics.account_id
            AND a.user_id = auth.uid()
        )
    );

-- Helper policy for insights
CREATE POLICY "Users can view their own insights" ON public.meta_insights
    FOR SELECT USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_meta_metrics_date ON public.meta_metrics(date);
CREATE INDEX IF NOT EXISTS idx_meta_metrics_campaign ON public.meta_metrics(campaign_id);
CREATE INDEX IF NOT EXISTS idx_meta_insights_user ON public.meta_insights(user_id);
