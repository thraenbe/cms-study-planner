// Chart and explorer helpers shared by the Digital Circuit Design exercise pages (the lecture page keeps its own copy
// next to its lecture-specific charts). Charts are inline SVG drawn into <div data-chart="name"> by CHARTS[name](narrow)
// and redrawn when the width class changes; marks with class "pt" and a data-tip get a hover/focus tooltip.
window.DCDViz = (function () {
  const esc = CMSUtil.esc;
  const bin = (v, w) => (v >>> 0).toString(2).padStart(w, "0").slice(-w);
  const bits = (v, w) => Array.from({ length: w }, (_, i) => v >> (w - 1 - i) & 1);
  const fmtv = v => Object.is(v, -0) ? "−0" : v < 0 ? "−" + -v : String(v);
  const isNarrow = () => matchMedia("(max-width: 600px)").matches;
  const key = (s, kind = "") => `<span class="key ${kind}" style="--c:var(--vz-s${s})"></span>`;
  const leg = items => `<div class="legend">${items.map(([s, t, k]) => `<span class="li">${s ? key(s, k) : ""}<span class="lt">${t}</span></span>`).join("")}</div>`;
  const flag = (k, t) => `<span class="flag ${k}">${k === "ok" ? "✓" : "⚠"} ${t}</span>`;
  const barPath = (x0, w, top, base) => { const r = Math.min(4, w / 2, base - top); return `M${x0},${base} V${top + r} Q${x0},${top} ${x0 + r},${top} H${x0 + w - r} Q${x0 + w},${top} ${x0 + w},${top + r} V${base} Z`; };
  const tt = (hdr, rows, tint = {}) => `<table class="tt"><tr>${hdr.map(h => `<th>${h}</th>`).join("")}</tr>${rows.map(r => `<tr>${r.map((v, i) => `<td class="${[i >= hdr.length - 2 && v === 1 ? "one" : "", v === 1 && tint[i] || ""].join(" ").trim()}">${v}</td>`).join("")}</tr>`).join("")}</table>`;
  const CHARTS = {}, LABS = {};
  const chart = (name, legend = "") => `<figure class="viz">${legend}<div class="chart-wrap"><div data-chart="${name}"></div><div class="tip" role="tooltip"></div></div>`;
  const lab = (name, title) => `<div class="lab" data-lab="${name}"><div class="lab-h">Try it <b>${title}</b></div><div class="lab-body"></div></div>`;
  const place = (tip, wrap, x, y) => { tip.classList.add("show"); const half = tip.offsetWidth / 2; tip.style.left = Math.min(Math.max(x, half), wrap.clientWidth - half) + "px"; tip.style.top = y + "px"; };
  function mountCharts() {
    document.querySelectorAll("[data-chart]").forEach(el => {
      el.dataset.narrow = isNarrow(); el.innerHTML = CHARTS[el.dataset.chart](isNarrow());
      const wrap = el.parentElement, tip = wrap.querySelector(".tip"), svg = el.querySelector("svg");
      const show = g => { const a = (g.querySelector(".dot") || g.querySelector(".bar") || g).getBoundingClientRect(), w = wrap.getBoundingClientRect();
        tip.innerHTML = g.dataset.tip; g.classList.add("on"); svg.classList.add("hovering"); place(tip, wrap, a.left + a.width / 2 - w.left, a.top - w.top); };
      const hide = g => { g.classList.remove("on"); svg.classList.remove("hovering"); tip.classList.remove("show"); };
      el.querySelectorAll(".pt[data-tip]").forEach(g => { g.addEventListener("pointerenter", () => show(g)); g.addEventListener("focus", () => show(g));
        g.addEventListener("pointerleave", () => hide(g)); g.addEventListener("blur", () => hide(g)); });
    });
  }
  const mountLabs = () => document.querySelectorAll("[data-lab]").forEach(el => LABS[el.dataset.lab](el.querySelector(".lab-body")));
  addEventListener("resize", () => { if ([...document.querySelectorAll("[data-chart]")].some(d => d.dataset.narrow !== String(isNarrow()))) mountCharts(); });
  return { esc, bin, bits, fmtv, isNarrow, key, leg, flag, barPath, tt, CHARTS, LABS, chart, lab, place, mountCharts, mountLabs };
})();
