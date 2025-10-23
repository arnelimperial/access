(function () {
  document.addEventListener("DOMContentLoaded", function () {
    // Get only the filename from the current URL path
    var currentPage = window.location.pathname.split("/").pop();

    // Select all nav links in the navbar
    var navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    navLinks.forEach(function (link) {
      var linkHref = link.getAttribute("href");
      if (linkHref === currentPage) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
      }
    });
  });
})();
