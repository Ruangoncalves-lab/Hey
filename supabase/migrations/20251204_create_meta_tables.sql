-- Create meta_tokens table
CREATE TABLE IF NOT EXISTS public.meta_tokens (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    access_token TEXT NOT NULL,
    long_lived_token TEXT,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id)
);

-- Create meta_ad_accounts table
CREATE TABLE IF NOT EXISTS public.meta_ad_accounts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    account_id TEXT NOT NULL,
    name TEXT,
    currency TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(account_id)
);

-- Create meta_campaigns table
CREATE TABLE IF NOT EXISTS public.meta_campaigns (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    account_id TEXT REFERENCES public.meta_ad_accounts(account_id) ON DELETE CASCADE NOT NULL,
    campaign_id TEXT NOT NULL,
    name TEXT,
    status TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(campaign_id)
);

-- Create meta_metrics table
CREATE TABLE IF NOT EXISTS public.meta_metrics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    campaign_id TEXT REFERENCES public.meta_campaigns(campaign_id) ON DELETE CASCADE NOT NULL,
    date DATE NOT NULL,
    impressions BIGINT DEFAULT 0,
    clicks BIGINT DEFAULT 0,
    ctr NUMERIC,
    cpc NUMERIC,
    cpm NUMERIC,
    roas NUMERIC,
    spend NUMERIC,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(campaign_id, date)
);

-- Enable RLS
ALTER TABLE public.meta_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meta_ad_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meta_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meta_metrics ENABLE ROW LEVEL SECURITY;

-- Create policies (assuming users can only see their own data)
-- For meta_tokens
CREATE POLICY "Users can view their own tokens" ON public.meta_tokens
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tokens" ON public.meta_tokens
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tokens" ON public.meta_tokens
    FOR UPDATE USING (auth.uid() = user_id);

-- For meta_ad_accounts
CREATE POLICY "Users can view their own ad accounts" ON public.meta_ad_accounts
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own ad accounts" ON public.meta_ad_accounts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- For meta_campaigns (linked via account -> user)
CREATE POLICY "Users can view their own campaigns" ON public.meta_campaigns
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.meta_ad_accounts
            WHERE meta_ad_accounts.account_id = meta_campaigns.account_id
            AND meta_ad_accounts.user_id = auth.uid()
        )
    );

-- For meta_metrics (linked via campaign -> account -> user)
CREATE POLICY "Users can view their own metrics" ON public.meta_metrics
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.meta_campaigns
            JOIN public.meta_ad_accounts ON meta_ad_accounts.account_id = meta_campaigns.account_id
            WHERE meta_campaigns.campaign_id = meta_metrics.campaign_id
            AND meta_ad_accounts.user_id = auth.uid()
        )
    );
