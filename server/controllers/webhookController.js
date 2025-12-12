import { WebhookEvent, MetricsTimeseries, Campaign } from '../models/index.js';

export const handleWebhook = async (req, res) => {
    const { platform } = req.params;

    try {
        const event = new WebhookEvent({
            platform,
            payload: req.body,
            received_at: new Date()
        });
        await event.save();

        // Process event asynchronously (mocked)
        // e.g., update campaign status, log metric

        res.status(200).send('OK');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error');
    }
};

export const getTenantOverview = async (req, res) => {
    try {
        const campaigns = await Campaign.countDocuments({ tenant_id: req.params.tid });
        const activeCampaigns = await Campaign.countDocuments({ tenant_id: req.params.tid, status: 'ACTIVE' });

        // Mock aggregation for total spend
        const totalSpend = 12500.50;
        const totalRevenue = 45000.00;

        res.json({
            campaigns: { total: campaigns, active: activeCampaigns },
            financials: { spend: totalSpend, revenue: totalRevenue, roas: (totalRevenue / totalSpend).toFixed(2) }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTenantMetrics = async (req, res) => {
    // Return time series data for charts
    try {
        const metrics = await MetricsTimeseries.find({ tenant_id: req.params.tid })
            .sort({ date: 1 })
            .limit(30); // Last 30 entries
        res.json(metrics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
