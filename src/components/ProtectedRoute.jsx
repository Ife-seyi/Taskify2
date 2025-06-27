import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";
import { messaging } from "../firebase";
import { getToken, onMessage } from "firebase/messaging";





const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);


  useEffect(() => {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      }).then((token) => {
        console.log("FCM Token:", token);
        // Optionally save this token in Firestore under user's profile
      });
    }
  });

  onMessage(messaging, (payload) => {
    console.log("Message received: ", payload);
    // You can show a toast or custom notification here
  });
}, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setChecking(false);
    });

    return () => unsubscribe();
  }, []);

  if (checking)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E6F7F6]">
        <div className="relative w-16 h-16">
          {/* Spinner circle */}
          <div className="absolute inset-0 w-full h-full border-4 border-[#4FBDBA] border-t-transparent rounded-full animate-slow-spin"></div>


          {/* Center logo inside */}
          <img
            src="./Taskify-logo.png" // ✅ Update this to match your actual path
            alt="Taskify logo"
            className="absolute top-1/2 left-1/2 w-8 h-8 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
    );

  if (!user) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
