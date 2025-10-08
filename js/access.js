import { saveContactMessage, auth } from './firebase.js';
import { validateEmail } from './validators.js'; 
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from './configuration.js';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

(function() {
  let firebaseAuthReady = false;

  auth.onAuthStateChanged(user => {
    if (user) {
      firebaseAuthReady = true;
      console.log("Firebase anonymous auth ready with uid:", user.uid);
    } else {
      firebaseAuthReady = false;
      console.log("Firebase user not authenticated.");
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");

    if (!contactForm) {
      console.error("Contact form not found.");
      return;
    }

    function validateContactForm(form) {
      let isValid = true;
      form.querySelectorAll('.invalid-feedback').forEach(el => el.remove());
      form.querySelectorAll('.form-control').forEach(input => {
        input.classList.remove('is-invalid', 'is-valid');
      });

      let title = form.title.value.trim();
      if (!title) {
        showError(form.title, "Subject is required.");
        isValid = false;
      } else {
        showValid(form.title);
      }

      let firstName = form.firstName.value.trim();
      if (!firstName) {
        showError(form.firstName, "First name is required.");
        isValid = false;
      } else {
        showValid(form.firstName);
      }

      let lastName = form.lastName.value.trim();
      if (!lastName) {
        showError(form.lastName, "Last name is required.");
        isValid = false;
      } else {
        showValid(form.lastName);
      }

      let email = form.email.value.trim();
      let emailError = validateEmail(email);
      if (emailError) {
        showError(form.email, emailError);
        isValid = false;
      } else {
        showValid(form.email);
      }

      let message = form.message.value.trim();
      if (!message) {
        showError(form.message, "Message is required.");
        isValid = false;
      } else {
        showValid(form.message);
      }

      return isValid;
    }

    function showError(input, message) {
      const error = document.createElement('div');
      error.classList.add('invalid-feedback');
      error.textContent = message;
      input.classList.add('is-invalid');
      input.insertAdjacentElement('afterend', error);
    }

    function showValid(input) {
      input.classList.add('is-valid');
    }

    contactForm.addEventListener("submit", function(event) {
      event.preventDefault();

      if (!firebaseAuthReady) {
        alert("Initializing service, please wait a moment and try again.");
        return;
      }

      if (validateContactForm(this)) {
        const contactData = {
          title: this.title.value,
          firstName: this.firstName.value,
          lastName: this.lastName.value,
          email: this.email.value,
          message: this.message.value,
          submittedAt: new Date().toISOString(),
        };

        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
          .then(() => {
            console.log("Email sent");
            return saveContactMessage(contactData);
          })
          .then(() => {
            console.log("Data saved to Firebase");
            alert("Message sent and saved successfully!");
            this.reset();
            this.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("Something went wrong. Please try again.");
          });
      }
    });
  });
})();
