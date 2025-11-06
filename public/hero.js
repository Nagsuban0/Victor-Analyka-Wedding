document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".hero-section .slide");
  const dots = document.querySelectorAll(".hero-section .dot");
  let currentIndex = 0;
  const slideInterval = 5000; // 5 seconds per slide

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
      dots[i].classList.toggle("active", i === index);
    });
    currentIndex = index;
  }

  // Dot click navigation
  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.getAttribute("data-slide"));
      showSlide(index);
      resetTimer();
    });
  });

  // Auto slide
  let timer = setInterval(() => {
    let nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
  }, slideInterval);

  // Reset timer when user clicks a dot
  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
      let nextIndex = (currentIndex + 1) % slides.length;
      showSlide(nextIndex);
    }, slideInterval);
  }

  // Initialize first slide
  showSlide(0);
});
