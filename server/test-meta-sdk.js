import bizSdk from 'facebook-nodejs-business-sdk';

console.log('bizSdk:', bizSdk);
console.log('FacebookAdsApi:', bizSdk.FacebookAdsApi);

try {
    bizSdk.FacebookAdsApi.init('test-token');
    console.log('Init successful');
} catch (e) {
    console.error('Init failed:', e.message);
}
