import { Connection } from '../models/index.js';
import { syncMetaAccount, fetchMetaAdAccounts, fetchMetaPixels } from '../services/metaService.js';

export const getConnections = async (req, res) => {
    try {
        const connections = await Connection.find({ tenant_id: req.tenant._id });
        res.json(connections);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createConnection = async (req, res) => {
    try {
        const { platform, access_token, account_id, account_name } = req.body;

        // Check if connection already exists
        const existing = await Connection.findOne({
            tenant_id: req.tenant._id,
            platform,
            account_id
        });

        if (existing) {
            // Update token
            existing.access_token = access_token;
            existing.status = 'active';
            await existing.save();

            // Trigger initial sync
            if (platform === 'meta') {
                syncMetaAccount(existing).catch(console.error);
            }

            return res.json(existing);
        }

        const connection = new Connection({
            tenant_id: req.tenant._id,
            platform,
            access_token,
            account_id,
            account_name: account_name || `${platform} Account`,
            status: 'active'
        });

        await connection.save();

        // Trigger initial sync
        if (platform === 'meta') {
            syncMetaAccount(connection).catch(console.error);
        }

        res.status(201).json(connection);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const listMetaAccounts = async (req, res) => {
    try {
        const { access_token } = req.body;
        console.log('listMetaAccounts chamada. A validar token...');

        if (!access_token) {
            return res.status(400).json({ message: 'Token de acesso é obrigatório' });
        }

        // Tenta buscar contas usando o serviço
        // O serviço (fetchMetaAdAccounts) já deve ter sua própria lógica de try/catch, 
        // mas aqui garantimos que não crashe o controller.
        const accounts = await fetchMetaAdAccounts(access_token);

        // Validação defensiva: se o SDK retornar null/undefined sem lançar erro
        if (!accounts || !Array.isArray(accounts)) {
            console.warn('Meta SDK retornou dados inválidos ou nulos.');
            // Retorna array vazio em vez de erro 500 para não quebrar o frontend
            return res.json([]);
        }

        console.log(`Sucesso: ${accounts.length} contas encontradas.`);
        res.json(accounts);

    } catch (error) {
        console.error('ERRO CRÍTICO NO META CONTROLLER:', error);

        // Tenta extrair a mensagem de erro específica do Facebook, se existir
        const fbErrorMessage = error.response?.data?.error?.message;
        const finalMessage = fbErrorMessage || error.message || 'Erro desconhecido ao conectar com o Facebook';

        // Garante que a resposta é SEMPRE um JSON com status code apropriado
        res.status(500).json({
            message: `Erro na integração: ${finalMessage}`,
            details: error.toString(),
            code: 'META_API_ERROR'
        });
    }
};

export const listMetaPixels = async (req, res) => {
    try {
        const { access_token, account_id } = req.body;
        if (!access_token || !account_id) {
            return res.status(400).json({ message: 'Access token and Account ID are required' });
        }

        const pixels = await fetchMetaPixels(access_token, account_id);
        res.json(pixels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const syncConnection = async (req, res) => {
    try {
        const { connectionId } = req.params;
        // Ensure connection belongs to tenant
        const connection = await Connection.findOne({ _id: connectionId, tenant_id: req.tenant._id });

        if (!connection) {
            return res.status(404).json({ message: 'Connection not found' });
        }

        if (connection.platform === 'meta') {
            const result = await syncMetaAccount(connection);

            connection.last_synced_at = new Date();
            connection.status = 'active';
            await connection.save();

            return res.json({ message: 'Sync completed', result });
        }

        res.status(400).json({ message: 'Platform not supported for sync' });
    } catch (error) {
        console.error('Sync Error:', error);
        res.status(500).json({ message: 'Sync failed: ' + error.message });
    }
};
