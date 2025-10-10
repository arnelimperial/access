import { validateEmail } from "./validators.js";

(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const newsletterForm = document.getElementById("newsletter-form");
    if (!newsletterForm) return;

    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector(
        'input[name="newsletterEmail"]'
      );
      const email = emailInput.value.trim();
      const emailError = validateEmail(email);

      emailInput.classList.remove("is-invalid", "is-valid");
      const feedback =
        emailInput.parentElement.querySelector(".invalid-feedback");
      if (feedback) feedback.style.display = "none";

      if (!email) {
        emailInput.classList.add("is-invalid");
        if (feedback) {
          feedback.textContent = "Email is required.";
          feedback.style.display = "block";
        }
      } else if (emailError) {
        emailInput.classList.add("is-invalid");
        if (feedback) {
          feedback.textContent = emailError;
          feedback.style.display = "block";
        }
      } else {
        emailInput.classList.add("is-valid");
        alert("Subscribed successfully!");
        newsletterForm.reset();
        emailInput.classList.remove("is-valid");
      }
    });

    newsletterForm.addEventListener("reset", () => {
      const emailInput = newsletterForm.querySelector(
        'input[name="newsletterEmail"]'
      );
      emailInput.classList.remove("is-invalid", "is-valid");
      const feedback =
        emailInput.parentElement.querySelector(".invalid-feedback");
      if (feedback) feedback.style.display = "none";
    });
  });
})();
