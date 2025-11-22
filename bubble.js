document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('bubbleCanvas');
  const ctx = canvas.getContext('2d');
let bubbles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Bubble constructor
class Bubble {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 100;
    this.radius = 5 + Math.random() * 20;
    this.speed = 1 + Math.random() * 3;
    this.alpha = 0.2 + Math.random() * 0.5;
  }
  update() {
    this.y -= this.speed;
    if (this.y + this.radius < 0) {
      this.y = canvas.height + this.radius;
      this.x = Math.random() * canvas.width;
      this.radius = 5 + Math.random() * 20;
      this.speed = 1 + Math.random() * 3;
      this.alpha = 0.2 + Math.random() * 0.5;
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
    ctx.fill();
  }
}

// Initialize bubbles
for (let i = 0; i < 80; i++) {
  bubbles.push(new Bubble());
}

// Animation loop
function animate() {
  ctx.clearRect(0,0,canvas.width, canvas.height);
  bubbles.forEach(bubble => {
    bubble.update();
    bubble.draw();
  });
  requestAnimationFrame(animate);
}
animate();
});