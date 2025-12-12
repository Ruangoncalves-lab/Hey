-- Add meta_user_name and meta_user_id to meta_tokens
ALTER TABLE public.meta_tokens 
ADD COLUMN IF NOT EXISTS meta_user_name text,
ADD COLUMN IF NOT EXISTS meta_user_id text;
