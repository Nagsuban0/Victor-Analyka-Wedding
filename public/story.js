// ===== STORY SECTION ANIMATION =====
document.addEventListener("DOMContentLoaded", () => {
  const storyItems = document.querySelectorAll(".story-item");

  function checkVisibility() {
    const triggerBottom = window.innerHeight * 0.85;

    storyItems.forEach(item => {
      const itemTop = item.getBoundingClientRect().top;
      if (itemTop < triggerBottom) {
        item.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", checkVisibility);
  checkVisibility(); // initial check
});
