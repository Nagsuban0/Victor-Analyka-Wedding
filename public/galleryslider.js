document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".gallery-slider");
  const slides = document.querySelectorAll(".gallery-slide");
  const prevBtn = document.querySelector(".gallery-controls .prev");
  const nextBtn = document.querySelector(".gallery-controls .next");

  // Create dots
  const dotsContainer = document.createElement("div");
  dotsContainer.classList.add("gallery-dots");
  slider.parentElement.appendChild(dotsContainer);

  slides.forEach((_, index) => {
    const dot = document.createElement("span");
    if(index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".gallery-dots span");

  let currentIndex = 0;
  let isDragging = false;
  let startX, scrollLeft;

  function goToSlide(index) {
    currentIndex = index;
    const slideWidth = slides[0].offsetWidth + 20;
    slider.scrollLeft = slideWidth * index;
    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
  }

  function scrollNext() {
    currentIndex = (currentIndex + 1) % slides.length;
    goToSlide(currentIndex);
  }

  function scrollPrev() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(currentIndex);
  }

  nextBtn.addEventListener("click", scrollNext);
  prevBtn.addEventListener("click", scrollPrev);

  // Autoplay
  setInterval(scrollNext, 4000);

  // Drag / Swipe
  slider.addEventListener("mousedown", (e) => {
    isDragging = true;
    slider.classList.add("dragging");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseup", () => {
    isDragging = false;
    slider.classList.remove("dragging");
  });

  slider.addEventListener("mouseleave", () => {
    isDragging = false;
    slider.classList.remove("dragging");
  });

  slider.addEventListener("mousemove", (e) => {
    if(!isDragging) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1;
    slider.scrollLeft = scrollLeft - walk;
  });

  slider.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("touchend", () => {
    isDragging = false;
  });

  slider.addEventListener("touchmove", (e) => {
    if(!isDragging) return;
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = (x - startX) * 1;
    slider.scrollLeft = scrollLeft - walk;
  });
});
