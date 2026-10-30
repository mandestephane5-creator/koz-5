/* Illustrations de véhicules (profil, vue de côté) pour la maquette.
   Dans le vrai site, elles seront remplacées par les photos des véhicules. */
(function () {
  const shade = (hex, p) => {
    const n = parseInt(hex.slice(1), 16);
    let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    const f = (c) => Math.max(0, Math.min(255, Math.round(p < 0 ? c * (1 + p) : c + (255 - c) * p)));
    return "#" + ((1 << 24) + (f(r) << 16) + (f(g) << 8) + f(b)).toString(16).slice(1);
  };

  // corps, vitres, roues (cx), rayon, feux
  const SHAPES = {
    suv: {
      body: "M24 122 L20 92 Q19 78 28 70 L44 34 Q48 27 58 27 L246 27 Q257 27 265 36 L301 73 L360 81 Q381 85 384 102 L385 122 L349 122 A39 39 0 0 0 271 122 L135 122 A39 39 0 0 0 57 122 Z",
      win: ["M54 70 L66 40 Q69 34 75 34 L166 34 L166 70 Z", "M174 34 L244 34 Q252 34 259 41 L290 72 L174 72 Z"],
      wheels: [96, 310], r: 31, belt: 80, door: [170], head: [362, 88], tail: [23, 82],
    },
    pickup: {
      body: "M22 122 L20 82 Q20 74 28 74 L150 74 L154 72 L176 42 Q180 37 190 37 L262 37 Q272 37 279 45 L306 76 L362 84 Q382 88 385 104 L386 122 L348 122 A37 37 0 0 0 274 122 L134 122 A37 37 0 0 0 60 122 Z",
      win: ["M168 74 L184 48 Q187 44 193 44 L222 44 L222 75 Z", "M230 44 L258 44 Q266 44 272 51 L294 76 L230 76 Z"],
      wheels: [97, 311], r: 29, belt: 80, door: [226], head: [364, 90], tail: [22, 84], bed: true,
    },
    berline: {
      body: "M22 120 L20 98 Q20 86 30 84 L70 80 L108 52 Q118 45 132 45 L236 45 Q250 45 262 53 L300 80 L362 88 Q382 92 384 106 L385 120 L347 120 A35 35 0 0 0 277 120 L131 120 A35 35 0 0 0 61 120 Z",
      win: ["M90 80 L118 57 Q124 52 134 52 L180 52 L180 81 Z", "M188 52 L234 52 Q246 52 256 59 L284 81 L188 81 Z"],
      wheels: [96, 312], r: 27, belt: 86, door: [184], head: [366, 94], tail: [22, 92],
    },
    van: {
      body: "M24 122 L22 40 Q22 24 38 24 L262 24 Q276 24 284 34 L322 76 L364 84 Q382 88 384 104 L385 122 L347 122 A37 37 0 0 0 273 122 L133 122 A37 37 0 0 0 59 122 Z",
      win: ["M36 34 L118 34 L118 70 L36 70 Z", "M126 34 L208 34 L208 70 L126 70 Z", "M216 34 L262 34 Q270 34 276 41 L306 76 L216 76 Z"],
      wheels: [96, 310], r: 29, belt: 80, door: [212, 122], head: [364, 90], tail: [23, 90],
    },
  };

  window.carSVG = function (type, color, opts = {}) {
    const s = SHAPES[type] || SHAPES.suv;
    const id = "c" + Math.random().toString(36).slice(2, 8);
    const light = shade(color, 0.35), dark = shade(color, -0.35), darker = shade(color, -0.55);
    const wheels = s.wheels.map((cx) => `
      <g>
        <circle cx="${cx}" cy="122" r="${s.r}" fill="#16181d"/>
        <circle cx="${cx}" cy="122" r="${s.r * 0.62}" fill="url(#rim${id})"/>
        <circle cx="${cx}" cy="122" r="${s.r * 0.62}" fill="none" stroke="#2a2d34" stroke-width="1.2"/>
        ${[0, 72, 144, 216, 288].map((a) => `<rect x="${cx - 2}" y="${122 - s.r * 0.58}" width="4" height="${s.r * 0.5}" rx="2" fill="#5d636e" transform="rotate(${a} ${cx} 122)"/>`).join("")}
        <circle cx="${cx}" cy="122" r="${s.r * 0.16}" fill="#9aa1ad"/>
      </g>`).join("");
    const bed = s.bed ? `<path d="M24 76 L150 76" stroke="${darker}" stroke-width="2"/><rect x="26" y="80" width="122" height="5" rx="2" fill="${dark}" opacity=".5"/>` : "";
    return `
<svg viewBox="0 0 400 165" xmlns="http://www.w3.org/2000/svg" class="car-svg" role="img" aria-label="${opts.label || "véhicule"}">
  <defs>
    <linearGradient id="b${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${light}"/><stop offset=".45" stop-color="${color}"/><stop offset="1" stop-color="${dark}"/>
    </linearGradient>
    <linearGradient id="w${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#3b4658"/><stop offset=".6" stop-color="#1b2230"/><stop offset="1" stop-color="#0e131c"/>
    </linearGradient>
    <radialGradient id="rim${id}"><stop offset="0" stop-color="#c9ced6"/><stop offset="1" stop-color="#6f7681"/></radialGradient>
    <radialGradient id="sh${id}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".28"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
  </defs>
  <ellipse cx="203" cy="150" rx="190" ry="11" fill="url(#sh${id})"/>
  <clipPath id="cl${id}"><rect x="0" y="0" width="400" height="122"/></clipPath>
  <g clip-path="url(#cl${id})">${s.wheels.map((cx) => `<circle cx="${cx}" cy="122" r="${s.r + 7}" fill="#0f1116"/>`).join("")}</g>
  <path d="${s.body}" fill="url(#b${id})" stroke="${darker}" stroke-width="1.2" stroke-linejoin="round"/>
  ${s.win.map((w) => `<path d="${w}" fill="url(#w${id})"/>`).join("")}
  ${s.win.map((w) => `<path d="${w}" fill="#fff" opacity=".08" transform="translate(4 -1) scale(.98)"/>`).join("")}
  <path d="M30 ${s.belt + 14} L378 ${s.belt + 18}" stroke="${light}" stroke-width="2" opacity=".55"/>
  ${s.door.map((x) => `<path d="M${x} ${s.belt - 6} L${x + 2} 118" stroke="${darker}" stroke-width="1.1" opacity=".7"/><rect x="${x + 10}" y="${s.belt + 2}" width="16" height="4" rx="2" fill="${darker}" opacity=".7"/>`).join("")}
  ${bed}
  <rect x="${s.head[0] - 8}" y="${s.head[1] - 4}" width="20" height="8" rx="4" fill="#fff6d6" stroke="${darker}" stroke-width=".8"/>
  <rect x="${s.tail[0] - 2}" y="${s.tail[1] - 4}" width="8" height="12" rx="3" fill="#d9363e"/>
  <path d="M30 118 L380 118" stroke="${darker}" stroke-width="3" opacity=".35"/>
  ${wheels}
</svg>`;
  };
})();
