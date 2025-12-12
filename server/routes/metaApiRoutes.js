import express from 'express';
import { metaApi } from '../services/meta/api.js';
import { getInsights } from '../services/meta/getInsights.js';
import { calculateCustomMetrics } from '../services/meta/sync.js';

const router = express.Router();

// Middleware simples para extrair token do header (assumindo que o frontend envia ou pegamos do banco)
// Para simplificar, vamos pegar do query param ou header 'x-meta-token'
const getMetaToken = (req) => {
    return req.headers['x-meta-token'] || req.query.token;
};

// 2.1 Listar Contas (Já temos getAdAccounts, mas criando rota específica da API)
router.get('/adaccounts', async (req, res) => {
    try {
        // Implementado no getAdAccounts.js, mas podemos expor aqui também
        res.json({ message: 'Use /api/meta-auth/adaccounts endpoint' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2.2 Listar Campanhas
router.get('/campaigns', async (req, res) => {
    try {
        const { account_id } = req.query;
        const token = getMetaToken(req);
        if (!token || !account_id) throw new Error('Token and account_id required');

        const data = await metaApi.getCampaigns(account_id, token);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2.3 Listar AdSets
router.get('/adsets', async (req, res) => {
    try {
        const { campaign_id } = req.query;
        const token = getMetaToken(req);
        if (!token || !campaign_id) throw new Error('Token and campaign_id required');

        const data = await metaApi.getAdSets(campaign_id, token);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2.4 Listar Ads
router.get('/ads', async (req, res) => {
    try {
        const { adset_id } = req.query;
        const token = getMetaToken(req);
        if (!token || !adset_id) throw new Error('Token and adset_id required');

        const data = await metaApi.getAds(adset_id, token);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Métricas (Todas)
router.get('/metrics', async (req, res) => {
    try {
        const { account_id, date_preset } = req.query;
        const token = getMetaToken(req);
        if (!token || !account_id) throw new Error('Token and account_id required');

        const metrics = await getInsights({
            accountId: account_id,
            token,
            date_range: date_preset || 'last_30d'
        });

        res.json(metrics);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 6. Métricas Customizadas
router.get('/metrics/custom', async (req, res) => {
    try {
        const { account_id, date_preset } = req.query;
        const token = getMetaToken(req);
        if (!token || !account_id) throw new Error('Token and account_id required');

        // 1. Pega métricas nativas
        const metrics = await getInsights({
            accountId: account_id,
            token,
            date_range: date_preset || 'last_30d'
        });

        // 2. Calcula customizadas
        const custom = calculateCustomMetrics(metrics);

        res.json({
            native: metrics,
            custom: custom
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 7. Selecionar Conta de Anúncio
router.post('/accounts/select', async (req, res) => {
    try {
        const { userId, accountId } = req.body;
        if (!userId || !accountId) throw new Error('userId and accountId required');

        const { MetaService } = await import('../services/metaService.js');
        const metaService = new MetaService(''); // Token not needed for DB update
        const result = await metaService.selectAdAccount(userId, accountId);

        res.json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
