import express from 'express';
import { protect } from '../middleware/auth.js';
import {
    getTenantOverview,
    getTenantMetrics
} from '../controllers/webhookController.js';
import {
    getCampaigns,
    getCampaignById,
    createCampaign,
    updateCampaign,
    getTopCampaigns
} from '../controllers/campaignController.js';
import {
    getCreatives,
    getCreativeById,
    uploadCreative
} from '../controllers/creativeController.js';
import {
    getInsights,
    applyInsight,
    getAutomations,
    createAutomation
} from '../controllers/insightController.js';
import {
    getReports,
    generateReport,
    getSocialCalendar,
    postSocial,
    getSocialAccounts
} from '../controllers/reportController.js';

import {
    getConnections,
    createConnection,
    listMetaAccounts,
    listMetaPixels,
    syncConnection
} from '../controllers/connectionController.js';

const router = express.Router({ mergeParams: true });

// All routes here are protected
router.use(protect);
// Tenant is validated in server.js middleware

// Connections
router.get('/connections', getConnections);
router.post('/connections', createConnection);
router.post('/connections/meta/accounts', listMetaAccounts);
router.post('/connections/meta/pixels', listMetaPixels);
router.post('/connections/:connectionId/sync', syncConnection);

// Dashboard
router.get('/overview', getTenantOverview);
router.get('/metrics', getTenantMetrics);
router.get('/top-campaigns', getTopCampaigns);

// Campaigns
router.get('/campaigns', getCampaigns);
router.post('/campaigns', createCampaign);
router.get('/campaigns/:id', getCampaignById);
router.put('/campaigns/:id', updateCampaign);

// Creatives
router.get('/creatives', getCreatives);
router.post('/creatives/upload', uploadCreative);
router.get('/creatives/:id', getCreativeById);

// Insights & Automations
router.get('/insights', getInsights);
router.post('/insights/apply', applyInsight);
router.get('/automations', getAutomations);
router.post('/automations', createAutomation);

// Reports
router.get('/reports', getReports);
router.post('/reports/generate', generateReport);

// Social Media
router.get('/social/calendar', getSocialCalendar);
router.post('/social/post', postSocial);
router.get('/social/accounts', getSocialAccounts);

export default router;
