(() => {
  const ready = () => {
    document.documentElement.classList.add("ready");
    if (!window.gsap) return fallback();
    const gsap = window.gsap;
    if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);
    gsap.from(".hero-copy > *", { y: 28, opacity: 0, duration: 0.85, stagger: 0.08, ease: "power3.out" });
    gsap.from(".anchor", { scale: 0.92, opacity: 0, duration: 0.9, ease: "power3.out" });
    animateSqueegee(gsap);
    gsap.from(".service-card", { scrollTrigger: { trigger: ".cards", start: "top 78%" }, y: 24, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" });
  };
  const fallback = () => document.querySelector(".anchor")?.classList.add("fallback-active");
  function animateBulldog(gsap) {
    gsap.from(".badge-ring", { rotate: -18, scale: 0.72, duration: 0.8, ease: "back.out(1.7)" });
    gsap.from(".badge-face", { y: 60, opacity: 0, duration: 0.7, delay: 0.15, ease: "back.out(1.8)" });
    gsap.from(".paw", { scale: 0, rotate: -20, duration: 0.45, stagger: 0.12, delay: 0.25, ease: "back.out(2)" });
    gsap.from(".crayon,.tag", { y: 24, opacity: 0, rotate: 12, duration: 0.55, stagger: 0.08, delay: 0.35, ease: "power2.out" });
    gsap.to(".badge-face", { y: -5, repeat: -1, yoyo: true, duration: 2.4, ease: "sine.inOut" });
  }
  function animatePipes(gsap) {
    gsap.from(".pipe-path", { strokeDasharray: 650, strokeDashoffset: 650, duration: 1.25, stagger: 0.12, ease: "power2.out" });
    gsap.to(".valve-handle", { rotate: 180, transformOrigin: "center", duration: 1.1, delay: 0.35, ease: "power2.inOut" });
    gsap.to(".pulse", { x: 420, y: 65, scale: 1.25, opacity: 0.2, repeat: -1, duration: 3.2, ease: "power1.inOut" });
  }
  function animateSqueegee(gsap) {
    const mobile = window.innerWidth < 560;
    gsap.from(".squeegee-bar,.squeegee-handle", { x: mobile ? 0 : -190, y: mobile ? -12 : -38, rotate: mobile ? -6 : -18, duration: 1, ease: "power3.out" });
    gsap.from(".glass-panel span", { opacity: 0.2, filter: "blur(8px)", duration: 0.75, stagger: 0.1, delay: 0.25 });
    gsap.from(".shine", { scaleX: 0, transformOrigin: "left", duration: 0.85, stagger: 0.12, delay: 0.65, ease: "power2.out" });
    gsap.to(".squeegee-bar,.squeegee-handle", { x: 10, repeat: -1, yoyo: true, duration: 2.6, ease: "sine.inOut" });
  }
  function animateMeter(gsap) {
    gsap.from(".meter-base span", { height: 0, duration: 0.75, stagger: 0.1, ease: "back.out(1.4)" });
    gsap.to(".dust", { x: 70, y: -30, opacity: 0, repeat: -1, duration: 2.4, stagger: 0.35, ease: "power1.out" });
    gsap.from(".anchor-meter strong", { y: 20, opacity: 0, duration: 0.65, delay: 0.35 });
  }
  function animateAz(gsap) {
    gsap.from(".az-tile", { scale: 0, rotate: 120, duration: 0.72, stagger: 0.08, ease: "back.out(1.8)" });
    gsap.to(".az-tile", { rotate: "+=360", transformOrigin: "50% 50%", repeat: -1, duration: 9, ease: "none" });
    gsap.from(".carousel-core", { scale: 0.72, opacity: 0, duration: 0.8, ease: "back.out(1.7)" });
  }
  function animateMap(gsap) {
    gsap.from(".route-path", { strokeDasharray: 720, strokeDashoffset: 720, duration: 1.35, ease: "power2.out" });
    gsap.from(".pin", { scale: 0, transformOrigin: "center", duration: 0.48, stagger: 0.16, delay: 0.45, ease: "back.out(2)" });
    gsap.to(".pin", { y: -7, repeat: -1, yoyo: true, duration: 1.9, stagger: 0.2, ease: "sine.inOut" });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ready); else ready();
})();