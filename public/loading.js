window.addEventListener('load', () => {
  const vaModal = document.getElementById('vaModal');

  // Show modal after 0.1s
  setTimeout(() => {
    vaModal.classList.add('show');
  }, 100);

  // Hide modal after 5s
  setTimeout(() => {
    vaModal.classList.remove('show');
  }, 5100); 
});


// Scroll Fade + Stagger Animation
const fadeSections = document.querySelectorAll(
  '.section, .hero-section, .secondary-sponsors-section, .entourage-section, .venue-section'
);

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target); // fade only once
    }
  });
}, { threshold: 0.2 });

fadeSections.forEach(section => fadeObserver.observe(section));
