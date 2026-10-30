/* KOZ SERVICES — fiche d'un véhicule (vehicule.html?id=...) */
(function () {
  "use strict";
  const K = window.KOZ, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const id = new URLSearchParams(location.search).get("id");
  const v = K.byId(id), box = $("#vd");

  if (!v) {
    box.innerHTML = `<div class="notfound"><p class="eyebrow" style="justify-content:center">Véhicule introuvable</p><h1>Ce véhicule n'est plus en ligne</h1>
      <p style="color:var(--mute);margin:14px auto 24px;max-width:46ch">Il a peut-être été vendu. Parcourez le catalogue ou demandez-nous un modèle équivalent.</p>
      <div class="acts" style="justify-content:center"><a class="b b-dark" href="catalogue.html">Voir le catalogue</a><a class="b b-wa" href="${K.waLink("Bonjour KOZ SERVICES, je cherche un véhicule.")}" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i>Nous écrire</a></div></div>`;
    document.title = "Véhicule introuvable | KOZ SERVICES";
    const m = document.createElement("meta"); m.name = "robots"; m.content = "noindex"; document.head.appendChild(m);
    return;
  }

  const name = `${v.brand} ${v.model}`;
  const imgs = (v.images || []).filter(Boolean);
  const LABELS = { moteur: "Moteur", puissance: "Puissance", couple: "Couple", consommation: "Consommation", traction: "Transmission", transmission_detail: "Boîte de vitesses", coffre: "Coffre", charge_utile: "Charge utile", reservoir: "Réservoir", garantie: "Garantie", couleur: "Couleur", places: "Places", climatisation: "Climatisation", equipements: "Équipements" };
  const specs = Object.entries(v.specifications || {}).filter(([, val]) => val !== "" && val != null);

  /* ---------- 1. SEO de la page ---------- */
  const desc = `${name} ${v.year}, ${v.condition.toLowerCase()}, ${v.mileage ? K.fmt(v.mileage) + " km, " : ""}${v.fuel.toLowerCase()}, ${v.transmission.toLowerCase()} : ${K.fmt(v.price)} FCFA chez KOZ SERVICES à Ouagadougou.`;
  document.title = `${name} ${v.year} à ${K.fmt(v.price)} FCFA | KOZ SERVICES Ouagadougou`;
  const setMeta = (sel, attr, val) => { const m = $(sel); if (m) m.setAttribute(attr, val); };
  setMeta('meta[name="description"]', "content", desc);
  setMeta('meta[property="og:title"]', "content", document.title);
  setMeta('meta[property="og:description"]', "content", desc);
  const canon = $('link[rel="canonical"]');
  if (canon) { canon.href = canon.href.split("?")[0] + "?id=" + encodeURIComponent(v.id); setMeta('meta[property="og:url"]', "content", canon.href); }
  if (imgs[0]) setMeta('meta[property="og:image"]', "content", imgs[0]);
  const ld = document.createElement("script");
  ld.type = "application/ld+json";
  ld.textContent = JSON.stringify({
    "@context": "https://schema.org", "@type": "Car", name: `${name} ${v.year}`, brand: { "@type": "Brand", name: v.brand }, model: v.model,
    vehicleModelDate: String(v.year), bodyType: v.category, fuelType: v.fuel, vehicleTransmission: v.transmission,
    itemCondition: v.condition === "Neuf" ? "https://schema.org/NewCondition" : "https://schema.org/UsedCondition",
    mileageFromOdometer: { "@type": "QuantitativeValue", value: v.mileage, unitCode: "KMT" }, image: imgs, description: v.description,
    offers: { "@type": "Offer", price: v.price, priceCurrency: "XOF", availability: v.availability === "Disponible" ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
      seller: { "@type": "AutoDealer", name: "KOZ SERVICES", telephone: "+226 06 59 15 23" } }
  });
  document.head.appendChild(ld);
  $("#crumbName").textContent = name;

  /* ---------- 2. Contenu : la fiche se lit comme un bordereau ---------- */
  const fav = K.favs.has(v.id), stock = v.availability === "Disponible";
  const ref = "KOZ-" + String(K.DATA.indexOf(v) + 1).padStart(3, "0");
  const km = v.mileage ? K.fmt(v.mileage) + " km" : "0 km";
  box.innerHTML = `
  <div class="vd">
    <div class="gallery">
      <div class="stamp" data-hit aria-hidden="true" style="right:18px;top:18px"><div>${stock ? "<b>OK</b><small>INSPECTÉ</small>" : "<b>4/4</b><small>CONTRÔLES</small>"}</div></div>
      <div id="gMain">${K.photoBox(v, "g-main", imgs[0] || "")}</div>
      ${imgs.length > 1 ? `<div class="g-thumbs" role="tablist" aria-label="Photos">${imgs.map((src, i) => `<button type="button" role="tab" aria-selected="${i === 0}" class="${i === 0 ? "is-on" : ""}" data-img="${i}" aria-label="Photo ${i + 1}"><img src="${K.esc(src)}" alt="" loading="lazy" onerror="this.parentNode.remove()"></button>`).join("")}</div>` : ""}
    </div>
    <aside class="sheet" aria-label="Fiche du véhicule">
      <div class="sheet-top"><span>Fiche ${ref}</span>${K.tag(v)}</div>
      <div class="sheet-in">
        <h1>${K.esc(name)}</h1>
        <p class="sub">${K.esc(v.category)} · ${v.year} · ${K.esc(v.condition)}</p>
        <p class="price">${K.fmt(v.price)} <small>FCFA</small></p>
        <dl class="facts">
          <div><dt>Kilométrage</dt><dd>${km}</dd></div>
          <div><dt>Carburant</dt><dd>${K.esc(v.fuel)}</dd></div>
          <div><dt>Boîte</dt><dd>${K.esc(v.transmission)}</dd></div>
          <div><dt>Disponibilité</dt><dd>${stock ? "À Tampouy, essai possible" : "Sur commande, ≈ 2 mois"}</dd></div>
        </dl>
        <div class="sheet-acts">
          <button class="b b-dark" type="button" data-add="${K.esc(v.id)}"><i class="fa-solid fa-cart-plus"></i>Ajouter au panier</button>
          <button class="fav${fav ? " is-on" : ""}" type="button" data-fav="${K.esc(v.id)}" aria-pressed="${fav}" aria-label="${fav ? "Retirer des favoris" : "Ajouter aux favoris"}"><i class="fa-${fav ? "solid" : "regular"} fa-heart"></i></button>
          <a class="b b-wa" href="${K.waLink(`Bonjour KOZ SERVICES, je suis intéressé(e) par le ${name} (${v.year}) à ${K.fmt(v.price)} FCFA, fiche ${ref}. ${stock ? "Puis-je venir l'essayer ?" : "Quel est le délai ?"}`)}" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i>${stock ? "Réserver un essai sur WhatsApp" : "Commander sur WhatsApp"}</a>
          <a class="b full" href="services.html?prix=${v.price}#financement"><i class="fa-solid fa-calculator"></i>Simuler le financement</a>
        </div>
        <p class="note">Prix et disponibilité confirmés par KOZ SERVICES. Les photos peuvent être des photos d'illustration du modèle.</p>
      </div>
    </aside>
  </div>
  <section class="specs-sec" aria-labelledby="desc-t">
    <h2 id="desc-t">Description et fiche technique</h2>
    <p>${K.esc(v.description || "")}</p>
    ${specs.length ? `<dl class="specs">${specs.map(([k, val]) => `<div><dt>${K.esc(LABELS[k] || k)}</dt><dd>${K.esc(val)}</dd></div>`).join("")}</dl>` : ""}
  </section>`;

  // galerie
  $$("[data-img]").forEach((b) => b.addEventListener("click", () => {
    $$("[data-img]").forEach((x) => { x.classList.toggle("is-on", x === b); x.setAttribute("aria-selected", x === b); });
    $("#gMain").innerHTML = K.photoBox(v, "g-main", imgs[+b.dataset.img]);
    if (K.hasGsap()) gsap.from("#gMain .photo", { opacity: 0, scale: 1.03, duration: 0.5 });
  }));
  if (K.hasGsap()) {
    gsap.from(".gallery", { x: -30, opacity: 0, duration: 0.8, ease: "power3.out" });
    gsap.from(".sheet", { y: 24, opacity: 0, duration: 0.7, ease: "power3.out", delay: 0.1 });
  }

  /* ---------- 3. Véhicules similaires ---------- */
  const sim = K.DATA.filter((x) => x.id !== v.id && x.category === v.category)
    .sort((a, b) => Math.abs(a.price - v.price) - Math.abs(b.price - v.price)).slice(0, 3);
  if (sim.length) { $("#similar").innerHTML = sim.map((x) => K.card(x)).join(""); $("#similarSec").hidden = false; }
})();
