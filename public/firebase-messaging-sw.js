// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyCdPvRZG3c9NJnc4mgyxHcPG3k8K-0RTX8",
  authDomain: "neer-testing.firebaseapp.com",
  databaseURL: "https://neer-testing-default-rtdb.firebaseio.com",
  projectId: "neer-testing",
  storageBucket: "neer-testing.appspot.com",
  messagingSenderId: "893462417821",
  appId: "1:893462417821:web:ac548a9b5a0b5dd2521f74",
  measurementId: "G-LP7CNSTWVV",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(({ notification }) => {
  new Notification(notification.title, {
    body: "foreground " + notification.body,
    // icon: notification.icon,
  });

  console.log("Background Notification: ", JSON.stringify(notification));
});
