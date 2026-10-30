/* KOZ SERVICES — page d'accueil */
(function () {
  "use strict";
  const K = window.KOZ, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- 1. Arrivée du haut de page ---------- */
  if (K.hasGsap()) {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from("[data-hero]", { y: 30, opacity: 0, duration: 0.85, stagger: 0.1 })
      .from(".h-ph img", { scale: 1.12, duration: 1.8, ease: "power2.out" }, 0)
      .from(".hero .ring", { scale: 0.7, opacity: 0, duration: 1.4 }, 0.1)
      .from("#manifest", { y: 40, opacity: 0, duration: 0.8 }, 0.35)
      .from("#manifest .mrow", { x: -14, opacity: 0, duration: 0.45, stagger: 0.08 }, 0.6)
      .from(".finder, .mfind", { y: 20, opacity: 0, duration: 0.7 }, 0.5);
    if (window.ScrollTrigger) {
      gsap.to("[data-parallax]", { yPercent: 6, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".hero .ring", { scale: 1.12, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    }
  }

  /* ---------- 2. Recherche → catalogue filtré ---------- */
  $("#homeSearch").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target), p = new URLSearchParams();
    p.set("dispo", f.get("dispo") === "commande" ? "commande" : "stock");
    ["categorie", "search", "prix_max"].forEach((k) => f.get(k) && p.set(k, f.get(k)));
    location.href = "catalogue.html?" + p.toString();
  });

  /* ---------- 3. Le trajet d'import : le bateau avance avec le défilement ---------- */
  const route = $("#route"), ship = $("#routeShip"), stops = $$(".st", route);
  const wide = matchMedia("(min-width: 901px)");
  let ticking = false;
  function updateRoute() {
    ticking = false;
    const vh = innerHeight;
    if (wide.matches) {
      const r = route.getBoundingClientRect();
      // 0 quand la ligne entre en bas de l'écran, 1 quand elle arrive au tiers haut
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.5)));
      const t = p * (stops.length - 1);
      ship.style.left = `calc(${t / stops.length} * 100% + 44px)`;
      stops.forEach((s, k) => s.classList.toggle("is-done", k <= t + 0.02));
    } else {
      stops.forEach((s) => s.classList.toggle("is-done", s.getBoundingClientRect().top < vh * 0.7));
    }
  }
  if (route) {
    if (K.reduce) stops.forEach((s) => s.classList.add("is-done"));
    else {
      addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(updateRoute); } }, { passive: true });
      addEventListener("resize", updateRoute);
      updateRoute();
    }
  }

  /* ---------- 4. Onglets « En stock à Tampouy » ---------- */
  const grid = $("#homeGrid");
  const score = (v) => (v.availability === "Disponible" ? 2 : 0) + (K.firstImg(v) ? 1 : 0) + (v.featured ? 0.5 : 0);
  function show(cat) {
    const list = K.DATA.filter((v) => !cat || v.category === cat).sort((a, b) => score(b) - score(a)).slice(0, 4);
    const state = K.hasGsap() && window.Flip ? Flip.getState(grid.children) : null;
    grid.innerHTML = list.map((v) => K.card(v)).join("");
    if (state) {
      Flip.from(state, { duration: 0.55, ease: "power3.inOut", targets: grid.children,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.04 }),
        onLeave: (els) => gsap.to(els, { opacity: 0, duration: 0.2 }) });
    }
  }
  $$("#homeTabs button").forEach((b) => b.addEventListener("click", () => {
    $$("#homeTabs button").forEach((x) => { x.classList.toggle("is-on", x === b); x.setAttribute("aria-selected", x === b); });
    show(b.dataset.cat);
  }));
  // remplace les lignes écrites dans le HTML par les lignes interactives (favoris, panier)
  grid.innerHTML = [...grid.children].map((el) => K.card(K.byId(el.dataset.id))).join("");
  if (K.hasGsap() && window.ScrollTrigger) {
    gsap.from(grid.children, { opacity: 0, y: 16, duration: 0.5, stagger: 0.06, ease: "power3.out", clearProps: "opacity,transform",
      scrollTrigger: { trigger: grid, start: "top 85%", once: true } });
  }
})();
