# Project Setup Instructions

## Project Structure

Here's the relevant part of the project:

```
project-root/
│
├── js/
│   ├── access.js              ← Main logic
│   ├── firebase.js            ← Firebase logic (NOT committed)
│   ├── configuration.js       ← EmailJS keys (NOT committed)
│   ├── firebase.example.js    ← Sample config
│   └── configuration.example.js ← Sample config
│
├── access.html
├── .gitignore
└── README.md / SETUP.md
```

---

## Prerequisites

- A **Firebase project**
- A **Firebase Realtime Database** setup
- **Authentication → Anonymous Sign-in** enabled
- An **EmailJS account** with:

  - A **service**
  - A **template**
  - A **public key**

---

## Step-by-Step Setup

### 1. Prevent Secrets from Being Committed

Make sure `.gitignore` includes:

```bash
# Prevent secret keys from being committed
js/firebase.js
js/configuration.js
```

---

### 2. Clone and Copy Configuration Templates

Clone the repo and create your own config files from the templates:

```bash
git https://github.com/arnelimperial/access.git [project-name]
cd project-name

# Copy the config templates
cp js/firebase.example.js js/firebase.js
cp js/configuration.example.js js/configuration.js
```

---

### 3. Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project (or use an existing one)
3. Enable **Realtime Database**:

   - Set rules to:

     ```json
     {
       "rules": {
         ".read": "auth != null",
         ".write": "auth != null"
       }
     }
     ```

4. Go to **Authentication → Sign-in Method**

   - Enable **Anonymous** sign-in

5. Go to **Project Settings → General**

   - Scroll to **Your Apps → Web App**, click **\</>** to create one
   - Copy the config and paste it into `js/firebase.js`

Your config should look like this:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT.firebaseio.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
};
```

---

### 4. Set Up EmailJS

1. Go to [https://www.emailjs.com](https://www.emailjs.com)
2. Create a **free account**
3. Add a new **Email Service**
4. Create a new **Email Template**

   - Add placeholders like `{{title}}`, `{{firstName}}`, `{{lastName}}`, `{{email}}`, `{{message}}`

5. In your dashboard, get:

   - **Service ID**
   - **Template ID**
   - **Public Key**

6. Paste those into `js/configuration.js`:

```js
export const EMAILJS_SERVICE_ID = "your_service_id";
export const EMAILJS_TEMPLATE_ID = "your_template_id";
export const EMAILJS_PUBLIC_KEY = "your_public_key";
```

---

### 5. Run the App

Just open the HTML file in your browser:

```bash
# manual
open access.html

# better alternative: Use VS Code Live Server

```

---

## Testing

- ✅ Check Firebase Console → Realtime Database → `messages` node
- ✅ Check your email inbox or EmailJS dashboard for the received message

---

## 🔐 Important Notes

- Your **Firebase config** and **EmailJS public key** are _safe to expose_ in frontend apps

  - But do **NOT expose** private Firebase Admin SDK keys or secret EmailJS keys

- Keep your Firebase rules restrictive:

  ```json
  {
    "rules": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
  ```

  ***

## Sample Screenshots

### Contact Form Before Submission

![Contact Form: Before Submission](https://drive.google.com/uc?id=1JOjaGM4Ia7Y4ovZvmy2bAJBQue62OqXP)

---

### Contact Formon Successful Submission

![Contact Form: Successful Submission](https://drive.google.com/uc?id=1tF_NwyzODBW5zxAb0s0cen_cxy7kS3op)

---

### Contact Form: Recipient Received Submitter's Details

![Contact Form: Recipient Received Details](https://drive.google.com/uc?id=1uiymBZTNty7qwVoedujVEtUz2KgWh5-H)

---

### Contact Form: Submitter's Details Saved on DB

![Contact Form: Submitter's Details Saved on DB](https://drive.google.com/uc?id=1z_gWY-JOG6gChWH1e9G6bXUJyZmyjDao)

---

### Booking Form: Before Submission

![Booking Form: Before Submission](https://drive.google.com/uc?id=1r89ovDEs_P8QWK87kaXHPBk7H4IWBfw4)

---

### Booking Form: Successful Submission

![Booking Form: Successful Submission](https://drive.google.com/uc?id=1-Gm7u4a_uNDFmkrjOD66GbYmgVsplFy3)

---

### Booking Form: Sumitter's Details Saved on DB

![Booking Form: Submiter's Details Saved on DB](https://drive.google.com/uc?id=1XqUOMcNrbbV7rYbVCN-FfHQLMOS-ibKN)
