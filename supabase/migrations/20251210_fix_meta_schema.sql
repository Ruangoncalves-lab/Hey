-- Fix and update Meta tables schema

-- 1. Create meta_logs table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.meta_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  level text DEFAULT 'info', -- 'info', 'warn', 'error'
  message text,
  meta jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.meta_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own logs" ON public.meta_logs
  FOR SELECT USING (auth.uid() = user_id);

-- 2. Update meta_campaigns
ALTER TABLE public.meta_campaigns 
ADD COLUMN IF NOT EXISTS buying_type text;

-- 3. Update meta_ad_sets
ALTER TABLE public.meta_ad_sets 
ADD COLUMN IF NOT EXISTS daily_budget numeric,
ADD COLUMN IF NOT EXISTS lifetime_budget numeric,
ADD COLUMN IF NOT EXISTS start_time timestamptz,
ADD COLUMN IF NOT EXISTS end_time timestamptz;

-- 4. Update meta_metrics
ALTER TABLE public.meta_metrics 
ADD COLUMN IF NOT EXISTS actions jsonb DEFAULT '{}';

-- Change types for impressions and clicks to bigint to prevent overflow
ALTER TABLE public.meta_metrics 
ALTER COLUMN impressions TYPE bigint,
ALTER TABLE public.meta_metrics 
ALTER COLUMN clicks TYPE bigint;

-- Ensure indexes exist (IF NOT EXISTS is implied by creating them with a name, but Postgres doesn't support CREATE INDEX IF NOT EXISTS with name in all versions, but Supabase does)
CREATE INDEX IF NOT EXISTS idx_meta_tokens_user ON public.meta_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_meta_ad_accounts_user ON public.meta_ad_accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_meta_campaigns_account ON public.meta_campaigns(account_id);
CREATE INDEX IF NOT EXISTS idx_meta_metrics_campaign_date ON public.meta_metrics(campaign_id, date);
CREATE INDEX IF NOT EXISTS idx_meta_metrics_date ON public.meta_metrics(date);
