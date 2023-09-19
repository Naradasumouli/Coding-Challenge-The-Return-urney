const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ipinfoService = require('../services/ipinfoService');
const twilioService = require('../services/twilioService');
const bcrypt = require('bcrypt');
const config = require('../config');

// User registration route
router.post('/register', async (req, res) => {
  try {
    // Validate user's IP address
    const ipData = await ipinfoService.validateIP(req.ip);
    // Implement IP validation logic here (e.g., allow registration based on country code)

    // Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000); // You can implement a more secure OTP generation

    // Send OTP to the user's phone number
    await twilioService.sendOTP(req.body.phoneNumber, otp);

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(req.body.password, config.saltRounds);

    // Create a new user
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
      // Add other user data here
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

module.exports = router;
