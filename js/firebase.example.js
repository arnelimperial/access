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


// Replace these with your Firebase project config
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

// Expose functions for Contact Form and Booking Form

// Save contact message data to Firebase under "contactMessages"
export function saveContactMessage(data) {
  const contactMessageRef = push(ref(database, "contactMessages"));
  return set(contactMessageRef, data);
}

// Save booking data to Firebase under "bookingRequests"
export function saveBookingRequest(data) {
  const bookingRequestRef = push(ref(database, "bookingRequests"));
  return set(bookingRequestRef, data);
}

export { auth, database };

