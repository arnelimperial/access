# access

## 1. General Framework Replacement

* **Original:** Used [MaterializeCSS 1.0.0](https://materializecss.com/).
* **Replica:** Migrated fully to [Bootstrap 5](https://getbootstrap.com/).
* **Reason:** Bootstrap is more widely adopted, has better long-term support, and doesn’t require jQuery for components.

---

## 2. Header & Navbar

### Original

* Materialize **transparent navbar** with `dropdown-trigger` for menu and `modal-trigger` for booking.
* Positioned using inline `padding-top: 50px;`.
* Sticky behavior handled by `navbar-fixed`.

### Replica

* Bootstrap **`navbar navbar-dark bg-black sticky-top`** with `dropdown` for menu and `modal` for booking.
* Removed inline padding hack → replaced with `py-5` to push navbar slightly lower.
* **Buttons:**

  * MENU → Bootstrap dropdown button (`btn btn-light rounded-pill dropdown-toggle`).
  * BOOK NOW → Bootstrap modal trigger (`btn btn-danger rounded-pill`).
* **Tweaks:**

  * Buttons initially made **too large** → adjusted down (`px-4 py-2 fs-6`).
  * MENU dropdown text originally too big → reduced to `.fs-6`.

**Result:** Navbar is sticky, buttons are balanced in size, dropdown list text smaller (closer to Materialize look).

---

## 3. Showcase (Hero Section)

### Original

* Centered `<h1>` with Materialize grid.
* Used inline styling for font, shadow, and spacing.

### Replica

* Bootstrap **container showcase text-center py-5**.
* Preserved font styling + `text-shadow`.
* No functional changes, only cleaner Bootstrap markup.

---

## 4. Access Section (Map + Contact Form)

### Original

* Materialize grid system (`col s12 m6`).
* Form fields styled with `input-field`, `validate`, and floating labels.
* Dropdowns required `formSelect()` initialization.

### Replica

* Bootstrap grid (`col-md-6`).
* Form fields converted to **Bootstrap floating labels** where appropriate.
* Dropdowns replaced with `<select class="form-select">` (no JS needed).
* Materialize’s textarea (`materialize-textarea`) replaced with `<textarea class="form-control">`.

**Result:** Functionality identical, cleaner and simpler with Bootstrap.

---

## 5. Book Now Modal

### Original

* Materialize modal (`.modal` + `.modal-trigger`).
* Used Materialize select fields and datetime pickers.
* Required initialization via `$('.modal').modal(); $('select').formSelect();`.

### Replica

* Bootstrap modal (`.modal fade` + `data-bs-toggle="modal"`).
* Selects → `<select class="form-select">`.
* Date/time inputs → native `<input type="datetime-local">`.
* Footer button replaced with Bootstrap-styled **modal-close** equivalent.

**Result:** Same layout, works natively without extra JavaScript.

---

## 6. Footer

### Original

* Materialize footer (`.page-footer`).
* Social icons using FontAwesome v4.7.
* Newsletter form with Materialize `input-field`.

### Replica

* Bootstrap grid (`col-md-4`).
* FontAwesome upgraded to v6 (via Kit).
* Newsletter input → `<input class="form-control">` with button styled as `btn btn-dark`.

**Result:** Visual style close to original, fully Bootstrap-aligned.

---

## 7. JavaScript

### Original

```javascript
$(document).ready(function(){
  $('.dropdown-trigger').dropdown();
  $('.modal').modal();
  $('select').formSelect();
});
```

### Replica

* Removed jQuery and Materialize JS initialization.
* Bootstrap handles **dropdowns, modals, and selects natively** using `data-bs-*` attributes.
* Only Bootstrap 5 JS bundle is required.

**Result:** Simpler, leaner, no jQuery dependency.

---

## 8. Summary of Visual Adjustments

* **Buttons:**

  * Too large initially → reduced padding + font size.
  * Made lower from top with `py-5` navbar padding.
* **Menu Dropdown Text:**

  * Reduced to `.fs-6` for a closer match to Materialize list size.
* **Sticky Navbar:**

  * Ensures MENU + BOOK NOW follow on scroll (similar to `navbar-fixed`).
* **Forms:**

  * Floated labels replaced with Bootstrap floating labels.
  * Textareas and inputs updated to `form-control`.
* **Footer:**

  * Preserved layout but modernized with Bootstrap and FontAwesome v6.

---

