const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { getToken } = require('./authenticate');

const app = express();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// Define the route to get employees in General training
app.get('/api/employees-in-training', async (req, res) => {
  try {
    const token = await getToken(); // Get a valid token

    const url = 'https://lcs-cx.api.rentmanager.com/Tenants?embeds=UserDefinedValues&filters=UserDefinedValues.Value,in,(General)&fields=Name';

    // Send a request to the Rent Manager API
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Send the data back to the frontend
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching employees in training:', error.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Start the server on port 5000 or the specified port in environment variables
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
