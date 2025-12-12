import cron from 'node-cron';
import { createClient } from '@supabase/supabase-js';
import { syncAccount } from '../services/meta/sync.js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const initMetaSyncJob = () => {
    console.log('[Scheduler] Inicializando Job de Sync Meta Ads (15 min)...');

    // Rodar a cada 15 minutos
    cron.schedule('*/15 * * * *', async () => {
        console.log('[Meta Job] Iniciando sincronização automática...');

        try {
            // 1. Buscar todas as conexões ativas do Meta
            const { data: connections, error } = await supabase
                .from('connections')
                .select('*')
                .eq('platform', 'meta')
                .eq('status', 'active');

            if (error) throw error;

            console.log(`[Meta Job] Encontradas ${connections.length} conexões para sincronizar.`);

            for (const conn of connections) {
                if (!conn.access_token || !conn.account_id) {
                    console.warn(`[Meta Job] Conexão incompleta para Tenant ${conn.tenant_id}`);
                    continue;
                }

                try {
                    await syncAccount(conn.account_id, conn.access_token, conn.tenant_id);
                    console.log(`[Meta Job] Sucesso: Tenant ${conn.tenant_id}`);
                } catch (syncError) {
                    console.error(`[Meta Job] Falha ao sincronizar Tenant ${conn.tenant_id}:`, syncError.message);
                }
            }

        } catch (err) {
            console.error('[Meta Job] Erro crítico no job:', err);
        }
    });
};
