document.addEventListener("DOMContentLoaded", function() {
  const eventDate = new Date("2025-12-27T15:00:00").getTime();
  const countdownSection = document.querySelector('.countdown-section');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance <= 0) {
      countdownSection.innerHTML = `
        <h2>Congratulations Happy Wedding</h2>
      `;
      clearInterval(countdownInterval);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days.toString().padStart(2, "0");
    document.getElementById("hours").innerText = hours.toString().padStart(2, "0");
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, "0");
  }

  const countdownInterval = setInterval(updateCountdown, 1000);
  updateCountdown();
});
