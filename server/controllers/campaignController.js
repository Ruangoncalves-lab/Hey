import { Campaign, MetricsTimeseries } from '../models/index.js';
import { logAction } from '../utils/logger.js';

export const getCampaigns = async (req, res) => {
    try {
        const { status, objective } = req.query;
        const query = { tenant_id: req.params.tid };

        if (status) query.status = status;
        if (objective) query.objective = objective;

        const campaigns = await Campaign.find(query).sort({ created_at: -1 });
        res.json(campaigns);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCampaignById = async (req, res) => {
    try {
        const campaign = await Campaign.findOne({ _id: req.params.id, tenant_id: req.params.tid });
        if (campaign) {
            res.json(campaign);
        } else {
            res.status(404).json({ message: 'Campaign not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

import { Connection } from '../models/index.js';
import { createMetaCampaign } from '../services/metaService.js';

export const createCampaign = async (req, res) => {
    try {
        const { platform, name, objective, budget } = req.body;
        let externalId = `temp_${Date.now()}`;
        let status = 'DRAFT';

        if (platform === 'meta') {
            // Find active connection
            const connection = await Connection.findOne({
                tenant_id: req.params.tid,
                platform: 'meta',
                status: 'active'
            });

            if (!connection) {
                return res.status(400).json({ message: 'No active Meta connection found' });
            }

            // Create on Meta
            const metaResult = await createMetaCampaign(connection, { name, objective, budget });
            externalId = metaResult.id;
            status = metaResult.status;
        }

        const campaign = new Campaign({
            ...req.body,
            tenant_id: req.params.tid,
            external_id: externalId,
            status: status
        });
        const createdCampaign = await campaign.save();

        await logAction(req.params.tid, req.user._id, 'create', 'campaign', createdCampaign._id, { name: createdCampaign.name });

        res.status(201).json(createdCampaign);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findOne({ _id: req.params.id, tenant_id: req.params.tid });

        if (campaign) {
            Object.assign(campaign, req.body);
            const updatedCampaign = await campaign.save();

            await logAction(req.params.tid, req.user._id, 'update', 'campaign', updatedCampaign._id, { changes: req.body });

            res.json(updatedCampaign);
        } else {
            res.status(404).json({ message: 'Campaign not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTopCampaigns = async (req, res) => {
    try {
        // Example aggregation to find top campaigns by spend or conversions
        const campaigns = await Campaign.find({ tenant_id: req.params.tid })
            .sort({ 'performance_summary.spend': -1 })
            .limit(5);
        res.json(campaigns);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
