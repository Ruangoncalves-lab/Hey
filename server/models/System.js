import mongoose from 'mongoose';

const insightSchema = new mongoose.Schema({
    tenant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
    type: { type: String, enum: ['alert', 'opportunity', 'anomaly'], required: true },
    severity: { type: String, enum: ['low', 'medium', 'high', 'critical'], required: true },
    title: { type: String, required: true },
    description: String,
    data: mongoose.Schema.Types.Mixed, // Flexible payload
    status: { type: String, enum: ['new', 'acknowledged', 'resolved'], default: 'new' },
    created_at: { type: Date, default: Date.now }
});

export const Insight = mongoose.model('Insight', insightSchema);

const automationSchema = new mongoose.Schema({
    tenant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
    name: { type: String, required: true },
    trigger: {
        type: { type: String, required: true }, // e.g., 'metric_threshold', 'schedule'
        config: mongoose.Schema.Types.Mixed
    },
    actions: [{
        type: { type: String, required: true }, // e.g., 'pause_campaign', 'send_notification'
        config: mongoose.Schema.Types.Mixed
    }],
    is_active: { type: Boolean, default: true },
    last_run_at: Date,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export const Automation = mongoose.model('Automation', automationSchema);

const webhookEventSchema = new mongoose.Schema({
    tenant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', index: true }, // Optional if unknown
    platform: { type: String, required: true },
    event_id: { type: String, index: true },
    payload: mongoose.Schema.Types.Mixed,
    processed: { type: Boolean, default: false },
    error: String,
    received_at: { type: Date, default: Date.now }
});

export const WebhookEvent = mongoose.model('WebhookEvent', webhookEventSchema);

const reportSchema = new mongoose.Schema({
    tenant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
    name: { type: String, required: true },
    type: { type: String, required: true }, // e.g., 'pdf', 'csv'
    status: { type: String, enum: ['pending', 'processing', 'completed', 'failed'], default: 'pending' },
    url: String, // S3 or local path
    parameters: mongoose.Schema.Types.Mixed,
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    created_at: { type: Date, default: Date.now }
});

export const Report = mongoose.model('Report', reportSchema);

const auditLogSchema = new mongoose.Schema({
    tenant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    action: { type: String, required: true },
    resource: { type: String, required: true },
    resource_id: String,
    details: mongoose.Schema.Types.Mixed,
    ip_address: String,
    created_at: { type: Date, default: Date.now }
});

export const AuditLog = mongoose.model('AuditLog', auditLogSchema);
