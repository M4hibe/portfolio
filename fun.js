// Duplicate the ticker content once so the CSS marquee (translateX -50%) loops seamlessly
const track = document.getElementById("tickerTrack");
if (track) {
  track.innerHTML += track.innerHTML;
}

// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navMobile = document.getElementById("navMobile");
if (navToggle && navMobile) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMobile.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.textContent = isOpen ? "✕" : "☰";
  });
  navMobile.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMobile.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.textContent = "☰";
    });
  });
}

// Tiny confetti burst when someone clicks "Let's talk" — a marketer's CTA deserves a reaction
const confettiBtn = document.getElementById("confettiBtn");
const canvas = document.getElementById("confetti-canvas");

if (confettiBtn && canvas) {
  const ctx = canvas.getContext("2d");
  const colors = ["#ff5a3c", "#c8ff4d", "#3b4bff", "#ff8fd4", "#14120f"];
  let particles = [];
  let animId = null;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  function burst(x, y) {
    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 3 + Math.random() * 6;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: 4 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.3,
        life: 1,
      });
    }
    if (!animId) tick();
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.vy += 0.12;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.spin;
      p.life -= 0.012;
      ctx.save();
      ctx.globalAlpha = Math.max(p.life, 0);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });
    particles = particles.filter((p) => p.life > 0 && p.y < canvas.height + 40);
    if (particles.length > 0) {
      animId = requestAnimationFrame(tick);
    } else {
      animId = null;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  confettiBtn.addEventListener("click", (e) => {
    const rect = confettiBtn.getBoundingClientRect();
    burst(rect.left + rect.width / 2, rect.top + rect.height / 2);
  });
}
