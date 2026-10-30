/* KOZ SERVICES — page Contact : formulaire vers WhatsApp */
(function () {
  "use strict";
  const K = window.KOZ, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const form = $("#contactForm");

  function check(id, ok) {
    const el = $("#" + id), err = $(`.err[data-for="${id}"]`);
    el.classList.toggle("is-bad", !ok);
    el.setAttribute("aria-invalid", !ok);
    if (err) { err.classList.toggle("is-on", !ok); if (!ok) { err.id = "err-" + id; el.setAttribute("aria-describedby", err.id); } }
    return ok;
  }
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const prenom = $("#prenom").value.trim(), tel = $("#tel").value.replace(/\D/g, ""), msg = $("#message").value.trim();
    const ok = [check("prenom", !!prenom), check("tel", tel.length === 8), check("message", msg.length > 2)];
    if (ok.includes(false)) {
      const bad = form.querySelector(".is-bad");
      bad && bad.focus();
      if (K.hasGsap()) gsap.fromTo(form, { x: -8 }, { x: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
      return;
    }
    const sujet = form.querySelector('input[name="sujet"]:checked').value;
    const nom = $("#nom").value.trim(), veh = $("#vehicule").value.trim();
    const text = `Bonjour KOZ SERVICES,\nSujet : ${sujet}\nNom : ${prenom}${nom ? " " + nom : ""}\nTéléphone : +226 ${tel.replace(/(\d{2})(?=\d)/g, "$1 ")}${veh ? "\nVéhicule recherché : " + veh : ""}\n\n${msg}`;
    window.open(K.waLink(text), "_blank", "noopener");
    K.toast("WhatsApp s'ouvre avec votre message");
  });
  ["prenom", "tel", "message"].forEach((id) => $("#" + id).addEventListener("input", () => {
    if ($("#" + id).classList.contains("is-bad")) check(id, id === "tel" ? $("#tel").value.replace(/\D/g, "").length === 8 : !!$("#" + id).value.trim());
  }));

  // préremplir le sujet depuis un lien (?sujet=Financement)
  const s = new URLSearchParams(location.search).get("sujet");
  if (s) $$('input[name="sujet"]').forEach((r) => (r.checked = r.value === s));

  // ouverture douce des questions fréquentes
  if (K.hasGsap()) $$(".q").forEach((d) => d.addEventListener("toggle", () => { if (d.open) gsap.from($(".a", d), { opacity: 0, y: -8, duration: 0.35 }); }));
})();
