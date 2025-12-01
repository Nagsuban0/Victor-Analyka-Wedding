document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('bgMusic');
  
  if (!audio) return; // safety check
  
  audio.play().catch(() => {
    console.log('Autoplay blocked. User interaction required.');
  });

  document.addEventListener('click', () => {
    audio.play();
  });
});
