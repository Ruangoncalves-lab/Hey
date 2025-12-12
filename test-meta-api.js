const accessToken = 'EAASOBtCFYn4BQMXZCAqljoZA7hDRZARokOQZAlTBUNnaJdEcgNg3SB0yXKuePODL6yqvrWaz7GS36ZB3ZBLOLSy3CGbo4SsUrywtPcAbnUIivIklezCi1laQhsimYO1C8VecQ4xkGe3FhOAJpHHv7VDre9upeKDkvtRFZAtjCX4Ue4llrkEAgPW8d1zZAA9DVlrCBiQSDsTrdgR51gzSL76t7RZAxgUQcJMEGN1DhRuZCZAKXPo9jsr60Id4qv3RSwr1JkPpjwLZBQ7FZCZBo6xrXyhrCZCZCj3a7AvloEuof55o';
const accountId = 'act_8339726109376773';

async function testMetaApi() {
    console.log(`Fetching campaigns for ${accountId}...`);
    try {
        const res = await fetch(
            `https://graph.facebook.com/v21.0/${accountId}/campaigns?fields=id,name,status,objective,buying_type,spend_cap,start_time,stop_time&limit=500&access_token=${accessToken}`
        );
        const data = await res.json();

        if (data.error) {
            console.error('API Error:', data.error);
        } else {
            console.log('Success! Campaigns found:', data.data.length);
            console.log(JSON.stringify(data.data, null, 2));
        }
    } catch (err) {
        console.error('Network Error:', err);
    }
}

testMetaApi();
