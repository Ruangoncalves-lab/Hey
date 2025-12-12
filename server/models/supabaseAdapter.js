import { supabase } from '../config/supabase.js';
import crypto from 'crypto';

// Classe auxiliar para simular a "Query" do Mongoose
class SupabaseQueryBuilder {
    constructor(tableName, modelClass, initialQuery = {}) {
        this.builder = supabase.from(tableName).select('*', { count: 'exact' });
        this.modelClass = modelClass;
        this.isSingle = false;

        // Aplica filtros iniciais
        for (const [key, value] of Object.entries(initialQuery)) {
            this.builder = this.builder.eq(key, value);
        }
    }

    // Suporte a .sort({ field: -1 })
    sort(criteria) {
        if (!criteria) return this;
        for (const [key, value] of Object.entries(criteria)) {
            // Mongoose usa -1 para desc, 1 para asc
            const ascending = value === 1 || value === 'asc';
            this.builder = this.builder.order(key, { ascending });
        }
        return this;
    }

    // Suporte a .limit(10)
    limit(n) {
        if (n) this.builder = this.builder.limit(n);
        return this;
    }

    // Suporte a .select()
    select(fields) {
        if (typeof fields === 'string' && !fields.startsWith('-')) {
            const formatted = fields.split(' ').join(',');
            this.builder = this.builder.select(formatted);
        }
        return this;
    }

    // Permite que o objeto seja "aguardado" (await) como uma Promise
    async then(resolve, reject) {
        try {
            if (this.isSingle) {
                this.builder = this.builder.single();
            }

            const { data, error, count } = await this.builder;

            if (error) {
                if (error.code === 'PGRST116' && this.isSingle) {
                    resolve(null);
                    return;
                }
                console.error(`Supabase Query Error (${this.modelClass.collectionName}):`, error.message);
                reject(new Error(error.message));
                return;
            }

            if (this.isSingle) {
                resolve(data ? new this.modelClass(data) : null);
            } else {
                const instances = (data || []).map(item => new this.modelClass(item));
                instances.totalCount = count;
                resolve(instances);
            }
        } catch (err) {
            reject(err);
        }
    }
}

class SupabaseModel {
    constructor(data) {
        Object.assign(this, data);
    }

    static findOne(query) {
        const builder = new SupabaseQueryBuilder(this.collectionName, this, query);
        builder.isSingle = true;
        return builder;
    }

    static findById(id) {
        const builder = new SupabaseQueryBuilder(this.collectionName, this);
        builder.builder = builder.builder.eq('_id', id);
        builder.isSingle = true;
        return builder;
    }

    static find(query = {}) {
        return new SupabaseQueryBuilder(this.collectionName, this, query);
    }

    static async create(data) {
        const newItem = {
            _id: data._id || crypto.randomUUID(),
            created_at: new Date(),
            updated_at: new Date(),
            ...data
        };

        if (newItem.tenant_id && typeof newItem.tenant_id === 'object') {
            newItem.tenant_id = newItem.tenant_id.toString();
        }

        const { data: created, error } = await supabase
            .from(this.collectionName)
            .insert(newItem)
            .select()
            .single();

        if (error) {
            console.error(`Supabase Create Error (${this.collectionName}):`, error.message);
            throw new Error(error.message);
        }

        return new this(created);
    }

    static async findOneAndUpdate(query, update, options) {
        // Simulação básica de update: primeiro busca, depois atualiza
        let builder = supabase.from(this.collectionName).select('_id');
        for (const [key, value] of Object.entries(query)) {
            builder = builder.eq(key, value);
        }
        const { data: found } = await builder.maybeSingle();

        if (!found) {
            if (options && options.upsert) {
                return this.create({ ...query, ...update });
            }
            return null;
        }

        const updatedData = { ...update, updated_at: new Date() };
        const { data, error } = await supabase
            .from(this.collectionName)
            .update(updatedData)
            .eq('_id', found._id)
            .select()
            .single();

        if (error) {
            console.error(`Supabase Update Error (${this.collectionName}):`, error.message);
            throw new Error(error.message);
        }

        return new this(data);
    }

    static async countDocuments(query = {}) {
        let builder = supabase.from(this.collectionName).select('*', { count: 'exact', head: true });
        for (const [key, value] of Object.entries(query)) {
            builder = builder.eq(key, value);
        }
        const { count, error } = await builder;
        if (error) return 0;
        return count;
    }

    async save() {
        const { _id, ...updateData } = this;
        updateData.updated_at = new Date();

        const { data, error } = await supabase
            .from(this.constructor.collectionName)
            .update(updateData)
            .eq('_id', _id)
            .select()
            .single();

        if (error) {
            console.error(`Supabase Save Error:`, error.message);
            throw new Error(error.message);
        }

        Object.assign(this, data);
        return this;
    }
}

export class User extends SupabaseModel { static collectionName = 'users'; }
export class Tenant extends SupabaseModel { static collectionName = 'tenants'; }
export class Connection extends SupabaseModel { static collectionName = 'connections'; }
export class Campaign extends SupabaseModel { static collectionName = 'campaigns'; }
export class MetricsTimeseries extends SupabaseModel { static collectionName = 'metrics'; }
export class Insight extends SupabaseModel { static collectionName = 'insights'; }
export class Automation extends SupabaseModel { static collectionName = 'automations'; }
export class Creative extends SupabaseModel { static collectionName = 'creatives'; }
export class AdSet extends SupabaseModel { static collectionName = 'adsets'; }
export class Ad extends SupabaseModel { static collectionName = 'ads'; }
export class Product extends SupabaseModel { static collectionName = 'products'; }
export class Order extends SupabaseModel { static collectionName = 'orders'; }
export class WebhookEvent extends SupabaseModel { static collectionName = 'webhook_events'; }
export class Log extends SupabaseModel { static collectionName = 'logs'; }
export class Notification extends SupabaseModel { static collectionName = 'notifications'; }
export class Report extends SupabaseModel { static collectionName = 'reports'; }
export class AuditLog extends SupabaseModel { static collectionName = 'audit_logs'; }
