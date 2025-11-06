const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelectorAll('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.forEach(nav => nav.classList.toggle('show'));
  hamburger.classList.toggle('active'); // optional for animation
});
