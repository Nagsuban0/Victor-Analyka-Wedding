document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const leftLinks = document.querySelector(".nav-links.left-links");
  const rightLinks = document.querySelector(".nav-links.right-links");
  const darkModeToggle = document.getElementById("darkModeToggle");

  // Hamburger menu toggle
  hamburger.addEventListener("click", () => {
    leftLinks.classList.toggle("show");
    rightLinks.classList.toggle("show");
    hamburger.classList.toggle("active");
  });

  // Close menu when clicking on a link (mobile)
  document.querySelectorAll(".nav-links li a").forEach(link => {
    link.addEventListener("click", () => {
      if(leftLinks.classList.contains("show") || rightLinks.classList.contains("show")) {
        leftLinks.classList.remove("show");
        rightLinks.classList.remove("show");
        hamburger.classList.remove("active");
      }
    });
  });

  // Dark Mode toggle
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if(document.body.classList.contains("dark-mode")){
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });

  // Preserve dark mode on reload
  if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark-mode");
  }
});
