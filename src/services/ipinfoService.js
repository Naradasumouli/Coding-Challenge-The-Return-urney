const axios = require('axios');
const config = require('../config');

async function validateIP(ip) {
  try {
    const response = await axios.get(`https://ipinfo.io/${ip}/json?token=${config.ipinfoAPIKey}`);
    const data = response.data;
    // Implement IP validation logic here based on the data
    return data;
  } catch (error) {
    console.error('Error validating IP address:', error);
    throw error;
  }
}

module.exports = {
  validateIP,
};
