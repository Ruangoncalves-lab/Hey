import axios from 'axios';

const META_TOKEN = 'EAASOBtCFYn4BQLZBcXGXkWoZCIJzfW3aHOlRZBIekl0SYiM6cZAm4D1i72lwYXUq5sYXVQpuNUhrSYmE1AeEl6wHaL5Vdru3r6it84kKM7a6MKjN5cS8D1M9GyrN6IEREYZApawxnC9SfXlGyzLwbzzfwsnZBP3bZBad1fZAUIj9rol2pRVYjRZBAdvkPvtanCYjWojY8';
const INVALID_TENANT_ID = 'tenant_123'; // The ID seen in logs

async function reproduce() {
    console.log('Reproducing 500 Error...');

    try {
        // We need a token, but the middleware checks the token validity. 
        // If we use a fake token, it returns 401.
        // We need a valid token for a user.
        // Let's assume the user is logged in.
        // But wait, if I don't have a valid JWT for the user, I can't pass the auth middleware.

        // Let's try to hit the endpoint without a valid JWT first (should be 401).
        console.log('1. Request without Auth...');
        try {
            await axios.post(
                `http://localhost:5000/api/tenants/${INVALID_TENANT_ID}/connections/meta/accounts`,
                { access_token: META_TOKEN }
            );
        } catch (e) {
            console.log('Status:', e.response?.status); // Should be 401
        }

        // Now let's try with a valid JWT but invalid Tenant ID in URL.
        // I need to login first to get a token.
        console.log('2. Login to get token...');
        // I'll use the user created in test-integration-flow.js
        // But I don't know the password... wait, I set it to 'hash' in the database directly?
        // In test-integration-flow.js: password_hash: 'hash'.
        // The login controller uses bcrypt.compare(password, user.password_hash).
        // bcrypt.compare('password', 'hash') will likely fail unless 'hash' is a valid bcrypt hash of 'password'.

        // I should create a new user with a known password.
    } catch (err) {
        console.error(err);
    }
}

// Actually, I can just use the `test-integration-flow.js` logic but switch the tenant ID in the URL.
