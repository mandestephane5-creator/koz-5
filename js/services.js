/* KOZ SERVICES — page Services : simulateur de financement, animations */
(function () {
  "use strict";
  const K = window.KOZ, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const RATE = 0.08; // taux annuel indicatif

  const price = $("#simPrice"), down = $("#simDown");
  const qp = +new URLSearchParams(location.search).get("prix");
  if (qp) price.value = Math.min(+price.max, Math.max(+price.min, qp));

  let shown = 0;
  function calc() {
    const P = +price.value, d = +down.value, n = +$('input[name="dur"]:checked').value;
    const apport = Math.round(P * d / 100), loan = P - apport, r = RATE / 12;
    const monthly = Math.round(loan * r / (1 - Math.pow(1 + r, -n)) / 100) * 100;
    $("#simPriceOut").textContent = K.fmt(P) + " FCFA";
    $("#simDownOut").textContent = `${d} %`;
    $("#simDownAmt").textContent = K.fmt(apport) + " FCFA";
    $("#simLoan").textContent = K.fmt(loan) + " FCFA";
    $("#simDur").textContent = n + " mois";
    price.style.setProperty("--p", ((P - price.min) / (price.max - price.min)) * 100 + "%");
    down.style.setProperty("--p", ((d - down.min) / (down.max - down.min)) * 100 + "%");
    // le montant défile comme un compteur
    const out = $("#simMonthly");
    if (K.hasGsap()) {
      const o = { v: shown };
      gsap.to(o, { v: monthly, duration: 0.6, ease: "power2.out", onUpdate: () => (out.textContent = K.fmt(Math.round(o.v / 100) * 100)) });
    } else out.textContent = K.fmt(monthly);
    shown = monthly;
    $("#simSend").href = K.waLink(`Bonjour KOZ SERVICES, j'ai fait une simulation de financement :\n- Prix du véhicule : ${K.fmt(P)} FCFA\n- Apport : ${d} % (${K.fmt(apport)} FCFA)\n- Durée : ${n} mois\n- Mensualité estimée : ${K.fmt(monthly)} FCFA\nPouvez-vous me faire une proposition ?`);
  }
  [price, down].forEach((el) => el.addEventListener("input", calc));
  $$('input[name="dur"]').forEach((el) => el.addEventListener("change", calc));
  calc();

  /* ---------- Guide d'inspection : liste à cocher gardée sur le téléphone ---------- */
  const boxes = $$("#guide input"), count = $("#guideCount"), send = $("#guideSend");
  const saved = K.store.get("koz_checklist", []);
  boxes.forEach((b) => (b.checked = saved.includes(b.value)));
  function syncGuide(e) {
    const done = boxes.filter((b) => b.checked).map((b) => b.value), todo = boxes.filter((b) => !b.checked).map((b) => b.value);
    K.store.set("koz_checklist", done);
    count.textContent = `${done.length} / ${boxes.length} points vérifiés`;
    send.href = K.waLink(`Bonjour KOZ SERVICES, j'ai commencé l'inspection d'un véhicule.\nVérifié : ${done.join(", ") || "rien encore"}\nReste à vérifier : ${todo.join(", ") || "rien"}\nPouvez-vous m'aider ?`);
    if (e && done.length === boxes.length) K.toast("Les 9 points sont vérifiés");
  }
  boxes.forEach((b) => b.addEventListener("change", syncGuide));
  $("#guideReset").addEventListener("click", () => { boxes.forEach((b) => (b.checked = false)); syncGuide(); });
  syncGuide();

  // les photos se dévoilent comme un rideau
  if (K.hasGsap() && window.ScrollTrigger) {
    $$("[data-curtain]").forEach((img) => {
      gsap.fromTo(img, { clipPath: "inset(0 100% 0 0)", scale: 1.1 }, { clipPath: "inset(0 0% 0 0)", scale: 1, duration: 1.2, ease: "power3.inOut",
        scrollTrigger: { trigger: img.parentNode, start: "top 80%", once: true } });
    });
  }
})();
