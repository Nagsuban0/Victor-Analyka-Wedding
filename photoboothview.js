
// document.addEventListener("DOMContentLoaded", () => {

//   const images = document.querySelectorAll(".eyeshoot-item img");
//   const lightbox = document.getElementById("eyeshootLightbox");
//   const lightboxImg = lightbox.querySelector(".lightbox-img");
//   const closeBtn = lightbox.querySelector(".close");
//   const prevBtn = lightbox.querySelector(".prev");
//   const nextBtn = lightbox.querySelector(".next");
//   const downloadBtn = document.getElementById("downloadPhoto");
//   const loadMoreBtn = document.getElementById("loadMoreEyeshoot");

//   let currentIndex = 0;
//   let visibleCount = 6; // initial images shown

//   /* ===== SHOW LIMITED IMAGES INITIALLY ===== */
//   images.forEach((img, index) => {
//     if (index >= visibleCount) {
//       img.parentElement.style.display = "none";
//     }
//   });

//   /* ===== LOAD MORE ===== */
//   loadMoreBtn?.addEventListener("click", () => {
//     visibleCount += 6;
//     images.forEach((img, index) => {
//       if (index < visibleCount) {
//         img.parentElement.style.display = "block";
//       }
//     });

//     if (visibleCount >= images.length) {
//       loadMoreBtn.style.display = "none";
//     }
//   });

//   /* ===== OPEN LIGHTBOX ===== */
//   images.forEach((img, index) => {
//     img.addEventListener("click", () => {
//       currentIndex = index;
//       openLightbox();
//     });
//   });

//   function openLightbox() {
//     lightbox.style.display = "flex";
//     updateLightbox();
//     document.body.style.overflow = "hidden";
//   }

//   function closeLightbox() {
//     lightbox.style.display = "none";
//     document.body.style.overflow = "";
//   }

//   function updateLightbox() {
//     const src = images[currentIndex].src;
//     lightboxImg.src = src;
//     downloadBtn.href = src;
//   }

//   /* ===== NAVIGATION ===== */
//   nextBtn.addEventListener("click", () => {
//     currentIndex = (currentIndex + 1) % images.length;
//     updateLightbox();
//   });

//   prevBtn.addEventListener("click", () => {
//     currentIndex =
//       (currentIndex - 1 + images.length) % images.length;
//     updateLightbox();
//   });

//   closeBtn.addEventListener("click", closeLightbox);

//   /* ===== CLICK OUTSIDE TO CLOSE ===== */
//   lightbox.addEventListener("click", (e) => {
//     if (e.target === lightbox) closeLightbox();
//   });

//   /* ===== KEYBOARD SUPPORT ===== */
//   document.addEventListener("keydown", (e) => {
//     if (lightbox.style.display !== "flex") return;

//     if (e.key === "Escape") closeLightbox();
//     if (e.key === "ArrowRight") nextBtn.click();
//     if (e.key === "ArrowLeft") prevBtn.click();
//   });

// });
