/* ===================================================================
   KOZ SERVICES — script commun à toutes les pages
   Panier, favoris, recherche, menu, horaires, mode clair/sombre, animations.
   Le site fonctionne même si les animations (GSAP) ne se chargent pas.
=================================================================== */
(function () {
  "use strict";

  const WA = typeof KOZ_WHATSAPP !== "undefined" ? KOZ_WHATSAPP : "22606591523";
  const DATA = typeof VEHICLES !== "undefined" ? VEHICLES : [];
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasGsap = () => typeof window.gsap !== "undefined" && !reduce;

  /* ---------- 1. Outils partagés ---------- */
  const fmt = (n) => Number(n).toLocaleString("fr-FR").replace(/ | /g, " ");
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const byId = (id) => DATA.find((v) => v.id === id);
  const waLink = (msg) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
  const store = {
    get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  };

  const firstImg = (v) => (v.images || []).find(Boolean) || "";
  const EMPTY = '<span class="ph-empty"><i class="fa-solid fa-car-side"></i>Photo bientôt</span>';

  /* Photo du véhicule ; si elle manque ou ne charge pas, l'emplacement « Photo bientôt » reste visible. */
  function photoBox(v, cls, src) {
    const img = src !== undefined ? src : firstImg(v);
    return `<div class="photo ${cls || ""}">${EMPTY}${img ? `<img src="${esc(img)}" alt="${esc(v.brand + " " + v.model + " " + v.year)}" loading="lazy" decoding="async" onerror="this.remove()">` : ""}</div>`;
  }
  // Photos écrites directement dans le HTML : on retire celles qui ne chargent pas
  function hydratePhotos(root = document) {
    $$(".photo img", root).forEach((img) => {
      if (img.dataset.watch) return;
      img.dataset.watch = 1;
      img.addEventListener("error", () => img.remove());
      if (img.complete && img.naturalWidth === 0) img.remove();
    });
  }

  const tag = (v) => v.availability === "Disponible" ? '<span class="tag">En stock</span>' : '<span class="tag order">Sur commande</span>';
  function actions(v) {
    const id = esc(v.id), fav = favs.has(v.id), inCart = cart.some((i) => i.id === v.id);
    return `<div class="r-act"><button type="button" class="${fav ? "is-on" : ""}" data-fav="${id}" aria-pressed="${fav}" aria-label="${fav ? "Retirer des favoris" : "Ajouter aux favoris"}"><i class="fa-${fav ? "solid" : "regular"} fa-heart"></i></button>` +
      `<button type="button" class="${inCart ? "is-added" : ""}" data-add="${id}" data-short aria-label="${inCart ? "Déjà au panier, en ajouter un" : "Ajouter au panier"}"><i class="fa-solid fa-${inCart ? "check" : "cart-plus"}"></i></button></div>`;
  }
  /* Un véhicule : en carte (par défaut) ou en ligne de stock (view = "liste") */
  function card(v, view) {
    const url = `vehicule.html?id=${encodeURIComponent(v.id)}`, km = v.mileage ? fmt(v.mileage) + " km" : "0 km";
    const name = `${esc(v.brand)} ${esc(v.model)}`;
    if (view === "liste") {
      return `<article class="row" data-id="${esc(v.id)}">${photoBox(v)}
      <div class="r-nm"><h3><a href="${url}">${name}</a></h3><small>${esc(v.category)} · ${esc(v.condition)} · ${esc(v.transmission)}<span class="sf"> · ${esc(v.fuel)}</span></small></div>
      <div class="r-c">${v.year}</div><div class="r-c">${km}</div><div class="r-c r-fuel">${esc(v.fuel)}</div>
      <div class="r-st">${tag(v)}</div><div class="r-pr">${fmt(v.price)} <small>FCFA</small></div>${actions(v)}
      <div class="r-meta">${v.year} · ${km} · ${esc(v.fuel)} · ${esc(v.condition)}</div></article>`;
    }
    return `<article class="car" data-id="${esc(v.id)}"><div class="car-ph">${photoBox(v)}${tag(v)}${actions(v)}</div>
      <small>${esc(v.category)} · ${v.year} · ${km}</small><h3><a href="${url}">${name}</a></h3>
      <p class="pr">${fmt(v.price)} <span>FCFA</span></p></article>`;
  }

  /* ---------- 2. Toast ---------- */
  let toastT;
  function toast(msg) {
    const t = $("#toast");
    if (!t) return;
    $("span", t).textContent = msg;
    t.classList.add("is-on");
    clearTimeout(toastT);
    toastT = setTimeout(() => t.classList.remove("is-on"), 2400);
  }

  /* ---------- 3. Favoris ---------- */
  const favs = new Set(store.get("koz_favoris", []).filter((id) => byId(id)));
  function renderFavCount(bump) {
    $$("[data-fav-count]").forEach((b) => {
      b.textContent = favs.size;
      b.hidden = favs.size === 0;
      if (bump) { b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump"); }
    });
  }
  function toggleFav(id) {
    const v = byId(id);
    if (!v) return;
    if (favs.has(id)) { favs.delete(id); toast("Retiré des favoris"); }
    else { favs.add(id); toast(`${v.brand} ${v.model} ajouté aux favoris`); }
    store.set("koz_favoris", [...favs]);
    $$(`[data-fav="${CSS.escape(id)}"]`).forEach((b) => {
      const on = favs.has(id);
      b.classList.toggle("is-on", on);
      b.setAttribute("aria-pressed", on);
      b.setAttribute("aria-label", on ? "Retirer des favoris" : "Ajouter aux favoris");
      $("i", b).className = `fa-${on ? "solid" : "regular"} fa-heart`;
      if (hasGsap()) gsap.fromTo(b, { scale: 0.7 }, { scale: 1, duration: 0.5, ease: "back.out(3)" });
    });
    renderFavCount(true);
    document.dispatchEvent(new CustomEvent("koz:favs"));
  }

  /* ---------- 4. Panier ---------- */
  let cart = store.get("koz_panier", []).filter((i) => byId(i.id));
  const cartCount = () => cart.reduce((n, i) => n + i.qty, 0);
  function saveCart() { store.set("koz_panier", cart); renderCart(); }

  function addToCart(id) {
    const v = byId(id);
    if (!v) return;
    const line = cart.find((i) => i.id === id);
    if (line) line.qty += 1; else cart.push({ id, qty: 1 });
    saveCart();
    renderCartCount(true);
    toast(`${v.brand} ${v.model} ajouté au panier`);
    $$(`[data-add="${CSS.escape(id)}"]`).forEach((b) => setAdded(b, true));
  }
  function setAdded(b, on) {
    b.classList.toggle("is-added", on);
    if (b.hasAttribute("data-short")) {
      b.innerHTML = `<i class="fa-solid fa-${on ? "check" : "cart-plus"}"></i>`;
      b.setAttribute("aria-label", on ? "Déjà au panier, en ajouter un" : "Ajouter au panier");
    } else b.innerHTML = on ? '<i class="fa-solid fa-check"></i>Au panier' : '<i class="fa-solid fa-cart-plus"></i>Ajouter au panier';
  }

  function renderCartCount(bump) {
    const n = cartCount();
    $$("[data-cart-count]").forEach((b) => {
      b.textContent = n; b.hidden = n === 0;
      if (bump) { b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump"); }
    });
    $$("[data-cart-count2]").forEach((b) => (b.textContent = n));
  }

  function renderCart() {
    const body = $("#cartBody"), foot = $("#cartFoot");
    if (!body) return;
    if (!cart.length) {
      body.innerHTML = `<div class="dr-empty"><i class="fa-solid fa-bag-shopping"></i><p>Votre panier est vide.</p><a class="b b-dark" href="catalogue.html" style="margin-top:16px">Voir le catalogue</a></div>`;
      foot.hidden = true;
    } else {
      body.innerHTML = cart.map(({ id, qty }) => {
        const v = byId(id);
        return `<div class="citem">${photoBox(v, "")}<div><b>${esc(v.brand)} ${esc(v.model)}</b><small>${v.year} · ${esc(v.availability)}</small><div class="p">${fmt(v.price)} FCFA</div>
          <div class="qty"><button type="button" data-qty="-1" data-id="${esc(id)}" aria-label="Retirer un"><i class="fa-solid fa-minus"></i></button><span>${qty}</span><button type="button" data-qty="1" data-id="${esc(id)}" aria-label="Ajouter un"><i class="fa-solid fa-plus"></i></button></div></div>
          <button class="rm" type="button" data-rm="${esc(id)}" aria-label="Supprimer ${esc(v.brand + " " + v.model)}"><i class="fa-solid fa-trash"></i></button></div>`;
      }).join("");
      foot.hidden = false;
      const total = cart.reduce((s, i) => s + byId(i.id).price * i.qty, 0);
      $("#cartTotal").textContent = fmt(total) + " FCFA";
      const lines = cart.map((i) => { const v = byId(i.id); return `- ${v.brand} ${v.model} (${v.year}) x${i.qty} : ${fmt(v.price * i.qty)} FCFA`; });
      $("#cartOrder").href = waLink(`Bonjour KOZ SERVICES, je souhaite commander :\n${lines.join("\n")}\n\nTotal : ${fmt(total)} FCFA\nMerci de me confirmer la disponibilité.`);
    }
    renderCartCount();
  }

  /* ---------- 5. Tiroirs : panier, recherche, menu ---------- */
  const overlay = $("#overlay");
  let openPanel = null, lastFocus = null;
  function open(panel) {
    if (!panel) return;
    close();
    lastFocus = document.activeElement;
    openPanel = panel;
    panel.classList.add("is-on");
    panel.setAttribute("aria-hidden", "false");
    overlay && overlay.classList.add("is-on");
    document.documentElement.classList.add("no-scroll");
    const f = panel.querySelector("input, button, a");
    setTimeout(() => f && f.focus(), 60);
  }
  function close() {
    if (!openPanel) return;
    openPanel.classList.remove("is-on");
    openPanel.setAttribute("aria-hidden", "true");
    overlay && overlay.classList.remove("is-on");
    document.documentElement.classList.remove("no-scroll");
    openPanel = null;
    lastFocus && lastFocus.focus && lastFocus.focus();
  }
  window.KOZ_open = open; window.KOZ_close = close;

  const burger = $("#burger"), mnav = $("#mnav"), mnavBg = $("#mnavBg");
  function setMenu(on) {
    if (!mnav) return;
    if (on && mnavBg) mnavBg.hidden = false;
    requestAnimationFrame(() => {
      mnav.classList.toggle("is-on", on);
      mnavBg && mnavBg.classList.toggle("is-on", on);
    });
    if (!on && mnavBg) setTimeout(() => { if (!mnav.classList.contains("is-on")) mnavBg.hidden = true; }, 350);
    burger.setAttribute("aria-expanded", on);
    burger.setAttribute("aria-label", on ? "Fermer le menu" : "Ouvrir le menu");
    $("i", burger).className = on ? "fa-solid fa-xmark" : "fa-solid fa-bars";
    document.documentElement.classList.toggle("no-scroll", on);
    $$(".mn-link, .mn-row, .mn-info, .mn-acts", mnav).forEach((a, i) => (a.style.transitionDelay = on ? 60 + i * 35 + "ms" : "0ms"));
  }
  mnavBg && mnavBg.addEventListener("click", () => setMenu(false));
  burger && burger.addEventListener("click", () => setMenu(!mnav.classList.contains("is-on")));

  /* ---------- 6. Recherche rapide ---------- */
  const sbInput = $("#sbInput"), sbRes = $("#sbRes"), sbAll = $("#sbAll");
  function runSearch() {
    const q = sbInput.value.trim().toLowerCase();
    const found = q ? DATA.filter((v) => `${v.brand} ${v.model} ${v.category} ${v.fuel} ${v.year}`.toLowerCase().includes(q)) : DATA.slice(0, 5);
    sbAll.href = "catalogue.html" + (q ? "?search=" + encodeURIComponent(sbInput.value.trim()) : "");
    sbAll.textContent = !q ? "Voir tout le catalogue" : found.length === 1 ? "Voir le résultat dans le catalogue" : found.length ? `Voir les ${found.length} résultats dans le catalogue` : "Voir tout le catalogue";
    sbRes.innerHTML = found.length
      ? found.slice(0, 6).map((v) => `<a href="vehicule.html?id=${encodeURIComponent(v.id)}">${photoBox(v, "")}<span><b>${esc(v.brand)} ${esc(v.model)}</b><small>${esc(v.category)} · ${v.year} · ${esc(v.fuel)}</small></span><span class="p">${fmt(v.price)} FCFA</span></a>`).join("")
      : `<p>Aucun véhicule ne correspond à « ${esc(sbInput.value)} ». Nous pouvons l'importer du Canada pour vous.</p>`;
  }
  sbInput && sbInput.addEventListener("input", runSearch);
  sbInput && sbInput.addEventListener("keydown", (e) => { if (e.key === "Enter") location.href = sbAll.href; });

  /* ---------- 7. Délégation des clics ---------- */
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-fav],[data-add],[data-open-cart],[data-open-search],[data-close],[data-qty],[data-rm],#cartClear,#overlay");
    if (!t) return;
    if (t.matches("[data-fav]")) { e.preventDefault(); toggleFav(t.dataset.fav); }
    else if (t.matches("[data-add]")) { e.preventDefault(); addToCart(t.dataset.add); }
    else if (t.matches("[data-open-cart]")) { renderCart(); open($("#cart")); }
    else if (t.matches("[data-open-search]")) { open($("#searchbox")); runSearch(); }
    else if (t.matches("[data-close]") || t.id === "overlay") close();
    else if (t.matches("[data-qty]")) {
      const line = cart.find((i) => i.id === t.dataset.id);
      if (line) { line.qty += Number(t.dataset.qty); if (line.qty < 1) cart = cart.filter((i) => i !== line); saveCart(); }
    } else if (t.matches("[data-rm]")) { cart = cart.filter((i) => i.id !== t.dataset.rm); saveCart(); resetAddButtons(t.dataset.rm); }
    else if (t.id === "cartClear") { const ids = cart.map((i) => i.id); cart = []; saveCart(); ids.forEach(resetAddButtons); }
  });
  function resetAddButtons(id) {
    $$(`[data-add="${CSS.escape(id)}"]`).forEach((b) => setAdded(b, false));
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { close(); setMenu(false); }
    if (e.key === "/" && !/input|textarea|select/i.test(document.activeElement.tagName) && $("#searchbox")) { e.preventDefault(); open($("#searchbox")); runSearch(); }
  });

  /* ---------- 8. Ouvert / fermé (Ouagadougou = heure UTC) ---------- */
  const HOURS = { 1: [10, 19], 2: [10, 19], 3: [10, 19], 4: [10, 19], 5: [10, 19], 6: [8, 15] };
  const DAYS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
  function openState() {
    const now = new Date(), day = now.getUTCDay(), h = now.getUTCHours() + now.getUTCMinutes() / 60, today = HOURS[day];
    if (today && h >= today[0] && h < today[1]) return { open: true, text: `Ouvert, jusqu'à ${today[1]}h`, day };
    for (let k = 0; k < 7; k++) {
      const d = (day + k) % 7, hrs = HOURS[d];
      if (hrs && (k > 0 || h < hrs[0])) return { open: false, text: `Fermé, ouvre ${k === 0 ? "aujourd'hui" : k === 1 ? "demain" : DAYS[d]} à ${hrs[0]}h`, day };
    }
    return { open: false, text: "Fermé", day };
  }
  function renderOpen() {
    const s = openState();
    $$("[data-open-status],[data-open-pill]").forEach((el) => { el.classList.toggle("is-open", s.open); el.classList.toggle("is-closed", !s.open); });
    $$("[data-open-text]").forEach((el) => (el.textContent = s.text));
    $$(".hours tr[data-days]").forEach((tr) => tr.classList.toggle("is-today", tr.dataset.days.split(",").includes(String(s.day))));
  }

  /* ---------- 9. En-tête au défilement ---------- */
  const hdr = $("#siteHeader");
  const onScroll = () => hdr && hdr.classList.toggle("is-scrolled", scrollY > 30);
  addEventListener("scroll", onScroll, { passive: true });

  /* ---------- 10. Mode clair / mode sombre ---------- */
  const root = document.documentElement, themeBtn = $("#themeToggle"), themeSw = $$("[data-theme-switch]");
  const theme = () => root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  function syncThemeBtn() {
    const dark = theme() === "dark";
    if (themeBtn) {
      themeBtn.setAttribute("aria-pressed", dark);
      themeBtn.setAttribute("aria-label", dark ? "Activer le mode clair" : "Activer le mode sombre");
    }
    themeSw.forEach((c) => (c.checked = dark));
    const m = $('meta[name="theme-color"]');
    if (m) m.content = dark ? "#070C1C" : "#FFFFFF";
  }
  function applyTheme(t) {
    root.setAttribute("data-theme", t);
    try { localStorage.setItem("koz_theme", t); } catch (e) {}
    syncThemeBtn();
  }
  // le nouveau mode s'ouvre en cercle depuis le bouton touché
  function switchTheme(from) {
    const next = theme() === "dark" ? "light" : "dark";
    if (!document.startViewTransition || reduce) return applyTheme(next);
    const r = from.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
    const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    root.classList.add("vt-theme");
    const vt = document.startViewTransition(() => applyTheme(next));
    vt.ready.then(() => root.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
      { duration: 600, easing: "cubic-bezier(.22,.8,.24,1)", pseudoElement: "::view-transition-new(root)" })).catch(() => {});
    vt.finished.finally(() => root.classList.remove("vt-theme"));
  }
  themeBtn && themeBtn.addEventListener("click", () => switchTheme(themeBtn));
  themeSw.forEach((c) => c.addEventListener("change", () => switchTheme(c.closest(".sw") || c)));
  // si la personne n'a rien choisi, on suit le réglage de son appareil
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (ev) => {
    let saved = null;
    try { saved = localStorage.getItem("koz_theme"); } catch (e) {}
    if (!saved) { root.setAttribute("data-theme", ev.matches ? "dark" : "light"); syncThemeBtn(); }
  });

  /* ---------- 11. Animations ---------- */
  // .rv : apparition douce ; [data-hit] : le tampon « frappe » le document quand il arrive à l'écran
  function reveal(scope = document) {
    const els = $$(".rv:not(.is-in)", scope), stamps = $$("[data-hit]:not(.is-hit)", scope);
    if (!("IntersectionObserver" in window) || reduce) { els.forEach((el) => el.classList.add("is-in")); stamps.forEach((el) => el.classList.add("is-hit")); return; }
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add(en.target.hasAttribute("data-hit") ? "is-hit" : "is-in"); io.unobserve(en.target); }
    }), { rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => io.observe(el));
    stamps.forEach((el) => io.observe(el));
  }
  // Groupes de cartes : apparition l'une après l'autre
  function stagger(root = document) {
    if (!hasGsap() || !window.ScrollTrigger) return;
    $$("[data-stagger]", root).forEach((g) => {
      if (g.dataset.done) return;
      g.dataset.done = 1;
      gsap.from(g.children, { y: 40, opacity: 0, duration: 0.8, stagger: 0.08, ease: "power3.out", clearProps: "transform,opacity",
        scrollTrigger: { trigger: g, start: "top 85%", once: true } });
    });
  }
  function boot() {
    if (window.ScrollTrigger && window.gsap) gsap.registerPlugin(ScrollTrigger);
    if (window.Flip && window.gsap) gsap.registerPlugin(Flip);
    hydratePhotos();
    renderFavCount(); renderCartCount(); renderCart(); renderOpen(); onScroll();
    $$("[data-fav]").forEach((b) => { const on = favs.has(b.dataset.fav); b.classList.toggle("is-on", on); b.setAttribute("aria-pressed", on); b.setAttribute("aria-label", on ? "Retirer des favoris" : "Ajouter aux favoris"); $("i", b).className = `fa-${on ? "solid" : "regular"} fa-heart`; });
    cart.forEach((i) => $$(`[data-add="${CSS.escape(i.id)}"]`).forEach((b) => setAdded(b, true)));
    syncThemeBtn();
    $$("[data-year]").forEach((y) => (y.textContent = new Date().getFullYear()));
    setInterval(renderOpen, 60000);
  }
  // Les animations démarrent quand tous les scripts de la page ont fini de remplir le contenu
  let animated = false;
  function animate() { if (animated) return; animated = true; hydratePhotos(); reveal(); stagger(); }
  document.addEventListener("DOMContentLoaded", animate, { once: true });
  setTimeout(animate, 1200);

  window.KOZ = { DATA, fmt, esc, byId, waLink, card, photoBox, hydratePhotos, tag, firstImg, toast, reveal, stagger, hasGsap, reduce, favs, store, open, close };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
