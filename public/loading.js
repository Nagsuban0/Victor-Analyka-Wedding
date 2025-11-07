window.addEventListener('load', () => {
  const vaModal = document.getElementById('vaModal');

  // Show modal after 0.1s
  setTimeout(() => {
    vaModal.classList.add('show');
  }, 100);

  // Hide modal after 5s
  setTimeout(() => {
    vaModal.classList.remove('show');
  }, 5100); 
});
