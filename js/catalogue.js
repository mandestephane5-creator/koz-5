/* KOZ SERVICES — catalogue : filtres, tri, pagination, animations */
(function () {
  "use strict";
  const K = window.KOZ, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const DATA = K.DATA, PER = 12, STEP = 500000;
  const grid = $("#grid"), filters = $("#filters"), head = $("#stockHead");
  let VIEW = K.store.get("koz_vue", "grille") === "liste" ? "liste" : "grille";
  const prices = DATA.map((v) => v.price);
  const PMIN = Math.floor(Math.min(...prices) / 1e6) * 1e6, PMAX = Math.ceil(Math.max(...prices) / 1e6) * 1e6;
  const S = { dispo: "tous", q: "", fav: false, etat: [], categorie: [], marque: [], carburant: [], boite: [], min: PMIN, max: PMAX, sort: "reco", page: 1 };
  const M = (n) => (n >= 1e6 ? (n / 1e6).toLocaleString("fr-FR", { maximumFractionDigits: 1 }) + " M" : K.fmt(n)) + " FCFA";

  /* ---------- 1. Lecture de l'URL (liens depuis l'accueil, le menu, Google) ---------- */
  const U = new URLSearchParams(location.search);
  if (U.get("search")) S.q = U.get("search");
  if (U.get("categorie")) S.categorie = U.get("categorie").split(",");
  if (U.get("marque")) S.marque = U.get("marque").split(",");
  if (U.get("dispo") === "stock" || U.get("dispo") === "commande") S.dispo = U.get("dispo");
  if (U.get("prix_max")) S.max = Math.min(PMAX, Math.max(PMIN, +U.get("prix_max") || PMAX));
  if (U.get("favoris") === "1") S.fav = true;
  if (U.get("tri")) S.sort = U.get("tri");

  /* ---------- 2. Contrôles ---------- */
  const q = $("#q"), sort = $("#sort"), onlyFav = $("#onlyFav"), pmin = $("#pmin"), pmax = $("#pmax");
  [pmin, pmax].forEach((r) => { r.min = PMIN; r.max = PMAX; r.step = STEP; });
  function syncControls() {
    q.value = S.q; sort.value = S.sort; onlyFav.checked = S.fav;
    pmin.value = S.min; pmax.value = S.max;
    $$('input[name="dispo"]').forEach((r) => (r.checked = r.value === S.dispo));
    ["etat", "categorie", "marque", "carburant", "boite"].forEach((k) => $$(`input[name="${k}"]`).forEach((c) => (c.checked = S[k].includes(c.value))));
    // une marque cochée doit être visible
    $$('input[name="marque"]').forEach((c) => c.checked && c.closest(".ck").classList.remove("is-hidden"));
    drawRange();
  }

  // histogramme des prix
  const BINS = 20, hist = $("#hist"), counts = new Array(BINS).fill(0);
  prices.forEach((p) => counts[Math.min(BINS - 1, Math.floor(((p - PMIN) / (PMAX - PMIN)) * BINS))]++);
  const top = Math.max(...counts);
  hist.innerHTML = counts.map((c) => `<i style="height:${6 + (c / top) * 40}px"></i>`).join("");
  function drawRange() {
    const a = (S.min - PMIN) / (PMAX - PMIN), b = (S.max - PMIN) / (PMAX - PMIN);
    const sel = $("#rangeSel");
    sel.style.left = `calc(9px + ${a} * (100% - 18px))`;
    sel.style.width = `calc(${b - a} * (100% - 18px))`;
    $("#pminTxt").textContent = M(S.min); $("#pmaxTxt").textContent = M(S.max);
    $$("i", hist).forEach((bar, i) => bar.classList.toggle("in", (i + 0.5) / BINS >= a && (i + 0.5) / BINS <= b));
  }

  /* ---------- 3. Filtrage + tri ---------- */
  function results() {
    const words = S.q.toLowerCase().split(/\s+/).filter(Boolean);
    let list = DATA.filter((v) => {
      if (S.dispo === "stock" && v.availability !== "Disponible") return false;
      if (S.dispo === "commande" && v.availability === "Disponible") return false;
      if (S.fav && !K.favs.has(v.id)) return false;
      if (S.etat.length && !S.etat.includes(v.condition)) return false;
      if (S.categorie.length && !S.categorie.includes(v.category)) return false;
      if (S.marque.length && !S.marque.includes(v.brand)) return false;
      if (S.carburant.length && !S.carburant.includes(v.fuel)) return false;
      if (S.boite.length && !S.boite.includes(v.transmission)) return false;
      if (v.price < S.min || v.price > S.max) return false;
      const hay = `${v.brand} ${v.model} ${v.category} ${v.fuel} ${v.year} ${v.condition}`.toLowerCase();
      return words.every((w) => hay.includes(w));
    });
    const reco = (v) => (v.availability === "Disponible" ? 2 : 0) + (K.firstImg(v) ? 1 : 0) + (v.featured ? 0.5 : 0);
    const by = { "prix-asc": (a, b) => a.price - b.price, "prix-desc": (a, b) => b.price - a.price, annee: (a, b) => b.year - a.year, km: (a, b) => a.mileage - b.mileage, reco: (a, b) => reco(b) - reco(a) };
    return list.sort(by[S.sort] || by.reco);
  }

  /* ---------- 4. Affichage ---------- */
  let first = true;
  function render(scrollUp) {
    const list = results(), pages = Math.max(1, Math.ceil(list.length / PER));
    S.page = Math.min(S.page, pages);
    const slice = list.slice((S.page - 1) * PER, S.page * PER);
    const state = !first && K.hasGsap() && window.Flip ? Flip.getState(grid.querySelectorAll("[data-id]")) : null;

    grid.className = VIEW === "liste" ? "list" : "cars";
    head.hidden = VIEW !== "liste" || !slice.length;
    grid.innerHTML = slice.length ? slice.map((v) => K.card(v, VIEW)).join("") : `<div class="empty"><i class="fa-solid fa-car-side"></i><h2>Aucun véhicule ne correspond</h2>
      <p>Élargissez vos filtres, ou demandez-nous ce modèle : nous pouvons l'importer du Canada.</p>
      <div class="acts"><button class="b" type="button" data-reset>Réinitialiser les filtres</button><a class="b b-wa" href="${K.waLink("Bonjour KOZ SERVICES, je recherche : " + (S.q || "un véhicule"))}" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i>Demander ce véhicule</a></div></div>`;

    if (state) {
      Flip.from(state, { targets: grid.querySelectorAll("[data-id]"), duration: 0.5, ease: "power3.inOut", absolute: true, nested: true,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.03, ease: "power3.out" }),
        onLeave: (els) => gsap.to(els, { opacity: 0, duration: 0.2 }) });
    }
    first = false;

    $("#resCount").textContent = `${list.length} véhicule${list.length > 1 ? "s" : ""}`;
    document.title = S.categorie.length === 1 ? `${S.categorie[0]} à Ouagadougou : ${list.length} véhicules | KOZ SERVICES` : "Voitures neuves et d'occasion à Ouagadougou | KOZ SERVICES";

    // pagination
    const pg = $("#pager");
    pg.innerHTML = pages < 2 ? "" : `<button type="button" data-pg="${S.page - 1}" aria-label="Page précédente" ${S.page === 1 ? "disabled" : ""}><i class="fa-solid fa-chevron-left"></i></button>` +
      Array.from({ length: pages }, (_, i) => `<button type="button" data-pg="${i + 1}" class="${i + 1 === S.page ? "is-on" : ""}" aria-label="Page ${i + 1}"${i + 1 === S.page ? ' aria-current="page"' : ""}>${i + 1}</button>`).join("") +
      `<button type="button" data-pg="${S.page + 1}" aria-label="Page suivante" ${S.page === pages ? "disabled" : ""}><i class="fa-solid fa-chevron-right"></i></button>`;

    // filtres actifs
    const chips = [];
    if (S.dispo !== "tous") chips.push(["dispo", S.dispo, S.dispo === "stock" ? "En stock" : "Sur commande"]);
    if (S.fav) chips.push(["fav", 1, "Mes favoris"]);
    if (S.q) chips.push(["q", S.q, `« ${S.q} »`]);
    ["etat", "categorie", "marque", "carburant", "boite"].forEach((k) => S[k].forEach((v) => chips.push([k, v, v])));
    if (S.min > PMIN || S.max < PMAX) chips.push(["prix", 1, `${M(S.min).replace(" FCFA", "")} – ${M(S.max)}`]);
    $("#active").innerHTML = chips.map(([k, v, t]) => `<button type="button" data-chip="${k}" data-val="${K.esc(v)}" aria-label="Retirer le filtre ${K.esc(t)}">${K.esc(t)} <i class="fa-solid fa-xmark"></i></button>`).join("");
    const n = chips.length, badge = $("#fCount");
    badge.textContent = n; badge.hidden = n === 0;

    // URL partageable
    const p = new URLSearchParams();
    if (S.q) p.set("search", S.q);
    if (S.categorie.length) p.set("categorie", S.categorie.join(","));
    if (S.marque.length) p.set("marque", S.marque.join(","));
    if (S.dispo !== "tous") p.set("dispo", S.dispo);
    if (S.max < PMAX) p.set("prix_max", S.max);
    if (S.fav) p.set("favoris", "1");
    if (S.sort !== "reco") p.set("tri", S.sort);
    history.replaceState(null, "", "catalogue.html" + (p.toString() ? "?" + p : ""));

    if (scrollUp) $("#res-title").scrollIntoView({ behavior: K.reduce ? "auto" : "smooth", block: "start" });
  }

  /* ---------- 5. Événements ---------- */
  const go = (scrollUp) => { S.page = 1; render(scrollUp); };
  let qT;
  q.addEventListener("input", () => { clearTimeout(qT); qT = setTimeout(() => { S.q = q.value.trim(); go(); }, 220); });
  sort.addEventListener("change", () => { S.sort = sort.value; go(); });
  onlyFav.addEventListener("change", () => { S.fav = onlyFav.checked; go(); });
  $$('input[name="dispo"]').forEach((r) => r.addEventListener("change", () => { S.dispo = r.value; go(); }));
  ["etat", "categorie", "marque", "carburant", "boite"].forEach((k) => $$(`input[name="${k}"]`).forEach((c) => c.addEventListener("change", () => {
    S[k] = $$(`input[name="${k}"]:checked`).map((x) => x.value); go();
  })));
  function onRange(e) {
    let a = +pmin.value, b = +pmax.value;
    if (a > b - STEP) { if (e.target === pmin) a = b - STEP; else b = a + STEP; }
    pmin.value = S.min = Math.max(PMIN, a); pmax.value = S.max = Math.min(PMAX, b);
    drawRange();
  }
  [pmin, pmax].forEach((r) => { r.addEventListener("input", onRange); r.addEventListener("change", () => go()); });

  function resetAll() {
    Object.assign(S, { dispo: "tous", q: "", fav: false, etat: [], categorie: [], marque: [], carburant: [], boite: [], min: PMIN, max: PMAX, sort: "reco", page: 1 });
    syncControls(); render();
  }
  $("#reset").addEventListener("click", resetAll);
  document.addEventListener("click", (e) => {
    const chip = e.target.closest("[data-chip]"), page = e.target.closest("[data-pg]"), rs = e.target.closest("[data-reset]");
    if (rs) return resetAll();
    if (page && !page.disabled) { S.page = +page.dataset.pg; render(true); }
    if (chip) {
      const k = chip.dataset.chip, v = chip.dataset.val;
      if (k === "dispo") S.dispo = "tous"; else if (k === "fav") S.fav = false; else if (k === "q") S.q = "";
      else if (k === "prix") { S.min = PMIN; S.max = PMAX; } else S[k] = S[k].filter((x) => x !== v);
      syncControls(); go();
    }
  });
  document.addEventListener("koz:favs", () => { if (S.fav) render(); });

  $("#moreBrands").addEventListener("click", (e) => {
    const hidden = $$(".ck.is-hidden", filters);
    const open = e.currentTarget.getAttribute("aria-expanded") === "true";
    $$('input[name="marque"]').forEach((c, i) => { if (i >= 5) c.closest(".ck").classList.toggle("is-hidden", open && !c.checked); });
    e.currentTarget.setAttribute("aria-expanded", !open);
    e.currentTarget.innerHTML = open ? 'Plus de marques <i class="fa-solid fa-chevron-down"></i>' : 'Moins de marques <i class="fa-solid fa-chevron-up"></i>';
    if (!open && K.hasGsap()) gsap.from(hidden, { opacity: 0, x: -10, duration: 0.3, stagger: 0.03 });
  });

  // affichage en liste (feuille de stock) ou en grandes photos
  function syncViews() { $$("#views button").forEach((b) => { const on = b.dataset.view === VIEW; b.classList.toggle("is-on", on); b.setAttribute("aria-pressed", on); }); }
  $$("#views button").forEach((b) => b.addEventListener("click", () => {
    if (VIEW === b.dataset.view) return;
    VIEW = b.dataset.view; K.store.set("koz_vue", VIEW); syncViews();
    first = true; render();
    if (K.hasGsap()) gsap.from(grid.children, { opacity: 0, y: 16, duration: 0.45, stagger: 0.03, ease: "power3.out", clearProps: "opacity,transform" });
  }));
  syncViews();

  // filtres en panneau sur mobile
  $("#openFilters").addEventListener("click", () => K.open(filters));
  $("#closeFilters").addEventListener("click", () => K.close());
  $("#applyFilters").addEventListener("click", () => { K.close(); $("#res-title").scrollIntoView({ block: "start" }); });

  syncControls();
  render();
})();
