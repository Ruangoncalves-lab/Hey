import { Report } from '../models/index.js';

export const getReports = async (req, res) => {
    try {
        const reports = await Report.find({ tenant_id: req.params.tid }).sort({ created_at: -1 });
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const generateReport = async (req, res) => {
    try {
        const report = new Report({
            tenant_id: req.params.tid,
            name: req.body.name,
            type: req.body.type,
            parameters: req.body.parameters,
            created_by: req.user._id,
            status: 'processing'
        });

        await report.save();

        // Trigger async job here (mocked)
        setTimeout(async () => {
            report.status = 'completed';
            report.url = `https://api.trafficpro.com/reports/${report._id}.pdf`;
            await report.save();
        }, 5000);

        res.status(201).json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Social Media Controller (Mocked)
export const getSocialCalendar = async (req, res) => {
    // Return mocked calendar events
    res.json([
        { id: 1, title: 'Promo Post', date: '2023-11-01', platform: 'instagram' },
        { id: 2, title: 'Video Reel', date: '2023-11-02', platform: 'tiktok' }
    ]);
};

export const postSocial = async (req, res) => {
    // Mock posting to social media
    res.json({ message: 'Post scheduled successfully', id: Date.now() });
};

export const getSocialAccounts = async (req, res) => {
    res.json([
        { platform: 'facebook', connected: true, name: 'My Page' },
        { platform: 'instagram', connected: true, name: '@mypage' }
    ]);
};
