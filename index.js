document.addEventListener("DOMContentLoaded", () => {
  // =====================================================
  // DARK MODE
  // =====================================================
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;

  darkModeToggle?.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    darkModeToggle.textContent = body.classList.contains("dark-mode")
      ? "☀️"
      : "🌙";
  });

// =====================================================
  // HAMBURGER MENU
  // =====================================================
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      const open = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", !open);
      hamburger.classList.toggle("open");
      navLinks.classList.toggle("show");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("show");
        hamburger.setAttribute("aria-expanded", false);
        hamburger.classList.remove("open");
      });
    });
  }

  // =====================================================
  // HERO SLIDER
  // =====================================================
  const heroSlides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  let currentHero = 0;
  const slideInterval = 4000;
  let autoSlide;

  function showHeroSlide(i) {
    heroSlides.forEach((slide, idx) => {
      slide.classList.remove("active");
      slide.style.opacity = idx === i ? "1" : "0";
    });
    dots.forEach((dot, idx) => dot.classList.toggle("active", idx === i));
    currentHero = i;
  }

  function nextHero() {
    showHeroSlide((currentHero + 1) % heroSlides.length);
  }

  if (heroSlides.length > 0) {
    autoSlide = setInterval(nextHero, slideInterval);

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        showHeroSlide(Number(dot.dataset.slide));
        clearInterval(autoSlide);
        autoSlide = setInterval(nextHero, slideInterval);
      });
    });

    showHeroSlide(currentHero);
  }

   // =====================================================
  // LOVE STORY 
  // =====================================================
  const storyItems = document.querySelectorAll(".story-item");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.3 });

storyItems.forEach(item => observer.observe(item));

// =====================================================
  // LIGHTBOX (Gallery + Story Images + Guest Photos)
  // =====================================================
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const closeBtn = document.querySelector(".lightbox .close");
  const nextBtn = document.querySelector(".lightbox .next");
  const prevBtn = document.querySelector(".lightbox .prev");

  let galleryImages = Array.from(
    document.querySelectorAll(".gallery-item img, .gallery-slide img, .story-img img")
  );
  let currentIndex = 0;

  function openLightbox(i) {
    if (!galleryImages[i]) return;
    currentIndex = i;
    lightboxImg.src = galleryImages[i].src;
    lightbox.classList.add("show");
  }

  function updateGalleryImages() {
    galleryImages = Array.from(
      document.querySelectorAll(".gallery-item img, .gallery-slide img, .story-img img, #guestGallery img")
    );
  }

  galleryImages.forEach((img, i) =>
    img.addEventListener("click", () => openLightbox(i))
  );

  closeBtn?.addEventListener("click", () => lightbox.classList.remove("show"));
  nextBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    openLightbox((currentIndex + 1) % galleryImages.length);
  });
  prevBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    openLightbox((currentIndex - 1 + galleryImages.length) % galleryImages.length);
  });

  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.classList.remove("show");
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("show")) return;

    if (e.key === "Escape") lightbox.classList.remove("show");
    if (e.key === "ArrowRight") openLightbox((currentIndex + 1) % galleryImages.length);
    if (e.key === "ArrowLeft") openLightbox((currentIndex - 1 + galleryImages.length) % galleryImages.length);
  });

// =====================================================
// WISHES SECTION
// =====================================================

const openModalBtn = document.getElementById("openWishModal");
const modal = document.getElementById("wishModal");
const closeModalBtn = document.getElementById("closeModal");
const wishForm = document.getElementById("wishForm");
const wishesContainer = document.getElementById("wishesContainer");

// Load existing wishes
const savedWishes = JSON.parse(localStorage.getItem("wishes")) || [];
renderWishes(savedWishes);

// Open modal
openModalBtn?.addEventListener("click", () => {
  modal.style.display = "flex";
  modal.classList.add("show-modal");
});

// Close modal
closeModalBtn?.addEventListener("click", closeModal);
window.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

function closeModal() {
  modal.classList.remove("show-modal");
  setTimeout(() => (modal.style.display = "none"), 200);
}

// Handle form submission
wishForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!fullName || !message) {
    showAlert('Please fill out both fields.');
    return;
  }

  const newWish = {
    id: Date.now(),
    fullName,
    message,
  };

  // This is fuction of alert message find the css on wish.css
  // function showAlert(message, type = 'error', duration = 2500) {
  //   const alertBox = document.getElementById('customAlert');
  //   const alertMessage = document.getElementById('alertMessage');
  
  //   alertMessage.textContent = message;
  
  //   // Remove old classes
  //   alertBox.classList.remove('error', 'success');
  
  //   // Add new class
  //   alertBox.classList.add('show', type);
  
  //   setTimeout(() => {
  //     alertBox.classList.remove('show', type);
  //   }, duration);
  // }
  
  

  // Add to list
  savedWishes.unshift(newWish);
  localStorage.setItem("wishes", JSON.stringify(savedWishes));

  renderWishes(savedWishes);

  // Reset form + close modal
  wishForm.reset();
  closeModal();
});

// Render all wishes
function renderWishes(wishes) {
  wishesContainer.innerHTML = "";

  if (wishes.length === 0) {
    wishesContainer.innerHTML = `
      <p style="opacity:0.8;">"No wishes yet 💌 Let’s shower our lovely couple with love—send your heartfelt wishes and make their day even more special!"</p>
    `;
    return;
  }

  wishes.forEach((wish, index) => {
    const card = document.createElement("div");
    card.className = "wish-card fade-in";

    card.innerHTML = `
      <div class="wish-header">
        <div class="wish-avatar-placeholder">💫</div>
        <h3 class="wish-name">${wish.fullName}</h3>
      </div>
      <p class="wish-message">“${wish.message}”</p>
    `;

    wishesContainer.appendChild(card);

    // Stagger animation
    setTimeout(() => {
      card.classList.add("show");
    }, index * 80);
  });
}
// ====== SCROLL FADE-IN ANIMATION ======
  const scrollFadeElements = document.querySelectorAll('.scroll-fade-in');

  function handleScrollFade() {
    const windowBottom = window.innerHeight * 0.9; // trigger before fully in view

    scrollFadeElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < windowBottom) {
        el.classList.add('visible');
      } else {
        el.classList.remove('visible');
      }
    });
  }

  window.addEventListener('scroll', handleScrollFade);
  window.addEventListener('load', handleScrollFade);
  
  
  });
  