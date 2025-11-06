//GALLERY AND SLIDER AND LIGHTBOX

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".gallery-slider");
  const slides = document.querySelectorAll(".gallery-slide");
  const prevBtn = document.querySelector(".gallery-controls .prev");
  const nextBtn = document.querySelector(".gallery-controls .next");

  // ----- Create dots -----
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

  // ----- Slide navigation -----
  function goToSlide(index) {
    currentIndex = index;
    const slideWidth = slides[0].offsetWidth + 20; // gap = 20px
    slider.scrollTo({ left: slideWidth * index, behavior: "smooth" });
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

  // ----- Autoplay -----
  let autoplay = setInterval(scrollNext, 4000);

  slider.addEventListener("mouseenter", () => clearInterval(autoplay));
  slider.addEventListener("mouseleave", () => autoplay = setInterval(scrollNext, 4000));

  // ----- Drag / Swipe -----
  slider.addEventListener("mousedown", (e) => {
    isDragging = true;
    slider.classList.add("dragging");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseup", () => { isDragging = false; slider.classList.remove("dragging"); });
  slider.addEventListener("mouseleave", () => { isDragging = false; slider.classList.remove("dragging"); });

  slider.addEventListener("mousemove", (e) => {
    if(!isDragging) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX);
    slider.scrollLeft = scrollLeft - walk;
  });

  slider.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("touchend", () => { isDragging = false; });
  slider.addEventListener("touchmove", (e) => {
    if(!isDragging) return;
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = (x - startX);
    slider.scrollLeft = scrollLeft - walk;
  });

  // ----- Update dots on scroll -----
  slider.addEventListener("scroll", () => {
    const slideWidth = slides[0].offsetWidth + 20;
    const index = Math.round(slider.scrollLeft / slideWidth);
    dots.forEach(dot => dot.classList.remove("active"));
    if(dots[index]) dots[index].classList.add("active");
  });

  // ----- LIGHTBOX -----
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox.querySelector(".lightbox-img");
  const lightboxClose = lightbox.querySelector(".close");
  const lightboxNext = lightbox.querySelector(".next");
  const lightboxPrev = lightbox.querySelector(".prev");

  // Gather all images (gallery + slider)
  const lightboxImages = document.querySelectorAll(".lightbox-trigger, .story-item img");
  let lightboxIndex = 0;

  function openLightbox(index) {
    lightboxIndex = index;
    lightboxImg.src = lightboxImages[lightboxIndex].src;
    lightbox.style.display = "flex";
  }

  function closeLightbox() { lightbox.style.display = "none"; }

  function nextLightbox() {
    lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
    lightboxImg.src = lightboxImages[lightboxIndex].src;
  }

  function prevLightbox() {
    lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
    lightboxImg.src = lightboxImages[lightboxIndex].src;
  }

  lightboxImages.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
  });

  lightboxClose.addEventListener("click", closeLightbox);
  lightboxNext.addEventListener("click", nextLightbox);
  lightboxPrev.addEventListener("click", prevLightbox);

  // Close lightbox on outside click
  lightbox.addEventListener("click", (e) => {
    if(e.target === lightbox) closeLightbox();
  });

});
