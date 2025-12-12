import { fetchMetaAdAccounts } from './services/metaService.js';
import dotenv from 'dotenv';

dotenv.config();

const run = async () => {
    console.log('Starting debug script...');
    try {
        // Use user provided token
        const token = 'EAASOBtCFYn4BQEiX9jPWx8pE7n6mcZBJgpurYV4PwGtXZAtzWgHFvdEjgTBZC5KwZA1UzxNKTgOuWsdmBX0L0C1NraKHNuAHKvG7AjknnhzOr88JxhlZAFpZAxljfbZCRwPBSXU9EZB1NMq9vaITkaZAsbThp0EfE0YwKjmeexlgTMUGA0yJuk8Mk6n6vzwdZBsMYitlUg';
        console.log('Calling fetchMetaAdAccounts...');
        const accounts = await fetchMetaAdAccounts(token);
        console.log('Success:', accounts);
    } catch (error) {
        console.log('Caught error in script:', error.message);
    }
    console.log('Script finished.');
};

run();
