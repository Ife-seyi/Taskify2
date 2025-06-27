// /api/sendNotification.js

import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';

const serviceAccount = {
  project_id: process.env.FIREBASE_PROJECT_ID,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
};

// ✅ Initialize Firebase Admin
const app = !getApps().length
  ? initializeApp({
      credential: cert(serviceAccount),
    })
  : getApp();

// ✅ API Handler
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method not allowed
  }

  const { title, body, token } = req.body;

  if (!token || !title || !body) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  try {
    await getMessaging().send({
      token,
      notification: {
        title,
        body,
      },
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('❌ Error sending FCM notification:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
