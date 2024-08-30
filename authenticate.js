const axios = require('axios');
require('dotenv').config(); // Load environment variables

// Variables to store the token and its expiration time
let apiToken = null;
let tokenExpiryTime = null;

// Load credentials from environment variables
const username = process.env.RENT_MANAGER_USERNAME;
const password = process.env.RENT_MANAGER_PASSWORD;
const locationID = process.env.RENT_MANAGER_LOCATION_ID;
const corpID = process.env.RENT_MANAGER_CORPID;

async function authenticate() {
  try {
    const userAuthorizationModel = {
      Username: username,
      Password: password,
      LocationID: parseInt(locationID)
    };

    const response = await axios.post(
      `https://${corpID}.api.rentmanager.com/Authentication/AuthorizeUser`,
      userAuthorizationModel,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );

    apiToken = response.data.trim('"');
    tokenExpiryTime = Date.now() + (15 * 60 * 1000); // Token is valid for 15 minutes

    console.log('Authentication successful! Token received and stored in memory.');
    return apiToken;
  } catch (error) {
    console.error('Error authenticating:', error.response ? error.response.data : error.message);
    throw error;
  }
}

async function getToken() {
  // Check if the token is missing or expired
  if (!apiToken || Date.now() >= tokenExpiryTime) {
    console.log('Token expired or not found. Re-authenticating...');
    await authenticate(); // Re-authenticate and get a new token
  } else {
    console.log('Token is still valid.');
  }
  return apiToken;
}

module.exports = {
  authenticate,
  getToken
};
setInterval(async () => {
    try {
      console.log('Proactively refreshing token...');
      await authenticate(); // Refresh the token
    } catch (error) {
      console.error('Error refreshing token:', error.message);
    }
  }, 14 * 60 * 1000); // Refresh every 14 minutes
  