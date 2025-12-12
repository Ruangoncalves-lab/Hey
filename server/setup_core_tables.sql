-- Core Tables Migration

-- 1. Tenants
CREATE TABLE IF NOT EXISTS public.tenants (
    _id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Users (Profile table linked to auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    _id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    name TEXT,
    email TEXT,
    role TEXT DEFAULT 'user',
    tenant_id UUID REFERENCES public.tenants(_id),
    password_hash TEXT, -- Keeping for legacy/fallback, but Supabase Auth handles auth
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Connections
CREATE TABLE IF NOT EXISTS public.connections (
    _id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tenant_id UUID REFERENCES public.tenants(_id) ON DELETE CASCADE,
    platform TEXT NOT NULL,
    access_token TEXT,
    refresh_token TEXT,
    account_id TEXT,
    account_name TEXT,
    status TEXT DEFAULT 'active',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connections ENABLE ROW LEVEL SECURITY;

-- Policies
-- Tenants: Users can view their own tenant
CREATE POLICY "Users can view their own tenant" ON public.tenants
    USING (_id IN (SELECT tenant_id FROM public.users WHERE _id = auth.uid()));

-- Users: Users can view their own profile
CREATE POLICY "Users can view their own profile" ON public.users
    USING (_id = auth.uid());

-- Connections: Users can view connections of their tenant
CREATE POLICY "Users can view connections of their tenant" ON public.connections
    USING (tenant_id IN (SELECT tenant_id FROM public.users WHERE _id = auth.uid()));
