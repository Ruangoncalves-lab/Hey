-- Drop existing tables if they exist to ensure clean slate for v2
DROP TABLE IF EXISTS public.meta_metrics;
DROP TABLE IF EXISTS public.meta_ads;
DROP TABLE IF EXISTS public.meta_ad_sets;
DROP TABLE IF EXISTS public.meta_campaigns;
DROP TABLE IF EXISTS public.meta_ad_accounts;
DROP TABLE IF EXISTS public.meta_tokens;

-- Create meta_tokens table
CREATE TABLE public.meta_tokens (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    access_token TEXT NOT NULL,
    long_lived_token TEXT,
    expires_at TIMESTAMPTZ,
    source TEXT DEFAULT 'user', -- 'user' or 'system_user'
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id)
);

-- Create meta_ad_accounts table
CREATE TABLE public.meta_ad_accounts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    account_id TEXT NOT NULL, -- The numeric ID (without act_ prefix usually, but we'll store what API gives or normalize)
    name TEXT,
    currency TEXT,
    business_id TEXT,
    business_name TEXT,
    is_selected BOOLEAN DEFAULT false, -- To mark which account is currently active for the dashboard
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(account_id)
);

-- Create meta_campaigns table
CREATE TABLE public.meta_campaigns (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    account_id TEXT REFERENCES public.meta_ad_accounts(account_id) ON DELETE CASCADE NOT NULL,
    campaign_id TEXT NOT NULL,
    name TEXT,
    status TEXT,
    objective TEXT,
    created_time TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(campaign_id)
);

-- Create meta_ad_sets table
CREATE TABLE public.meta_ad_sets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    campaign_id TEXT REFERENCES public.meta_campaigns(campaign_id) ON DELETE CASCADE NOT NULL,
    ad_set_id TEXT NOT NULL,
    name TEXT,
    status TEXT,
    created_time TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(ad_set_id)
);

-- Create meta_ads table
CREATE TABLE public.meta_ads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ad_set_id TEXT REFERENCES public.meta_ad_sets(ad_set_id) ON DELETE CASCADE NOT NULL,
    ad_id TEXT NOT NULL,
    name TEXT,
    status TEXT,
    creative_id TEXT,
    created_time TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(ad_id)
);

-- Create meta_metrics table
CREATE TABLE public.meta_metrics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    campaign_id TEXT REFERENCES public.meta_campaigns(campaign_id) ON DELETE CASCADE,
    ad_set_id TEXT REFERENCES public.meta_ad_sets(ad_set_id) ON DELETE CASCADE,
    ad_id TEXT REFERENCES public.meta_ads(ad_id) ON DELETE CASCADE,
    date DATE NOT NULL,
    impressions INT DEFAULT 0,
    clicks INT DEFAULT 0,
    spend NUMERIC DEFAULT 0,
    cpc NUMERIC DEFAULT 0,
    cpm NUMERIC DEFAULT 0,
    ctr NUMERIC DEFAULT 0,
    roas NUMERIC DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(campaign_id, date) -- Assuming we store campaign level metrics primarily for the dashboard
);

-- Enable RLS
ALTER TABLE public.meta_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meta_ad_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meta_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meta_ad_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meta_ads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meta_metrics ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can manage their own tokens" ON public.meta_tokens
    USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their own ad accounts" ON public.meta_ad_accounts
    USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own campaigns" ON public.meta_campaigns
    USING (EXISTS (SELECT 1 FROM public.meta_ad_accounts WHERE meta_ad_accounts.account_id = meta_campaigns.account_id AND meta_ad_accounts.user_id = auth.uid()));

CREATE POLICY "Users can view their own ad sets" ON public.meta_ad_sets
    USING (EXISTS (SELECT 1 FROM public.meta_campaigns JOIN public.meta_ad_accounts ON meta_ad_accounts.account_id = meta_campaigns.account_id WHERE meta_campaigns.campaign_id = meta_ad_sets.campaign_id AND meta_ad_accounts.user_id = auth.uid()));

CREATE POLICY "Users can view their own ads" ON public.meta_ads
    USING (EXISTS (SELECT 1 FROM public.meta_ad_sets JOIN public.meta_campaigns ON meta_campaigns.campaign_id = meta_ad_sets.campaign_id JOIN public.meta_ad_accounts ON meta_ad_accounts.account_id = meta_campaigns.account_id WHERE meta_ad_sets.ad_set_id = meta_ads.ad_set_id AND meta_ad_accounts.user_id = auth.uid()));

CREATE POLICY "Users can view their own metrics" ON public.meta_metrics
    USING (EXISTS (SELECT 1 FROM public.meta_campaigns JOIN public.meta_ad_accounts ON meta_ad_accounts.account_id = meta_campaigns.account_id WHERE meta_campaigns.campaign_id = meta_metrics.campaign_id AND meta_ad_accounts.user_id = auth.uid()));
