import { validateEmail } from "./validators.js";
import { showToast } from "./toastHelper.js";

(function () {
  // Constants for localStorage keys and timeouts
  const FOOTER_SUBSCRIBE_KEY = "newsletterSubscribed"; // Stored when user subscribed
  const DISMISS_PERMANENT_KEY = "newsletterDismissedPermanent"; // Set when "No Thanks" clicked
  const DISMISS_TEMP_KEY = "newsletterDismissedAt"; // Timestamp when modal dismissed (close, ESC, etc.)
  const DISMISS_TIMEOUT = 7 * 60 * 1000; // 7 minutes in milliseconds

  document.addEventListener("DOMContentLoaded", () => {
    // Get important DOM elements for forms, buttons, and modal
    const footerForm = document.getElementById("newsletter-form");
    const modalForm = document.getElementById("modal-newsletter-form");
    const footerSubscribeBtn = document.getElementById("footerSubscribeBtn");
    const modalNoThanksBtn = document.getElementById("modal-no-thanks-btn");
    const newsletterModalEl = document.getElementById("newsletterModal");
    const bsModal = new bootstrap.Modal(newsletterModalEl, { keyboard: true });

    // Function to determine if modal can show
    function canShowModal() {
      // If user already subscribed, disable footer button and never show modal
      if (localStorage.getItem(FOOTER_SUBSCRIBE_KEY)) {
        if (footerSubscribeBtn) footerSubscribeBtn.disabled = true;
        return false;
      }
      // If user clicked "No Thanks", modal permanently blocked, keep footer enabled
      if (localStorage.getItem(DISMISS_PERMANENT_KEY)) {
        if (footerSubscribeBtn) footerSubscribeBtn.disabled = false;
        return false;
      }
      // Check if modal was dismissed within last 7 minutes; if yes, block modal
      const dismissedAt = localStorage.getItem(DISMISS_TEMP_KEY);
      if (dismissedAt) {
        const elapsed = Date.now() - parseInt(dismissedAt, 10);
        if (elapsed < DISMISS_TIMEOUT) {
          if (footerSubscribeBtn) footerSubscribeBtn.disabled = false;
          return false;
        } else {
          // Timeout expired: remove temp dismissal data
          localStorage.removeItem(DISMISS_TEMP_KEY);
          if (footerSubscribeBtn) footerSubscribeBtn.disabled = false;
          return true;
        }
      }
      // No flags set: modal can show
      return true;
    }

    // Universal form submission handler for footer and modal forms
    function handleSubmit(event, form, emailInputName) {
      event.preventDefault();
      const emailInput = form.querySelector(`input[name="${emailInputName}"]`);
      const email = emailInput.value.trim();
      const emailError = validateEmail(email);
      const feedback =
        emailInput.parentElement.querySelector(".invalid-feedback");

      // Reset validation styles
      emailInput.classList.remove("is-invalid", "is-valid");
      if (feedback) feedback.style.display = "none";

      // Validate email required
      if (!email) {
        emailInput.classList.add("is-invalid");
        if (feedback) {
          feedback.textContent = "Email is required.";
          feedback.style.display = "block";
        }
        return;
      }

      // Validate email format
      if (emailError) {
        emailInput.classList.add("is-invalid");
        if (feedback) {
          feedback.textContent = emailError;
          feedback.style.display = "block";
        }
        return;
      }

      // Validation succeeded
      emailInput.classList.add("is-valid");
      showToast("Subscribed successfully!");
      form.reset();

      // Save subscription state and disable footer subscribe button
      localStorage.setItem(FOOTER_SUBSCRIBE_KEY, "true");
      if (footerSubscribeBtn) footerSubscribeBtn.disabled = true;

      // Hide the modal if open
      bsModal.hide();
    }

    // Handle "No Thanks" click: permanently disable modal but enable footer subscription button
    if (modalNoThanksBtn) {
      modalNoThanksBtn.addEventListener("click", () => {
        localStorage.setItem(DISMISS_PERMANENT_KEY, "true");
        localStorage.removeItem(DISMISS_TEMP_KEY); // Clear temp dismissal time if present
        bsModal.hide();
        if (footerSubscribeBtn) footerSubscribeBtn.disabled = false;
      });
    }

    // When modal is hidden (not via "No Thanks"), set temp dismissal time for 7-minute delay before next popup
    newsletterModalEl.addEventListener("hide.bs.modal", (event) => {
      // If user did NOT permanently dismiss modal ("No Thanks")
      if (!localStorage.getItem(DISMISS_PERMANENT_KEY)) {
        localStorage.setItem(DISMISS_TEMP_KEY, Date.now().toString());
      }
    });

    // Show modal after 1 minute or on scroll beyond 50% of page height, respecting dismissal/subscription logic
    if (canShowModal()) {
      let modalShown = false;

      function showModal() {
        if (!modalShown && canShowModal()) {
          bsModal.show();
          modalShown = true;
        }
      }

      // Timer for 1 minute delay before showing modal
      setTimeout(showModal, 60000);

      // Scroll listener to show modal if user scrolls past half the page height
      window.addEventListener(
        "scroll",
        () => {
          if (!modalShown && window.scrollY > document.body.scrollHeight / 2) {
            showModal();
          }
        },
        { passive: true }
      );
    }

    // Add event listeners and reset logic for footer subscription form
    if (footerForm) {
      footerForm.addEventListener("submit", (e) =>
        handleSubmit(e, footerForm, "newsletterEmail")
      );
      footerForm.addEventListener("reset", () => {
        const emailInput = footerForm.querySelector(
          'input[name="newsletterEmail"]'
        );
        const feedback =
          emailInput.parentElement.querySelector(".invalid-feedback");
        emailInput.classList.remove("is-invalid", "is-valid");
        if (feedback) feedback.style.display = "none";
      });
    }

    // Add event listeners and reset logic for modal subscription form
    if (modalForm) {
      modalForm.addEventListener("submit", (e) =>
        handleSubmit(e, modalForm, "newsletterEmail")
      );
      modalForm.addEventListener("reset", () => {
        const emailInput = modalForm.querySelector(
          'input[name="newsletterEmail"]'
        );
        const feedback =
          emailInput.parentElement.querySelector(".invalid-feedback");
        emailInput.classList.remove("is-invalid", "is-valid");
        if (feedback) feedback.style.display = "none";
      });
    }

    // Initialize footer subscription button disabled state on page load if subscribed
    if (localStorage.getItem(FOOTER_SUBSCRIBE_KEY)) {
      if (footerSubscribeBtn) footerSubscribeBtn.disabled = true;
    }
  });
})();
