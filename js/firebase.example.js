// ➤ Rename to firebase.js and add your Firebase config

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";

import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

// 🔐 Replace these with your Firebase project config
const firebaseConfig = {
  apiKey: "your_api_key",
  authDomain: "your_project_id.firebaseapp.com",
  databaseURL: "https://your_project_id.firebaseio.com",
  projectId: "your_project_id",
  storageBucket: "your_project_id.appspot.com",
  messagingSenderId: "your_sender_id",
  appId: "your_app_id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

// Authenticate anonymously
signInAnonymously(auth)
  .then(() => {
    console.log("Signed in anonymously");
  })
  .catch((error) => {
    console.error("Auth error:", error);
  });

// Expose functions (optional)
export function saveMessage(data) {
  const newRef = push(ref(database, "messages"));
  return set(newRef, data);
}

export { auth, database };
