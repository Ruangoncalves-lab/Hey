-- google_tokens
CREATE TABLE IF NOT EXISTS public.google_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  access_token text NOT NULL,
  refresh_token text,
  expires_at timestamptz,
  scope text,
  created_at timestamptz DEFAULT now()
);

-- google_ad_accounts (MCC or Customer)
CREATE TABLE IF NOT EXISTS public.google_ad_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  customer_id text UNIQUE NOT NULL,
  descriptive_name text,
  currency_code text,
  time_zone text,
  is_manager boolean DEFAULT false,
  is_selected boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- google_campaigns
CREATE TABLE IF NOT EXISTS public.google_campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id text REFERENCES public.google_ad_accounts(customer_id) ON DELETE CASCADE,
  campaign_id text UNIQUE NOT NULL,
  name text,
  status text,
  advertising_channel_type text,
  start_date date,
  end_date date,
  updated_at timestamptz DEFAULT now()
);

-- conversions (Sales/Leads from Webhooks)
CREATE TABLE IF NOT EXISTS public.conversions (
  transaction_id text PRIMARY KEY,
  platform text NOT NULL, -- 'Hotmart', 'Eduzz', 'Kiwify', etc.
  value numeric,
  commission numeric,
  currency text DEFAULT 'BRL',
  status text,
  tm_cid text, -- TrafficMaster Campaign ID (from URL)
  tm_aid text, -- TrafficMaster Ad ID (from URL)
  tm_plat text, -- 'meta' or 'google'
  meta_data jsonb DEFAULT '{}', -- Full webhook payload
  created_at timestamptz DEFAULT now()
);

-- metrics_attribution (ROI Calculation)
CREATE TABLE IF NOT EXISTS public.metrics_attribution (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversion_id text REFERENCES public.conversions(transaction_id) ON DELETE CASCADE,
  ad_id text, -- Generic Ad ID (matches meta_ads.ad_id or google_ads.ad_id)
  platform text,
  attributed_value numeric,
  attribution_date date,
  created_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_google_tokens_user ON public.google_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_google_ad_accounts_user ON public.google_ad_accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_conversions_tm_aid ON public.conversions(tm_aid);
CREATE INDEX IF NOT EXISTS idx_metrics_attribution_ad ON public.metrics_attribution(ad_id);

-- RLS Policies
ALTER TABLE public.google_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.google_ad_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.google_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.metrics_attribution ENABLE ROW LEVEL SECURITY;

-- Basic Policies (User can see own data)
CREATE POLICY "Users can view own google accounts" ON public.google_ad_accounts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own google accounts" ON public.google_ad_accounts
  FOR UPDATE USING (auth.uid() = user_id);

-- For conversions, we might need a way to link them to users. 
-- Usually, we link via the ad_id -> campaign -> account -> user.
-- For now, we'll leave conversions RLS open for service_role (webhooks) and maybe add a policy later if frontend needs to read them directly.
