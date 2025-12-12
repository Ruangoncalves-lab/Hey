import axios from 'axios';

/**
 * Busca as contas de anúncio do usuário autenticado.
 * Endpoint: /me/adaccounts
 * 
 * @param {string} accessToken - Token de acesso (long-lived preferencialmente)
 * @returns {Promise<Array>} Lista de contas de anúncio formatada
 */
export const getAdAccounts = async (accessToken) => {
    try {
        const url = `https://graph.facebook.com/v19.0/me/adaccounts`;

        const response = await axios.get(url, {
            params: {
                access_token: accessToken,
                fields: 'account_id,name,currency,account_status,business',
                limit: 100
            }
        });

        const data = response.data.data || [];

        return data.map(acc => ({
            id: `act_${acc.account_id}`,
            name: acc.name,
            currency: acc.currency,
            status: acc.account_status,
            businessId: acc.business ? acc.business.id : null,
            businessName: acc.business ? acc.business.name : null
        }));

    } catch (error) {
        console.error('[Meta Service] Error fetching Ad Accounts:', error.response?.data || error.message);
        const msg = error.response?.data?.error?.message || 'Failed to fetch ad accounts';
        throw new Error(msg);
    }
};
