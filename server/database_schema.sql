-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Tenants Table
create table if not exists tenants (
    _id uuid primary key default uuid_generate_v4(),
    name text not null,
    plan text default 'free',
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Users Table
create table if not exists users (
    _id uuid primary key default uuid_generate_v4(),
    name text not null,
    email text unique not null,
    password_hash text not null,
    role text default 'user',
    tenant_id uuid references tenants(_id),
    last_login timestamp with time zone,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Connections Table
create table if not exists connections (
    _id uuid primary key default uuid_generate_v4(),
    tenant_id uuid references tenants(_id),
    platform text not null,
    access_token text,
    account_id text,
    status text default 'active',
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Campaigns Table
create table if not exists campaigns (
    _id uuid primary key default uuid_generate_v4(),
    tenant_id uuid references tenants(_id),
    name text not null,
    status text,
    platform text,
    budget numeric,
    spent numeric,
    clicks integer,
    impressions integer,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Enable RLS (Optional, but good practice)
alter table users enable row level security;
alter table tenants enable row level security;
alter table connections enable row level security;
alter table campaigns enable row level security;

-- Create policies (Simplified for now - allow all for authenticated service role)
create policy "Allow all for service role" on users for all using (true);
create policy "Allow all for service role" on tenants for all using (true);
create policy "Allow all for service role" on connections for all using (true);
create policy "Allow all for service role" on campaigns for all using (true);
