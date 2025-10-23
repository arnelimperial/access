import { validateEmail, validatePhoneNumber } from "./validators.js";
import { showToast } from "./toastHelper.js";

(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("bookingForm");
    const modalElement = document.getElementById("bookNowModal");
    const bootstrapModal = new bootstrap.Modal(modalElement);

    const suiteSelect = document.getElementById("suite");
    const bookButtons = document.querySelectorAll(".suites-book-btn");
    let lastClickedSuiteValue = null;

    // Update lastClickedSuiteValue when a BOOK NOW button is clicked
    bookButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const suiteValue = button.getAttribute("data-suite");
        if (suiteSelect && suiteValue) {
          lastClickedSuiteValue = suiteValue;
        }
      });
    });

    // When modal shows, set the suite select's value to last clicked suite
    modalElement.addEventListener("shown.bs.modal", () => {
      form.classList.remove("was-validated");
      if (lastClickedSuiteValue) {
        suiteSelect.value = lastClickedSuiteValue;
        suiteSelect.dispatchEvent(new Event("change"));
      }
    });

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
        showToast("Booking submitted successfully!");
        bootstrapModal.hide();
        form.reset();
        form.classList.remove("was-validated");
        lastClickedSuiteValue = null; // Reset after successful submission
      }
    });

    form.addEventListener("reset", () => {
      form.classList.remove("was-validated");
    });

    // Reset form when modal hides and clear stored suite value
    modalElement.addEventListener("hidden.bs.modal", () => {
      form.reset();
      form.classList.remove("was-validated");
      lastClickedSuiteValue = null;
    });
  });
})();
