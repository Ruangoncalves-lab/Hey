-- Tabela de Contas de Anúncio (Vinculada ao Tenant)
CREATE TABLE IF NOT EXISTS meta_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(_id),
    meta_account_id TEXT UNIQUE NOT NULL, -- act_xxxxxxxx
    name TEXT,
    currency TEXT,
    timezone TEXT,
    access_token TEXT, -- Token específico se necessário, ou usa o do tenant
    status TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Campanhas
CREATE TABLE IF NOT EXISTS meta_campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_id UUID REFERENCES meta_accounts(id),
    meta_campaign_id TEXT UNIQUE NOT NULL,
    name TEXT,
    status TEXT,
    objective TEXT,
    buying_type TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Métricas Nativas (Formato EAV para flexibilidade total)
CREATE TABLE IF NOT EXISTS meta_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID REFERENCES meta_campaigns(id),
    date DATE NOT NULL,
    metric_name TEXT NOT NULL,
    metric_value NUMERIC,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(campaign_id, date, metric_name)
);

-- Tabela de Métricas Personalizadas (Formato Wide para performance em queries)
CREATE TABLE IF NOT EXISTS meta_metrics_custom (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID REFERENCES meta_campaigns(id),
    date DATE NOT NULL,
    
    -- Financeiro
    profit NUMERIC,
    roi NUMERIC,
    roas NUMERIC,
    lucro_diario NUMERIC,
    lucro_total NUMERIC,
    margem NUMERIC,
    
    -- Performance
    cpa NUMERIC,
    cpl NUMERIC,
    freq NUMERIC,
    cpm NUMERIC,
    ctr NUMERIC,
    cpc NUMERIC,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(campaign_id, date)
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_meta_metrics_campaign_date ON meta_metrics(campaign_id, date);
CREATE INDEX IF NOT EXISTS idx_meta_metrics_custom_campaign_date ON meta_metrics_custom(campaign_id, date);
