import bizSdk from 'facebook-nodejs-business-sdk';

const accessToken = 'EAASOBtCFYn4BQLZBcXGXkWoZCIJzfW3aHOlRZBIekl0SYiM6cZAm4D1i72lwYXUq5sYXVQpuNUhrSYmE1AeEl6wHaL5Vdru3r6it84kKM7a6MKjN5cS8D1M9GyrN6IEREYZApawxnC9SfXlGyzLwbzzfwsnZBP3bZBad1fZAUIj9rol2pRVYjRZBAdvkPvtanCYjWojY8';

const test = async () => {
    try {
        bizSdk.FacebookAdsApi.init(accessToken);
        const user = new bizSdk.User('me');
        console.log('Fetching accounts...');
        const accounts = await user.getAdAccounts(['account_id', 'name', 'currency', 'account_status']);

        console.log('Success! Accounts found:');
        accounts.forEach(acc => {
            console.log(`- ${acc.name} (ID: act_${acc.account_id})`);
        });
    } catch (error) {
        console.error('Error:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
    }
};

test();
