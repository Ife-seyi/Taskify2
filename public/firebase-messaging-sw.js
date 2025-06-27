/* eslint-disable no-undef */
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyD82mTJrKgElqkg0fWtU6e9THzNRNLwPGQ",
  projectId: "taskify-b30cc",
  messagingSenderId: "733059865065",
  appId: "1:733059865065:web:c1a771cd759b07b8e45378",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Background message received: ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/icons/Taskify-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
