import { Insight, Automation } from '../models/index.js';

export const getInsights = async (req, res) => {
    try {
        const insights = await Insight.find({ tenant_id: req.params.tid }).sort({ created_at: -1 });
        res.json(insights);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const applyInsight = async (req, res) => {
    // Logic to apply the insight (e.g., auto-fix)
    try {
        const insight = await Insight.findOne({ _id: req.body.insight_id, tenant_id: req.params.tid });
        if (!insight) return res.status(404).json({ message: 'Insight not found' });

        insight.status = 'resolved';
        await insight.save();

        res.json({ message: 'Insight applied successfully', insight });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAutomations = async (req, res) => {
    try {
        const automations = await Automation.find({ tenant_id: req.params.tid });
        res.json(automations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createAutomation = async (req, res) => {
    try {
        const automation = new Automation({
            ...req.body,
            tenant_id: req.params.tid
        });
        const createdAutomation = await automation.save();
        res.status(201).json(createdAutomation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
