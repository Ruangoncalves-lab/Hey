import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, '../data.json');

// Ensure DB exists
if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ tenants: [], users: [], connections: [] }, null, 2));
}

class MockModel {
    constructor(collectionName, data) {
        this.collectionName = collectionName;
        Object.assign(this, data);
    }

    static _readDb() {
        try {
            if (!fs.existsSync(DB_PATH)) return { tenants: [], users: [], connections: [] };
            return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
        } catch (e) {
            return { tenants: [], users: [], connections: [] };
        }
    }

    static _writeDb(data) {
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    }

    static async findOne(query) {
        const db = this._readDb();
        const collection = db[this.collectionName] || [];
        const item = collection.find(item => {
            for (let key in query) {
                if (item[key] !== query[key]) return false;
            }
            return true;
        });
        return item ? new this(item) : null;
    }

    static async findById(id) {
        const db = this._readDb();
        const collection = db[this.collectionName] || [];
        const item = collection.find(i => i._id === id.toString());
        return item ? new this(item) : null;
    }

    static async find(query = {}) {
        const db = this._readDb();
        const collection = db[this.collectionName] || [];
        const items = collection.filter(item => {
            for (let key in query) {
                if (item[key] !== query[key]) return false;
            }
            return true;
        });
        return items.map(i => new this(i));
    }

    static async create(data) {
        const db = this._readDb();
        const collection = db[this.collectionName] || [];

        const newItem = {
            _id: crypto.randomUUID(),
            created_at: new Date(),
            updated_at: new Date(),
            ...data
        };

        // Handle ObjectId conversion if needed (mocking it)
        if (newItem.tenant_id && typeof newItem.tenant_id === 'object') {
            newItem.tenant_id = newItem.tenant_id.toString();
        }

        collection.push(newItem);
        db[this.collectionName] = collection;
        this._writeDb(db);

        return new this(newItem);
    }

    static async findOneAndUpdate(query, update, options) {
        const db = this._readDb();
        let collection = db[this.collectionName] || [];

        let itemIndex = collection.findIndex(item => {
            for (let key in query) {
                if (item[key] !== query[key]) return false;
            }
            return true;
        });

        if (itemIndex === -1) {
            if (options && options.upsert) {
                return this.create({ ...query, ...update });
            }
            return null;
        }

        // Apply updates
        const updatedItem = { ...collection[itemIndex], ...update, updated_at: new Date() };
        collection[itemIndex] = updatedItem;

        db[this.collectionName] = collection;
        this._writeDb(db);

        return new this(updatedItem);
    }

    async save() {
        const db = MockModel._readDb();
        let collection = db[this.collectionName] || [];
        const index = collection.findIndex(i => i._id === this._id);

        if (index !== -1) {
            collection[index] = { ...this, updated_at: new Date() };
        } else {
            collection.push(this);
        }

        db[this.collectionName] = collection;
        MockModel._writeDb(db);
        return this;
    }
}

export class User extends MockModel { static collectionName = 'users'; constructor(data) { super('users', data); } }
export class Tenant extends MockModel { static collectionName = 'tenants'; constructor(data) { super('tenants', data); } }
export class Connection extends MockModel { static collectionName = 'connections'; constructor(data) { super('connections', data); } }
export class Campaign extends MockModel { static collectionName = 'campaigns'; constructor(data) { super('campaigns', data); } }
export class MetricsTimeseries extends MockModel { static collectionName = 'metrics'; constructor(data) { super('metrics', data); } }
export class Insight extends MockModel { static collectionName = 'insights'; constructor(data) { super('insights', data); } }
export class Automation extends MockModel { static collectionName = 'automations'; constructor(data) { super('automations', data); } }
export class Creative extends MockModel { static collectionName = 'creatives'; constructor(data) { super('creatives', data); } }
export class AdSet extends MockModel { static collectionName = 'adsets'; constructor(data) { super('adsets', data); } }
export class Ad extends MockModel { static collectionName = 'ads'; constructor(data) { super('ads', data); } }
export class Product extends MockModel { static collectionName = 'products'; constructor(data) { super('products', data); } }
export class Order extends MockModel { static collectionName = 'orders'; constructor(data) { super('orders', data); } }
export class WebhookEvent extends MockModel { static collectionName = 'webhook_events'; constructor(data) { super('webhook_events', data); } }
export class Log extends MockModel { static collectionName = 'logs'; constructor(data) { super('logs', data); } }
export class Notification extends MockModel { static collectionName = 'notifications'; constructor(data) { super('notifications', data); } }
export class Report extends MockModel { static collectionName = 'reports'; constructor(data) { super('reports', data); } }
export class AuditLog extends MockModel { static collectionName = 'audit_logs'; constructor(data) { super('audit_logs', data); } }
