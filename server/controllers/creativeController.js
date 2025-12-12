import { Creative } from '../models/index.js';

// Mock AI Analysis Service
const analyzeCreativeWithAI = async (url) => {
    // In a real app, this would call OpenAI or a Vision API
    return {
        score: Math.floor(Math.random() * 100),
        sentiment: 'positive',
        tags: ['vibrant', 'engaging', 'product-focused'],
        suggestions: 'Consider adding more contrast to the CTA button.',
        predicted_ctr: (Math.random() * 2).toFixed(2)
    };
};

export const uploadCreative = async (req, res) => {
    try {
        // Assuming file upload is handled by middleware and we get a URL or path
        // For this example, we expect a URL in the body or a file path from multer
        const { name, type, url } = req.body;

        const aiAnalysis = await analyzeCreativeWithAI(url);

        const creative = new Creative({
            tenant_id: req.params.tid,
            name,
            type,
            url,
            ai_analysis: aiAnalysis
        });

        const createdCreative = await creative.save();
        res.status(201).json(createdCreative);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCreatives = async (req, res) => {
    try {
        const creatives = await Creative.find({ tenant_id: req.params.tid }).sort({ created_at: -1 });
        res.json(creatives);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCreativeById = async (req, res) => {
    try {
        const creative = await Creative.findOne({ _id: req.params.id, tenant_id: req.params.tid });
        if (creative) {
            res.json(creative);
        } else {
            res.status(404).json({ message: 'Creative not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
