-- Core Tables Migration
-- Creates tenants and users tables expected by the application adapter

CREATE TABLE IF NOT EXISTS public.tenants (
    _id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    plan TEXT DEFAULT 'free',
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.users (
    _id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tenant_id UUID REFERENCES public.tenants(_id),
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'viewer',
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Permissive Policies for Development/Testing
DROP POLICY IF EXISTS "Enable all access for tenants" ON public.tenants;
CREATE POLICY "Enable all access for tenants" ON public.tenants FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Enable all access for users" ON public.users;
CREATE POLICY "Enable all access for users" ON public.users FOR ALL USING (true) WITH CHECK (true);
