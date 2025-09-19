import { saveContactMessage } from './firebase.js';
import { validateEmail } from './validators.js'; 
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from './configuration.js';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

(function() {
  // DOM Ready
  document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");

    if (!contactForm) {
      console.error("Contact form not found.");
      return;
    }

    // Validation function for Contact Form
    function validateContactForm(form) {
      let isValid = true;

      // Clear previous error messages
      const errorMessages = form.querySelectorAll('.invalid-feedback');
      errorMessages.forEach(error => error.remove());
      const inputs = form.querySelectorAll('.form-control');
      inputs.forEach(input => input.classList.remove('is-invalid', 'is-valid'));

      // Validate Subject
      const title = form.title.value.trim();
      if (!title) {
        showError(form.title, "Subject is required.");
        isValid = false;
      } else {
        showValid(form.title);
      }

      // Validate First Name
      const firstName = form.firstName.value.trim();
      if (!firstName) {
        showError(form.firstName, "First name is required.");
        isValid = false;
      } else {
        showValid(form.firstName);
      }

      // Validate Last Name
      const lastName = form.lastName.value.trim();
      if (!lastName) {
        showError(form.lastName, "Last name is required.");
        isValid = false;
      } else {
        showValid(form.lastName);
      }

      // Validate Email
      const email = form.email.value.trim();
      const emailError = validateEmail(email);
      if (emailError) {
        showError(form.email, emailError);
        isValid = false;
      } else {
        showValid(form.email);
      }

      // Validate Message
      const message = form.message.value.trim();
      if (!message) {
        showError(form.message, "Message is required.");
        isValid = false;
      } else {
        showValid(form.message);
      }

      return isValid;
    }

    // Show error messages and apply invalid styles
    function showError(input, message) {
      const error = document.createElement('div');
      error.classList.add('invalid-feedback');
      error.textContent = message;
      input.classList.add('is-invalid');
      input.insertAdjacentElement('afterend', error);
    }

    // Apply valid styles
    function showValid(input) {
      input.classList.add('is-valid');
    }

    // Contact Form submit handler
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form submission

      if (validateContactForm(this)) {
        const contactData = {
          title: this.title.value,
          firstName: this.firstName.value,
          lastName: this.lastName.value,
          email: this.email.value,
          message: this.message.value,
          submittedAt: new Date().toISOString(),
        };

        // First, send the email using EmailJS
        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
          .then(() => {
            console.log("Email sent");

            // Then save the contact message to Firebase
            return saveContactMessage(contactData);
          })
          .then(() => {
            console.log("Data saved to Firebase");

            alert("Message sent and saved successfully!");

            // Reset form fields
            this.reset();
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("Something went wrong. Please try again.");
          });
      }
    });
  });
})();
