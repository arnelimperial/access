import { saveBookingRequest } from "./firebase.js";
import { validateEmail, validatePhoneNumber } from "./validators.js"; 

(function () {
  // DOM Ready
  document.addEventListener("DOMContentLoaded", () => {
    const bookingForm = document.getElementById("booking-form");
    const bookingModal = new bootstrap.Modal(document.getElementById('booknow'));
    const successMessage = document.createElement('div'); 

    if (!bookingForm) {
      console.error("Booking form not found.");
      return;
    }

    // Validation function for Booking Form
    function validateBookingForm(form) {
      let isValid = true;

      // Clear previous error messages
      const errorMessages = form.querySelectorAll(".invalid-feedback");
      errorMessages.forEach((error) => error.remove());
      const inputs = form.querySelectorAll(".form-control");
      inputs.forEach((input) =>
        input.classList.remove("is-invalid", "is-valid")
      );

      // Validate First Name
      const firstName = form.first_name.value.trim();
      if (!firstName) {
        showError(form.first_name, "First name is required.");
        isValid = false;
      } else {
        showValid(form.first_name);
      }

      // Validate Last Name
      const lastName = form.last_name.value.trim();
      if (!lastName) {
        showError(form.last_name, "Last name is required.");
        isValid = false;
      } else {
        showValid(form.last_name);
      }

      // Validate Phone Number
      const phone = form.phone.value.trim();
      if (!phone || !validatePhoneNumber(phone)) {
        showError(form.phone, "Please enter a valid Philippine phone number.");
        isValid = false;
      } else {
        showValid(form.phone);
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

      // Validate Check-in Date
      const checkin = form.checkin.value.trim();
      if (!checkin) {
        showError(form.checkin, "Check-in date is required.");
        isValid = false;
      } else {
        showValid(form.checkin);
      }

      // Validate Check-out Date
      const checkout = form.checkout.value.trim();
      if (!checkout) {
        showError(form.checkout, "Check-out date is required.");
        isValid = false;
      } else {
        showValid(form.checkout);
      }

      // Validate Suite
      const suite = form.suite.value.trim();
      if (!suite) {
        showError(form.suite, "Suite selection is required.");
        isValid = false;
      } else {
        showValid(form.suite);
      }

      return isValid;
    }

    // Show error messages and apply invalid styles
    function showError(input, message) {
      const error = document.createElement("div");
      error.classList.add("invalid-feedback");
      error.textContent = message;
      input.classList.add("is-invalid");
      input.insertAdjacentElement("afterend", error);
    }

    // Apply valid styles
    function showValid(input) {
      input.classList.add("is-valid");
    }

    // Booking Form submit handler
    bookingForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form submission

      if (validateBookingForm(this)) {
        const bookingData = {
          firstName: this.first_name.value,
          lastName: this.last_name.value,
          phone: this.phone.value,
          email: this.email.value,
          checkin: this.checkin.value,
          checkout: this.checkout.value,
          adults: this.adults.value,
          children: this.children.value,
          suite: this.suite.value,
          board: this.board.value,
          submittedAt: new Date().toISOString(),
        };

        // Save booking request to Firebase
        saveBookingRequest(bookingData)
          .then(() => {
            console.log("Booking saved successfully");

            // Show success message inside the modal
            successMessage.textContent = 'Booking saved successfully!';
            successMessage.classList.add('text-center', 'text-success', 'mt-3');
            document.querySelector('.modal-body').appendChild(successMessage);

            // Close the modal after 6 seconds
            setTimeout(() => {
              bookingModal.hide(); // Close modal
            }, 6000);

            // Reset the form
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
