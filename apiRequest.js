const axios = require('axios');
const { getToken } = require('./authenticate');
require('dotenv').config();

async function makeApiRequest() {
    try {
        const token = await getToken(); // Get a valid token

        const response = await axios.get(
            `https://lcs-cx.api.rentmanager.com/Tenants?embeds=UserDefinedValues&filters=UserDefinedValues.Name,in,(Integrations%2C%20Mobile%2C%20O%26F%2C%20R%26P%2C%20Scripting%2C%20General%2C%20Technical)&fields=Name`,
            {
                headers: {
                    'Accept': 'application/json',
                    'X-RM12Api-ApiToken': token
                }
            }
        );

        console.log('API Response:', response.data);
    } catch (error) {
        console.error('Error making API request:', error.response ? error.response.data : error.message);
    }
}

makeApiRequest();
