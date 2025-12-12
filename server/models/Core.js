import mongoose from 'mongoose';

const tenantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    plan: { type: String, enum: ['free', 'pro', 'enterprise'], default: 'free' },
    settings: {
        timezone: { type: String, default: 'UTC' },
        currency: { type: String, default: 'USD' },
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export const Tenant = mongoose.model('Tenant', tenantSchema);

const userSchema = new mongoose.Schema({
    tenant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    role: { type: String, enum: ['admin', 'manager', 'analyst', 'viewer'], default: 'viewer' },
    last_login: Date,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', userSchema);

const connectionSchema = new mongoose.Schema({
    tenant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
    platform: { type: String, enum: ['meta', 'google', 'tiktok', 'whatsapp', 'linkedin'], required: true },
    access_token: { type: String, required: true }, // Should be encrypted in real app
    refresh_token: String,
    account_id: String,
    account_name: String,
    status: { type: String, enum: ['active', 'expired', 'error'], default: 'active' },
    last_synced_at: Date,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export const Connection = mongoose.model('Connection', connectionSchema);
