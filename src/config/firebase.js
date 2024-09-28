// src/config/firebase.js

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

export const firebaseConfig = {
  apiKey: "AIzaSyCdPvRZG3c9NJnc4mgyxHcPG3k8K-0RTX8",
  authDomain: "neer-testing.firebaseapp.com",
  databaseURL: "https://neer-testing-default-rtdb.firebaseio.com",
  projectId: "neer-testing",
  storageBucket: "neer-testing.appspot.com",
  messagingSenderId: "893462417821",
  appId: "1:893462417821:web:ac548a9b5a0b5dd2521f74",
  measurementId: "G-LP7CNSTWVV",
};

export const FIREBASE_VAPID_KEY =
  "BKAKr9LCEoPhLlBW1ud7tGc1sU77cGFEeV-6D8C-McSqk9jgg6QsNlXN2xtQISm_ZjMV84WskVSsPBlOhRJBH2I";

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestForToken = () => {
  return getToken(messaging, { vapidKey: FIREBASE_VAPID_KEY })
    .then((currentToken) => {
      if (currentToken) {
        return currentToken;
      } else {
        alert(
          "No registration token available. Request permission to generate one."
        );
        return null;
      }
    })
    .catch((err) => {
      alert("An error occurred while retrieving token - " + err);
      console.error("An error occurred while retrieving token - " + err);
      return null;
    });
};

export const onMessageHandler = onMessage(messaging, ({ notification }) => {
  new Notification(notification.title, {
    body: "foreground " + notification.body,
    // icon: notification.icon,
  });

  console.log("Foreground Notification: ", JSON.stringify(notification));
});
