import cron from 'node-cron';
import { Campaign, MetricsTimeseries, Insight, Automation, Creative, Connection } from '../models/index.js';
import { syncMetaAccount } from '../services/metaService.js';

// 1. Metrics Aggregator (Hourly)
const metricsAggregatorJob = async () => {
    console.log('Running Metrics Aggregator Job...');

    try {
        // Find all active Meta connections
        const connections = await Connection.find({ platform: 'meta', status: 'active' });

        for (const connection of connections) {
            try {
                await syncMetaAccount(connection);
                console.log(`Synced Meta account for tenant ${connection.tenant_id}`);

                // Update last synced time
                connection.last_synced_at = new Date();
                await connection.save();
            } catch (err) {
                console.error(`Failed to sync tenant ${connection.tenant_id}:`, err.message);
            }
        }
    } catch (error) {
        console.error('Error in Metrics Aggregator:', error);
    }
};

// 2. Insights Engine (Every 15 mins)
const insightsEngineJob = async () => {
    console.log('Running Insights Engine Job...');
    // Logic: Analyze metrics for anomalies
    try {
        // Mock: Check if any campaign has high CPA
        const campaigns = await Campaign.find({ status: 'ACTIVE' });
        for (const campaign of campaigns) {
            if (campaign.performance_summary && campaign.performance_summary.cpc > 5) {
                await Insight.create({
                    tenant_id: campaign.tenant_id,
                    type: 'alert',
                    severity: 'high',
                    title: `High CPC detected for ${campaign.name}`,
                    description: `CPC is ${campaign.performance_summary.cpc}, which is above threshold.`,
                    data: { campaign_id: campaign._id }
                });
            }
        }
    } catch (error) {
        console.error('Error in Insights Engine:', error);
    }
};

// 3. Automation Runner (Every 5 mins)
const automationRunnerJob = async () => {
    console.log('Running Automation Runner Job...');
    // Logic: Check automation rules and execute actions
};

// 4. Social Publisher (Every 1 min)
const socialPublisherJob = async () => {
    // console.log('Running Social Publisher Job...');
    // Logic: Check for scheduled posts due now and publish
};

import { initMetaSyncJob } from './metaSyncJob.js';

export const initScheduler = () => {
    // Schedule jobs
    cron.schedule('0 * * * *', metricsAggregatorJob); // Hourly
    cron.schedule('*/15 * * * *', insightsEngineJob); // Every 15 mins
    cron.schedule('*/5 * * * *', automationRunnerJob); // Every 5 mins
    cron.schedule('* * * * *', socialPublisherJob); // Every minute

    // New Meta Sync Job (Standalone)
    initMetaSyncJob();

    console.log('Scheduler initialized.');
};
