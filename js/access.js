import { saveMessage } from './firebase.js';
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from './configuration.js';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  if (!form) {
    console.error("Contact form not found.");
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = {
      title: this.title.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      message: this.message.value,
      submittedAt: new Date().toISOString(),
    };

    // Send via EmailJS
    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
      .then(() => {
        console.log("✅ Email sent");

        // Save to Firebase after email success
        return saveMessage(formData);
      })
      .then(() => {
        console.log("✅ Data saved to Firebase");
        alert("Message sent and saved successfully!");
        this.reset();
      })
      .catch((error) => {
        console.error("❌ Error:", error);
        alert("Something went wrong. Please try again.");
      });
  });
});
