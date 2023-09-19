const twilio = require('twilio');
const config = require('../config');

const twilioClient = twilio(config.twilioAccountSid, config.twilioAuthToken);

async function sendOTP(phoneNumber, otp) {
  try {
    await twilioClient.messages.create({
      to: phoneNumber,
      from: config.twilioPhoneNumber,
      body: `Your OTP is: ${otp}`,
    });
    console.log('OTP sent successfully');
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
}

module.exports = {
  sendOTP,
};
