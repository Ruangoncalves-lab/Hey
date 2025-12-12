import axios from 'axios';

/**
 * Módulo especializado para buscar Insights do Meta Ads com retry e tratamento de erros.
 * 
 * @param {Object} params
 * @param {string} params.accountId - ID da conta de anúncios (ex: act_123456)
 * @param {string} params.token - Token de acesso do usuário
 * @param {string} [params.date_range] - Range de datas (ex: 'last_30d', 'today', 'lifetime')
 * @param {string} [params.breakdowns] - Breakdowns opcionais (ex: 'age,gender')
 * @returns {Promise<Object>} Objeto com todas as métricas normalizadas
 */
export const getInsights = async ({ accountId, token, date_range = 'maximum', breakdowns = '', level = 'account', returnArray = false }) => {
    const API_VERSION = 'v19.0';
    const BASE_URL = `https://graph.facebook.com/${API_VERSION}`;

    // Lista simplificada e segura de campos
    const FIELDS = [
        'account_id',
        'account_name',
        'campaign_id',
        'campaign_name',
        'spend',
        'impressions',
        'clicks',
        'cpc',
        'cpm',
        'ctr',
        'reach',
        'frequency',
        'actions',
        'action_values',
        'objective',
        'buying_type',
        'canvas_avg_view_time',
        'conversion_rate_ranking',
        'cost_per_action_type',
        'cost_per_inline_link_click',
        'cost_per_unique_click',
        'date_start',
        'date_stop',
        'inline_link_clicks',
        'inline_post_engagement',
        'unique_clicks',
        'unique_ctr',
        'unique_inline_link_clicks',
        'video_play_actions',
        'website_ctr'
    ].join(',');

    const url = `${BASE_URL}/${accountId}/insights`;

    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
        try {
            const response = await axios.get(url, {
                params: {
                    access_token: token,
                    fields: FIELDS,
                    date_preset: date_range !== 'custom' ? date_range : undefined,
                    breakdowns: breakdowns || undefined,
                    level: level
                }
            });

            if (returnArray) {
                const dataList = response.data.data || [];
                return dataList.map(item => normalizeMetrics(item));
            }

            const data = response.data.data && response.data.data.length > 0 ? response.data.data[0] : {};

            return normalizeMetrics(data);

        } catch (error) {
            attempts++;

            const isTokenError = error.response?.data?.error?.code === 190;
            const isRateLimit = error.response?.data?.error?.code === 17;

            if (isTokenError) {
                throw new Error('Meta Ads Token Expired or Invalid');
            }

            if (attempts >= maxAttempts) {
                console.error(`[Meta Insights] Failed after ${maxAttempts} attempts:`, error.message);
                throw error;
            }

            // Exponential Backoff: 1s, 2s, 4s...
            const delay = Math.pow(2, attempts - 1) * 1000;
            console.warn(`[Meta Insights] Attempt ${attempts} failed. Retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
};

/**
 * Normaliza os dados retornados, garantindo que campos ausentes sejam 0.
 * Converte strings numéricas para numbers.
 */
const normalizeMetrics = (data) => {
    // Helper para converter valor seguro
    const val = (v) => v ? parseFloat(v) : 0;

    // Helper para extrair valor de listas de ações (ex: actions, action_values)
    const getActionValue = (list, actionType) => {
        if (!Array.isArray(list)) return 0;
        const item = list.find(i => i.action_type === actionType);
        return item ? parseFloat(item.value) : 0;
    };

    return {
        impressions: val(data.impressions),
        reach: val(data.reach),
        frequency: val(data.frequency),
        spend: val(data.spend),
        clicks: val(data.clicks),
        unique_clicks: val(data.unique_clicks),
        cpc: val(data.cpc),
        cpm: val(data.cpm),
        ctr: val(data.ctr),

        // Métricas de Vídeo (via actions se necessário)
        video_plays: getActionValue(data.actions, 'video_view'),

        // Engajamento
        post_engagement: getActionValue(data.actions, 'post_engagement'),

        // Landing Page
        landing_page_views: getActionValue(data.actions, 'landing_page_view'),

        // Leads
        leads: getActionValue(data.actions, 'lead'),
        cost_per_lead: getActionValue(data.cost_per_action_type, 'lead'),

        // E-commerce / Conversões
        add_to_cart: getActionValue(data.actions, 'add_to_cart'),
        initiate_checkout: getActionValue(data.actions, 'initiate_checkout'),
        purchases: getActionValue(data.actions, 'purchase'),
        cost_per_purchase: getActionValue(data.cost_per_action_type, 'purchase'),

        // Valores de Conversão (Revenue)
        purchase_value: getActionValue(data.action_values, 'purchase'),
        omni_purchase_value: getActionValue(data.action_values, 'omni_purchase'),

        // ROAS (Calculado se não vier, mas cost_per_action_type ajuda)
        // purchase_roas não está na lista simplificada, então calculamos se possível
        // ou confiamos no action_values / spend

        // Messaging
        messaging_conversations_started: getActionValue(data.actions, 'onsite_conversion.messaging_conversation_started_7d'),

        // Raw Data (para debug ou campos extras)
        _raw: data
    };
};
