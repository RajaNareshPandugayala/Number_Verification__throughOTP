// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.sendSMS = functions.https.onCall((data, context) => {
    const phoneNumber = data.phoneNumber;
    const message = data.message;

    return admin.messaging().send({
        data: {
            phoneNumber: phoneNumber,
            message: message,
        },
        // Set the recipient phone number
        token: phoneNumber,
    })
    .then(() => {
        return { success: true };
    })
    .catch((error) => {
        return { error: error.message };
    });
});


function phoneAuth() {
    const phoneNumber = document.getElementById('number').value;
    const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

    auth.signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            document.getElementById('sender').style.display = 'none';
            document.getElementById('verifier').style.display = 'block';

            // Call the Cloud Function to send SMS
            const sendSMS = firebase.functions().httpsCallable('sendSMS');
            sendSMS({ phoneNumber: phoneNumber, message: 'Your verification code is: 123456' })
                .then((result) => {
                    console.log(result.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        })
        .catch((error) => {
            console.error(error);
        });
}
