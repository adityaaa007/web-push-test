import React, { useEffect, useState } from "react";
import { requestForToken } from "./config/firebase";

function App() {
  const [token, setToken] = useState("");

  const subscribeToTopic = async (token, topic) => {
    try {
      const response = await fetch(
        "https://api.ouranosrobotics.com/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, topic }),
        }
      );
      const data = await response.json();
      console.log("data: ", data);
    } catch (error) {
      console.error("Error subscribing to topic:", error);
    }
  };

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then(function (registration) {
          console.log(
            "Service Worker registration successful with scope: ",
            registration.scope
          );
        })
        .catch(function (err) {
          console.error("Service Worker registration failed:", err);
        });
    }

    const getToken = async () => {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await requestForToken();
        if (token) {
          setToken(token);

          await subscribeToTopic(token, "test");
        }
      }
    };

    getToken();
  }, []);

  return (
    <div className="App">
      <h1>Push Notification with React & FCM</h1>
      <p>
        Device Token 👉 <span style={{ fontSize: "11px" }}> {token} </span>
      </p>
      {token && <h2>Notification permission enabled 👍🏻</h2>}
      {!token && <h2>Need notification permission ❗️ </h2>}
    </div>
  );
}

export default App;
