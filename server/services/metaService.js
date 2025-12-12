import { FacebookAdsApi, AdAccount, Campaign, AdSet, Ad } from 'facebook-nodejs-business-sdk';
import { supabase } from '../config/supabase.js';

export class MetaService {
    constructor(accessToken) {
        this.accessToken = accessToken;
        this.api = FacebookAdsApi.init(accessToken);
    }

    /**
     * Fetch all ad accounts for the connected user.
     */
    async getAdAccounts() {
        try {
            const me = await new this.api.call('GET', ['me', 'adaccounts'], {
                fields: 'name,account_id,account_status,business,currency,timezone_name'
            });
            return me; // Returns array of ad accounts
        } catch (error) {
            console.error('Error fetching ad accounts:', error);
            throw error;
        }
    }

    /**
     * Save fetched ad accounts to Supabase.
     */
    async saveAdAccounts(userId, adAccounts) {
        const accountsToUpsert = adAccounts.map(acc => ({
            user_id: userId,
            account_id: acc.account_id,
            name: acc.name,
            currency: acc.currency,
            business_id: acc.business?.id,
            business_name: acc.business?.name,
            is_selected: false // Default to false
        }));

        const { error } = await supabase
            .from('meta_ad_accounts')
            .upsert(accountsToUpsert, { onConflict: 'account_id' });

        if (error) throw new Error(`Supabase Error: ${error.message}`);
        return accountsToUpsert;
    }

    /**
     * Select an ad account as active.
     */
    async selectAdAccount(userId, accountId) {
        // 1. Deselect all for this user
        await supabase
            .from('meta_ad_accounts')
            .update({ is_selected: false })
            .eq('user_id', userId);

        // 2. Select the chosen one
        const { data, error } = await supabase
            .from('meta_ad_accounts')
            .update({ is_selected: true })
            .eq('account_id', accountId)
            .eq('user_id', userId)
            .select()
            .single();

        if (error) throw error;
        return data;
    }
}

export const syncMetaAccount = async (connection) => {
    console.log('Syncing meta account for connection:', connection._id);
    // TODO: Implement full sync logic
    // const service = new MetaService(connection.access_token);
    return { success: true };
};

export const createMetaCampaign = async (user, campaignData) => {
    console.log('Creating meta campaign:', campaignData);
    // TODO: Implement creation logic
    return { id: 'mock_campaign_id' };
};

export const fetchMetaAdAccounts = async (accessToken) => {
    const service = new MetaService(accessToken);
    return await service.getAdAccounts();
};

export const fetchMetaPixels = async (accessToken, accountId) => {
    console.log('Fetching pixels for account:', accountId);
    // TODO: Implement pixel fetching
    return [];
};
