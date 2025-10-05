const btn = document.getElementById('reveal');
const msg = document.getElementById('message');
const photo = document.getElementById('photo');
const teaser = document.getElementById('teaser');
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resizeCanvas();
addEventListener('resize', resizeCanvas);

btn.addEventListener('click', () => {
  if (msg.classList.contains('hidden')) {
    msg.classList.remove('hidden');
    msg.style.opacity = 1;
    msg.style.transform = 'translateY(0)';
    msg.setAttribute('aria-hidden', 'false');
    teaser.textContent = "I hope this makes you smile 😊";
    btn.textContent = "Sent ❤️";
    launchConfetti();
  } else {
    // already revealed
    btn.disabled = true;
  }
});

// Minimal confetti (no external library)
function launchConfetti() {
  const pieces = [];
  const colors = ['#ff6b98', '#ffd166', '#6be7b8', '#a29bfe', '#ffa0d6'];

  for (let i = 0; i < 120; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.3,
      vx: (Math.random() - 0.5) * 4,
      vy: 1 + Math.random() * 4,
      size: 6 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * 360,
      vr: (Math.random() - 0.5) * 8
    });
  }

  let t = 0;
  function frame() {
    t++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of pieces) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.03;
      p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    }

    // Stop animation after ~4 seconds
    if (t < 240) requestAnimationFrame(frame);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
