// cake.js - small helpers for landing page
// highlight active nav link
document.addEventListener("DOMContentLoaded", function() {
  const links = document.querySelectorAll(".nav-links a");
  links.forEach(a => {
    if (a.getAttribute("href") === "cake.html") {
      a.classList.add("cake-dates");
    }
  });

  // optional: clicking hero images opens the options
  const heroImgs = document.querySelectorAll(".hero-images img");
  heroImgs.forEach(img => {
    img.addEventListener("click", () => {
      window.scrollTo({ top: document.querySelector(".products").offsetTop - 80, behavior: "smooth" });
    });
  });
});
