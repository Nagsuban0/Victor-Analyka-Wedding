window.addEventListener('load', () => {
  const vaModal = document.getElementById('vaModal');

  // Show modal after 0.1 seconds (100ms)
  setTimeout(() => {
    vaModal.style.display = 'flex';
  }, 100);

  // Auto-close modal after 5 seconds (5000ms)
  setTimeout(() => {
    vaModal.style.display = 'none';
  }, 5100); // Slightly after it shows
});
