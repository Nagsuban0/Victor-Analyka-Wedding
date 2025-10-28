document.addEventListener("DOMContentLoaded", () => {
  // ===== Dark mode toggle =====
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;
  darkModeToggle?.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    darkModeToggle.textContent = body.classList.contains("dark-mode") ? "☀️" : "🌙";
  });

  // ===== Hamburger menu toggle =====
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", !isExpanded);
      navLinks.classList.toggle("show");
      hamburger.classList.toggle("open");
    });
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (navLinks.classList.contains("show")) {
          navLinks.classList.remove("show");
          hamburger.setAttribute("aria-expanded", false);
          hamburger.classList.remove("open");
        }
      });
    });
  }

  // ===== Highlight active nav link on scroll =====
  const sections = document.querySelectorAll("section");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 70;
      if (pageYOffset >= sectionTop) current = section.getAttribute("id");
    });
    document.querySelectorAll(".nav-links a").forEach((a) => {
      a.classList.remove("active");
      if (a.getAttribute("href") === `#${current}`) a.classList.add("active");
    });
  });

  // ===== Hero Slider =====
  const heroSlides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  let currentHero = 0;
  const slideInterval = 4000;
  let autoSlide;

  function showHeroSlide(index) {
    heroSlides.forEach((slide, i) => {
      slide.classList.remove("active");
      slide.style.opacity = i === index ? "1" : "0";
    });
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
    currentHero = index;
  }

  function nextHeroSlide() {
    showHeroSlide((currentHero + 1) % heroSlides.length);
  }

  if (heroSlides.length && dots.length) {
    autoSlide = setInterval(nextHeroSlide, slideInterval);
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        showHeroSlide(parseInt(dot.getAttribute("data-slide")));
        clearInterval(autoSlide);
        autoSlide = setInterval(nextHeroSlide, slideInterval);
      });
    });
    showHeroSlide(currentHero);
  }

  // ===== Lightbox (Gallery & Story Images) =====
  const galleryImages = document.querySelectorAll(".gallery-item img, .gallery-slide img, .story-img img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const closeBtn = document.querySelector(".lightbox .close");
  const nextLightbox = document.querySelector(".lightbox .next");
  const prevLightbox = document.querySelector(".lightbox .prev");
  let currentIndex = 0;

  function showLightbox(index) {
    if (!galleryImages[index]) return;
    currentIndex = index;
    lightboxImg.src = galleryImages[index].src;
    lightbox.classList.add("show");
  }

  galleryImages.forEach((img, i) => img.addEventListener("click", () => showLightbox(i)));
  closeBtn?.addEventListener("click", () => lightbox.classList.remove("show"));
  nextLightbox?.addEventListener("click", (e) => { e.stopPropagation(); showLightbox((currentIndex + 1) % galleryImages.length); });
  prevLightbox?.addEventListener("click", (e) => { e.stopPropagation(); showLightbox((currentIndex - 1 + galleryImages.length) % galleryImages.length); });
  lightbox?.addEventListener("click", (e) => { if (e.target === lightbox) lightbox.classList.remove("show"); });
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("show")) return;
    if (e.key === "Escape") lightbox.classList.remove("show");
    if (e.key === "ArrowRight") showLightbox((currentIndex + 1) % galleryImages.length);
    if (e.key === "ArrowLeft") showLightbox((currentIndex - 1 + galleryImages.length) % galleryImages.length);
  });

  // ===== Gallery Slider (Mobile) =====
  const slides = document.querySelectorAll(".gallery-slide");
  const nextBtn = document.querySelector(".gallery-slider .next");
  const prevBtn = document.querySelector(".gallery-slider .prev");
  let index = 0;
  let startX = 0;
  let endX = 0;

  function showSlide(n) {
    index = (n + slides.length) % slides.length;
    slides.forEach(slide => slide.style.transform = `translateX(-${index * 100}%)`);
  }

  function initSlider() {
    if (!slides.length) return;
    showSlide(index);
    nextBtn?.addEventListener("click", () => showSlide(index + 1));
    prevBtn?.addEventListener("click", () => showSlide(index - 1));
    const slider = document.querySelector(".gallery-slider");
    slider?.addEventListener("touchstart", (e) => startX = e.touches[0].clientX);
    slider?.addEventListener("touchmove", (e) => endX = e.touches[0].clientX);
    slider?.addEventListener("touchend", () => {
      if (startX - endX > 50) showSlide(index + 1);
      if (endX - startX > 50) showSlide(index - 1);
    });
    setInterval(() => showSlide(index + 1), 5000);
  }

  initSlider();
  window.addEventListener("resize", initSlider);

  // ===== Story Section Scroll Animation =====
  const storyItems = document.querySelectorAll(".story-item");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("show"); });
  }, { threshold: 0.3 });
  storyItems.forEach((item) => observer.observe(item));

  // ===== Timeline & Diamonds Animation =====
  const timeline = document.querySelector(".vertical-timeline");
  const diamonds = document.querySelectorAll(".vertical-timeline .diamond");
  const observerOptions = { threshold: 0.4 };
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        timeline.classList.add("active");
        if (diamonds[i]) diamonds[i].classList.add("active");
      } else {
        if (diamonds[i]) diamonds[i].classList.remove("active");
      }
    });
  }, observerOptions);
  sections.forEach((section) => sectionObserver.observe(section));



// ===== WISHES SECTION FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', () => {
  const openModalBtn = document.getElementById('openWishModal');
  const modal = document.getElementById('wishModal');
  const closeModalBtn = document.getElementById('closeModal');
  const wishForm = document.getElementById('wishForm');
  const wishesContainer = document.getElementById('wishesContainer');

  // Load existing wishes from localStorage
  const savedWishes = JSON.parse(localStorage.getItem('wishes')) || [];
  renderWishes(savedWishes);

  // Open and close modal
  openModalBtn.addEventListener('click', () => (modal.style.display = 'flex'));
  closeModalBtn.addEventListener('click', () => (modal.style.display = 'none'));
  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  // Handle new wish submission
  wishForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fullName = document.getElementById('fullName').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!fullName || !message) return alert('Please fill out both fields.');

    const newWish = {
      id: Date.now(),
      fullName,
      message,
    };

    savedWishes.unshift(newWish);
    localStorage.setItem('wishes', JSON.stringify(savedWishes));

    renderWishes(savedWishes);

    // Close modal and reset form
    wishForm.reset();
    modal.style.display = 'none';
  });

  // Render all wishes dynamically
  function renderWishes(wishes) {
    wishesContainer.innerHTML = '';
    if (wishes.length === 0) {
      wishesContainer.innerHTML = `<p style="opacity:0.8;">No wishes yet 💌 Be the first to send one!</p>`;
      return;
    }

    wishes.forEach((wish) => {
      const card = document.createElement('div');
      card.classList.add('wish-card');
      card.innerHTML = `
        <div class="wish-header">
          <div class="wish-avatar-placeholder">💫</div>
          <h3 class="wish-name">${wish.fullName}</h3>
        </div>
        <p class="wish-message">“${wish.message}”</p>
      `;
      wishesContainer.appendChild(card);
    });
  }
});



// ===== Responsive 3D Carousel with Autoplay, Pause & Swipe Support =====
const carousel3D = document.querySelector('.carousel3d');
const nextBtn3D = document.getElementById('next3D');
const prevBtn3D = document.getElementById('prev3D');

let angle = 0;
let autoRotate;
let depth = 500; // default translateZ depth

// Adjust depth based on screen size
function updateDepth() {
  if (window.innerWidth < 480) depth = 250;
  else if (window.innerWidth < 768) depth = 320;
  else if (window.innerWidth < 1024) depth = 400;
  else depth = 500;

  // Update transforms for each image
  document.querySelectorAll('.carousel3d img').forEach((img, i) => {
    img.style.setProperty('--i', i);
    img.style.transform = `rotateY(${i * 60}deg) translateZ(${depth}px)`;
  });
}

function rotateCarousel() {
  carousel3D.style.transform = `rotateY(${angle}deg)`;
}

function startAutoRotate() {
  stopAutoRotate();
  autoRotate = setInterval(() => {
    angle -= 60;
    rotateCarousel();
  }, 4000);
}

function stopAutoRotate() {
  clearInterval(autoRotate);
}

// Manual controls
nextBtn3D.addEventListener('click', () => {
  angle -= 60;
  rotateCarousel();
  startAutoRotate();
});

prevBtn3D.addEventListener('click', () => {
  angle += 60;
  rotateCarousel();
  startAutoRotate();
});

// Pause on hover or touch-hold
carousel3D.addEventListener('mouseenter', stopAutoRotate);
carousel3D.addEventListener('mouseleave', startAutoRotate);

// ===== Swipe gesture handling =====
(function() {
  let startX = 0;
  let isSwiping = false;

  carousel3D.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
    stopAutoRotate();
  });

  carousel3D.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;
    const diff = e.touches[0].clientX - startX;

    // Optional: add subtle drag feedback
    carousel3D.style.transform = `rotateY(${angle + diff / 5}deg)`;
  });

  carousel3D.addEventListener('touchend', (e) => {
    if (!isSwiping) return;
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;
    isSwiping = false;

    // Swipe threshold: rotate only if swipe is big enough
    if (Math.abs(diff) > 50) {
      if (diff < 0) angle -= 60; // swipe left → next
      else angle += 60; // swipe right → previous
    }

    rotateCarousel();
    startAutoRotate();
  });
})();


// Recalculate depth when window resizes
window.addEventListener('resize', updateDepth);

// Initialize
updateDepth();
startAutoRotate();

});
