// src/utils/notifications.js
// eslint-disable-next-line no-unused-vars
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { messaging } from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import toast from "react-hot-toast";

const vapidKey =
  "BE0FaE_fuT0dhskDEXpssaIrbZboW6UshDHrojaGAdwQsh7djVHJfwVeK65_Ob01-orQwtckgLG7g0c_c3SE2F0";

export function listenToMessages() {
  onMessage(messaging, (payload) => {
    console.log("🔔 Message received in-app:", payload);
    const { title, body } = payload.notification;

    // Display it in your app
    toast.success(`${title}: ${body}`, {
      duration: 6000,
    });
  });
}

export const requestPermissionAndSaveToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("Notification permission denied.");
      return;
    }

    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const token = await getToken(messaging, { vapidKey });
    if (token) {
      await setDoc(doc(db, "fcmTokens", auth.currentUser.uid), {
        token,
        createdAt: serverTimestamp(),
      });
      console.log("FCM Token saved:", token);
    }
  } catch (err) {
    console.error("Error getting permission or saving token:", err);
  }
};

export const listenForForegroundMessages = () => {
  onMessage(messaging, (payload) => {
    console.log("Foreground push received:", payload);
    alert(payload.notification?.title + ": " + payload.notification?.body);
  });
};
