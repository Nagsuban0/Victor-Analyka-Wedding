
document.addEventListener("DOMContentLoaded", () => {

  const gallery = document.getElementById("eyeshootGallery");
  const lightbox = document.getElementById("eyeshootLightbox");
  const lightboxImg = lightbox.querySelector(".lightbox-img");
  const closeBtn = lightbox.querySelector(".close");
  const prevBtn = lightbox.querySelector(".prev");
  const nextBtn = lightbox.querySelector(".next");
  const downloadBtn = document.getElementById("downloadPhoto");
  const loadMoreBtn = document.getElementById("loadMoreEyeshoot");

  const totalPhotos = 47;
  let visibleCount = 6;
  let currentIndex = 0;

  /* ===== GENERATE IMAGES ===== */
  for (let i = 1; i <= totalPhotos; i++) {
    const item = document.createElement("div");
    item.className = "gallery-item";

    const img = document.createElement("img");
    img.src = `../Photobooth/${i}.jpg`;
    img.alt = `Eyeshoot ${i}`;
    img.dataset.index = i - 1;

    item.appendChild(img);
    gallery.appendChild(item);
  }

  const images = document.querySelectorAll("#eyeshootGallery img");

  /* ===== SHOW LIMITED IMAGES INITIALLY ===== */
  images.forEach((img, index) => {
    if (index >= visibleCount) {
      img.parentElement.style.display = "none";
    }
  });

  /* ===== LOAD MORE ===== */
  loadMoreBtn.addEventListener("click", () => {
    visibleCount += 6;

    images.forEach((img, index) => {
      if (index < visibleCount) {
        img.parentElement.style.display = "block";
      }
    });

    if (visibleCount >= images.length) {
      loadMoreBtn.style.display = "none";
    }
  });

  /* ===== OPEN LIGHTBOX ===== */
  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      currentIndex = index;
      openLightbox();
    });
  });

  function openLightbox() {
    lightbox.style.display = "flex";
    updateLightbox();
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.style.display = "none";
    document.body.style.overflow = "";
  }

  function updateLightbox() {
    const src = images[currentIndex].src;
    lightboxImg.src = src;
    downloadBtn.href = src;
  }

  /* ===== NAVIGATION ===== */
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightbox();
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightbox();
  });

  closeBtn.addEventListener("click", closeLightbox);

  /* ===== CLICK OUTSIDE TO CLOSE ===== */
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  /* ===== KEYBOARD SUPPORT ===== */
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display !== "flex") return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
  });

});
