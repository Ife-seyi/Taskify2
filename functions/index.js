/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// eslint-disable-next-line no-undef
const {onRequest} = require("firebase-functions/v2/https");
// eslint-disable-next-line no-undef
const logger = require("firebase-functions/logger");

// eslint-disable-next-line no-undef
const functions = require("firebase-functions");
// eslint-disable-next-line no-undef
const admin = require("firebase-admin");
// eslint-disable-next-line no-undef
const sgMail = require("@sendgrid/mail");

// Replace with your real SendGrid API Key
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(SENDGRID_API_KEY);

admin.initializeApp();

// eslint-disable-next-line no-undef
exports.sendCode = functions.https.onRequest(async (req, res) => {
  // Set CORS headers for preflight requests
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(204).send("");
  }

  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).send("Missing email or code.");
  }

  const msg = {
    to: email,
    from: "archibongvictoria44@gmail.com", // 👈 must be a verified sender on SendGrid
    subject: "Your Taskify Verification Code",
    text: `Your verification code is ${code}`,
    html: `<strong>Your verification code is <span style="font-size: 20px;">${code}</span></strong>`,
  };

  try {
    await sgMail.send(msg);
    return res.status(200).send("Verification email sent");
  } catch (error) {
    console.error("SendGrid error:", error);
    return res.status(500).send("Error sending email");
  }
});


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
