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


// Scroll Fade Animation
const sections = document.querySelectorAll('section, .hero-section, .secondary-sponsors-section, .entourage-section, .venue-section, .footer');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => observer.observe(section));

