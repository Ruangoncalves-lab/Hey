import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const verifyMetrics = async () => {
    console.log('Verifying metrics in database...');

    const { data: connections, error: connError } = await supabase
        .from('connections')
        .select('*');

    if (connError) console.error('Error fetching connections:', connError);
    else {
        console.log(`Found ${connections.length} connections.`);
        connections.forEach(c => console.log(`- Tenant: ${c.tenant_id}, Platform: ${c.platform}, Status: ${c.status}, AccountID: ${c.account_id}`));
    }

    const { data: campaigns, error } = await supabase
        .from('campaigns')
        .select('_id, name, performance_summary');

    if (error) {
        console.error('Error fetching campaigns:', error);
        return;
    }

    console.log(`Found ${campaigns.length} campaigns.`);

    campaigns.forEach(camp => {
        console.log(`\nCampaign: ${camp.name} (${camp.id})`);
        console.log('Performance Summary:', JSON.stringify(camp.performance_summary, null, 2));
    });

    // Also check MetricsTimeseries
    const { data: metrics, error: metricsError } = await supabase
        .from('metrics')
        .select('*')
        .limit(5);

    if (metricsError) {
        console.error('Error fetching metrics timeseries:', metricsError);
    } else {
        console.log(`\nFound ${metrics.length} metrics entries (showing first 5):`);
        metrics.forEach(m => {
            console.log(`- Date: ${m.date}, Entity: ${m.entity_id}, Metrics:`, JSON.stringify(m.metrics).substring(0, 100) + '...');
        });
    }
};

verifyMetrics();
