-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users Table
create table if not exists users (
  _id text primary key default uuid_generate_v4(),
  name text,
  email text unique,
  password_hash text,
  tenant_id text,
  role text,
  last_login timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Tenants Table
create table if not exists tenants (
  _id text primary key default uuid_generate_v4(),
  name text,
  plan text,
  settings jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Connections Table
create table if not exists connections (
  _id text primary key default uuid_generate_v4(),
  tenant_id text,
  platform text,
  access_token text,
  account_id text,
  status text,
  last_synced_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Campaigns Table
create table if not exists campaigns (
  _id text primary key default uuid_generate_v4(),
  tenant_id text,
  name text,
  status text,
  platform text,
  budget numeric,
  performance_summary jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Metrics Table
create table if not exists metrics (
  _id text primary key default uuid_generate_v4(),
  tenant_id text,
  date timestamptz,
  impressions numeric,
  clicks numeric,
  spend numeric,
  conversions numeric,
  revenue numeric,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Insights Table
create table if not exists insights (
  _id text primary key default uuid_generate_v4(),
  tenant_id text,
  type text,
  severity text,
  title text,
  description text,
  data jsonb,
  status text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Automations Table
create table if not exists automations (
  _id text primary key default uuid_generate_v4(),
  tenant_id text,
  name text,
  trigger text,
  action text,
  status text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Creatives Table
create table if not exists creatives (
  _id text primary key default uuid_generate_v4(),
  tenant_id text,
  name text,
  url text,
  type text,
  status text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- AdSets Table
create table if not exists adsets (
  _id text primary key default uuid_generate_v4(),
  tenant_id text,
  campaign_id text,
  name text,
  status text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Ads Table
create table if not exists ads (
  _id text primary key default uuid_generate_v4(),
  tenant_id text,
  adset_id text,
  name text,
  status text,
  creative_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Products Table
create table if not exists products (
  _id text primary key default uuid_generate_v4(),
  tenant_id text,
  name text,
  price numeric,
  sku text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Orders Table
create table if not exists orders (
  _id text primary key default uuid_generate_v4(),
  tenant_id text,
  customer_name text,
  total numeric,
  status text,
  items jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Webhook Events Table
create table if not exists webhook_events (
  _id text primary key default uuid_generate_v4(),
  platform text,
  payload jsonb,
  received_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Logs Table
create table if not exists logs (
  _id text primary key default uuid_generate_v4(),
  tenant_id text,
  level text,
  message text,
  meta jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Notifications Table
create table if not exists notifications (
  _id text primary key default uuid_generate_v4(),
  tenant_id text,
  user_id text,
  title text,
  message text,
  read boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Reports Table
create table if not exists reports (
  _id text primary key default uuid_generate_v4(),
  tenant_id text,
  name text,
  type text,
  parameters jsonb,
  url text,
  status text,
  created_by text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Audit Logs Table
create table if not exists audit_logs (
  _id text primary key default uuid_generate_v4(),
  tenant_id text,
  user_id text,
  action text,
  resource text,
  resource_id text,
  details jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
