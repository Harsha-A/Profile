/* =========================================================
   Harsha Anantharamu — Space Profile Page
   Starfield canvas, scroll reveal, nav toggle, dino easter-egg
   ========================================================= */

(() => {
  "use strict";

  /* ---------- Starfield background ---------- */
  const canvas = document.getElementById("starfield");
  const ctx = canvas.getContext("2d");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let stars = [];
  let width, height;

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initStars();
  }

  function initStars() {
    const density = Math.min(220, Math.floor((width * height) / 9000));
    stars = Array.from({ length: density }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.4 + 0.2,
      baseAlpha: Math.random() * 0.6 + 0.3,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      phase: Math.random() * Math.PI * 2,
      driftSpeed: Math.random() * 0.03 + 0.01,
    }));
  }

  function drawStars(time) {
    ctx.clearRect(0, 0, width, height);
    for (const star of stars) {
      const twinkle = Math.sin(time * star.twinkleSpeed + star.phase) * 0.35;
      const alpha = Math.max(0, Math.min(1, star.baseAlpha + twinkle));
      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(2)})`;
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();

      if (!prefersReducedMotion) {
        star.y += star.driftSpeed;
        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }
      }
    }
  }

  function animate(time) {
    drawStars(time || 0);
    if (!prefersReducedMotion) {
      requestAnimationFrame(animate);
    }
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  if (prefersReducedMotion) {
    drawStars(0);
  } else {
    requestAnimationFrame(animate);
  }

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");

  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in-view"));
  }

  /* ---------- Dino easter egg ---------- */
  const dinoTrigger = document.getElementById("dino-trigger");
  const dinoToast = document.getElementById("dino-toast");
  let toastTimer;

  dinoTrigger.addEventListener("click", () => {
    dinoTrigger.classList.remove("stomp");
    // Force reflow so the animation can replay on repeated clicks.
    void dinoTrigger.offsetWidth;
    dinoTrigger.classList.add("stomp");

    dinoToast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => dinoToast.classList.remove("show"), 2200);
  });

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
