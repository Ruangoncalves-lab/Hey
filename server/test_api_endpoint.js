import axios from 'axios';

const API_URL = 'http://localhost:5000/api/connections/meta/accounts';

async function testApiEndpoint() {
    console.log('--- Testing Meta Accounts Endpoint ---');
    try {
        // Test with invalid token to trigger robust error handling
        console.log('Sending request with invalid token...');
        const response = await axios.post(API_URL, {
            access_token: 'INVALID_TOKEN_TEST'
        });

        console.log('Response Status:', response.status);
        console.log('Response Data:', response.data);
    } catch (error) {
        if (error.response) {
            console.log('✅ Expected Error Response Received:');
            console.log('Status:', error.response.status);
            console.log('Data:', error.response.data);

            if (error.response.status === 500 && error.response.data.code === 'META_API_ERROR') {
                console.log('✅ SUCCESS: Controller handled the error gracefully with the correct code.');
            } else if (error.response.status === 500) {
                console.log('⚠️ WARNING: Controller returned 500, but check if the message is structured correctly.');
            } else {
                console.log('❌ UNEXPECTED Status Code.');
            }
        } else {
            console.error('❌ Request failed without response:', error.message);
        }
    }
}

testApiEndpoint();
