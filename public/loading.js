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
const faders = document.querySelectorAll('.section, .hero-section, .secondary-sponsors-section, .entourage-section, .footer');

const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px" // trigger a bit before fully in view
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('fade-in');
    observer.unobserve(entry.target); // fade once
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
