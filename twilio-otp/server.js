// const express = require('express');


const express = require("express");
const app = express();
app.use( require("express").json() ); // <== Make sure we can handle JSON data from the client

//


const bodyParser = require('body-parser');
const twilio = require('twilio');

// const app = express();
const port = process.env.PORT || 3000;

// Twilio configuration
const accountSid = 'AC0e5eb6a95a324ff03b9c4dc38fb310db';
const authToken = '28d5af9c58cf534c4617fc203a0448e5';
const client = new twilio(accountSid, authToken);
const twilioPhoneNumber = '+12294145361';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve the HTML file
app.use(express.static('public'));

// Handle phone number submission and send OTP
app.post('/send-otp', async (req, res) => {
    const phoneNumber = req.body.phoneNumber;

    try {
        // Generate a random OTP (you can implement your own logic)
        const otp = Math.floor(1000 + Math.random() * 9000);

        // Send OTP via Twilio
        const message = await client.messages.create({
            body: `Your OTP is ${otp}`,
            from: twilioPhoneNumber,
            to: phoneNumber,
        });

        console.log(`OTP sent to ${phoneNumber}: ${otp}`);

        res.status(200).send({ success: true, message: 'OTP sent successfully' });
    } catch (error) {
        console.error(`Error sending OTP: ${error.message}`);
        res.status(500).send({ success: false, message: 'Error sending OTP' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
