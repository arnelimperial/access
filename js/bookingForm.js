import { validateEmail, validatePhoneNumber } from "./validators.js";

(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("bookingForm");
    const modalElement = document.getElementById("bookNowModal");
    const bootstrapModal = new bootstrap.Modal(modalElement);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      e.stopPropagation();

      let valid = true;

      if (!form.checkValidity()) {
        valid = false;
      }

      const emailInput = form.email;
      const phoneInput = form.phone;

      const emailError = validateEmail(emailInput.value);
      if (emailError) {
        emailInput.setCustomValidity(emailError);
        valid = false;
      } else {
        emailInput.setCustomValidity("");
      }

      if (!validatePhoneNumber(phoneInput.value)) {
        phoneInput.setCustomValidity(
          "Please enter a valid Philippine phone number."
        );
        valid = false;
      } else {
        phoneInput.setCustomValidity("");
      }

      form.classList.add("was-validated");

      if (valid) {
        alert("Booking submitted successfully!");
        bootstrapModal.hide();
        form.reset();
        form.classList.remove("was-validated");
      }
    });

    // Reset validation state when clicking reset button
    form.addEventListener("reset", () => {
      form.classList.remove("was-validated");
    });

    // Optional: reset form and validation when modal is hidden for a clean state
    modalElement.addEventListener("hidden.bs.modal", () => {
      form.reset();
      form.classList.remove("was-validated");
    });

    // Optional: reset form and validation when modal is shown
    modalElement.addEventListener("shown.bs.modal", () => {
      form.reset();
      form.classList.remove("was-validated");
    });
  });
})();
