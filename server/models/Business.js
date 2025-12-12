import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
    tenant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
    platform: { type: String, required: true },
    external_id: { type: String, required: true, index: true },
    name: { type: String, required: true },
    status: { type: String, required: true }, // ACTIVE, PAUSED, ARCHIVED
    objective: { type: String }, // SALES, LEADS, TRAFFIC
    budget: {
        amount: Number,
        currency: String,
        type: String // DAILY, LIFETIME
    },
    performance_summary: {
        spend: Number,
        impressions: Number,
        clicks: Number,
        conversions: Number,
        ctr: Number,
        cpc: Number,
        roas: Number
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export const Campaign = mongoose.model('Campaign', campaignSchema);

const creativeSchema = new mongoose.Schema({
    tenant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
    name: { type: String, required: true },
    type: { type: String, enum: ['image', 'video', 'carousel'], required: true },
    url: { type: String, required: true },
    thumbnail_url: String,
    ai_analysis: {
        score: Number,
        sentiment: String,
        tags: [String],
        suggestions: String,
        predicted_ctr: Number
    },
    status: { type: String, default: 'active' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export const Creative = mongoose.model('Creative', creativeSchema);

const metricsTimeseriesSchema = new mongoose.Schema({
    tenant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
    entity_type: { type: String, enum: ['campaign', 'adset', 'ad', 'account'], required: true },
    entity_id: { type: String, required: true, index: true }, // External ID or Internal ID
    platform: { type: String, required: true },
    date: { type: Date, required: true, index: true }, // Day or Hour
    granularity: { type: String, enum: ['hour', 'day'], default: 'day' },
    metrics: {
        spend: Number,
        impressions: Number,
        clicks: Number,
        conversions: Number,
        revenue: Number,
        ctr: Number,
        cpc: Number,
        cpm: Number,
        roas: Number
    },
    created_at: { type: Date, default: Date.now }
});

metricsTimeseriesSchema.index({ tenant_id: 1, entity_id: 1, date: 1 }, { unique: true });

export const MetricsTimeseries = mongoose.model('MetricsTimeseries', metricsTimeseriesSchema);
