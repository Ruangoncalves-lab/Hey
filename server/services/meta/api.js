import axios from 'axios';

const API_VERSION = 'v19.0';
const BASE_URL = `https://graph.facebook.com/${API_VERSION}`;

/**
 * Serviço para listar entidades do Meta Ads.
 */
export const metaApi = {
    /**
     * Lista campanhas de uma conta.
     */
    getCampaigns: async (accountId, token) => {
        const url = `${BASE_URL}/${accountId}/campaigns`;
        const response = await axios.get(url, {
            params: {
                access_token: token,
                fields: 'id,name,status,objective,buying_type,start_time,stop_time',
                limit: 500
            }
        });
        return response.data.data;
    },

    /**
     * Lista conjuntos de anúncios de uma campanha.
     */
    getAdSets: async (campaignId, token) => {
        const url = `${BASE_URL}/${campaignId}/adsets`;
        const response = await axios.get(url, {
            params: {
                access_token: token,
                fields: 'id,name,status,daily_budget,lifetime_budget,targeting,start_time,end_time',
                limit: 500
            }
        });
        return response.data.data;
    },

    /**
     * Lista anúncios de um conjunto.
     */
    getAds: async (adSetId, token) => {
        const url = `${BASE_URL}/${adSetId}/ads`;
        const response = await axios.get(url, {
            params: {
                access_token: token,
                fields: 'id,name,status,creative',
                limit: 500
            }
        });
        return response.data.data;
    }
};
