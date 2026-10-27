// Chart helpers of the Research Project pages (paper write-ups): SVG charts by name, hover and focus tooltips,
// legends and table views. Colour roles come from each page's --vz-* variables (dataviz palette: slot 1 blue,
// slot 2 orange, slot 3 aqua, gray for reference marks, one blue ramp for magnitude). Text stays in ink.
window.RPViz = (function () {
  const esc = RP.esc;
  const isNarrow = () => matchMedia("(max-width: 600px)").matches;
  const num = (v, d = 0) => v.toLocaleString("en-GB", { maximumFractionDigits: d });
  const key = (s, kind = "") => `<span class="key ${kind}" style="--c:${s === "g" ? "var(--vz-gray)" : s === "ring" ? "transparent" : `var(--vz-s${s})`}"></span>`;
  const leg = items => `<div class="legend">${items.map(([s, t, k]) => `<span class="li">${s ? key(s, k) : ""}<span class="lt">${t}</span></span>`).join("")}</div>`;
  const hbar = (x0, x1, y0, h) => { const r = Math.min(4, Math.abs(x1 - x0) / 2, h / 2); return x1 <= x0 ? "" : `M${x0},${y0} H${x1 - r} Q${x1},${y0} ${x1},${y0 + r} V${y0 + h - r} Q${x1},${y0 + h} ${x1 - r},${y0 + h} H${x0} Z`; };
  const vbar = (x0, w, y0, y1) => { const r = Math.min(4, w / 2, (y1 - y0) / 2); return y1 <= y0 ? "" : `M${x0},${y1} V${y0 + r} Q${x0},${y0} ${x0 + r},${y0} H${x0 + w - r} Q${x0 + w},${y0} ${x0 + w},${y0 + r} V${y1} Z`; };
  // Five validated ramp steps per mode (set on the page as --vz-r1 … --vz-r5, light = low); zero is the surface.
  const ramp = step => step ? `var(--vz-r${step})` : "var(--surface)";
  const inkOn = step => step === 0 ? "mute" : (document.documentElement.dataset.theme === "dark" || (!document.documentElement.dataset.theme && matchMedia("(prefers-color-scheme: dark)").matches)) ? (step >= 3 ? "dark" : "light") : (step >= 3 ? "light" : "dark");
  const CHARTS = {};
  const place = (tip, wrap, x, y) => { tip.classList.add("show"); const half = tip.offsetWidth / 2; tip.style.left = Math.min(Math.max(x, half), wrap.clientWidth - half) + "px"; tip.style.top = y + "px"; };
  const chart = (name, legend = "", extra = "", caption = "") => `<figure class="viz" data-fig="${name}">${extra}${legend}<div class="chart-wrap"><div data-chart="${name}"></div><div class="tip" role="tooltip"></div></div>${caption ? `<figcaption>${caption}</figcaption>` : ""}</figure>`;
  const tbl = (summary, head, rows) => `<details class="tbl"><summary>${summary}</summary><div class="tw"><table><thead><tr>${head.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map(r => `<tr class="${r.sum ? "sum" : ""}">${r.cells.map((c, i) => `<td class="${i ? "n" : ""}">${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div></details>`;

  // <div data-chart="name"> is filled with CHARTS[name](narrow) and redrawn when the width class or theme changes;
  // every .pt[data-tip] gets a hover/focus tooltip anchored on its mark.
  function mount(el) {
    const name = el.dataset.chart; if (!CHARTS[name]) return;
    el.dataset.narrow = isNarrow(); el.innerHTML = CHARTS[name](isNarrow());
    const wrap = el.parentElement, tip = wrap.querySelector(".tip"), svg = el.querySelector("svg");
    const show = g => { const a = (g.querySelector(".anchor") || g).getBoundingClientRect(), w = wrap.getBoundingClientRect();
      tip.innerHTML = g.dataset.tip; g.classList.add("on"); place(tip, wrap, a.left + a.width / 2 - w.left, a.top - w.top); };
    const hide = g => { g.classList.remove("on"); tip.classList.remove("show"); };
    el.querySelectorAll(".pt[data-tip]").forEach(g => { g.addEventListener("pointerenter", () => show(g)); g.addEventListener("focus", () => show(g));
      g.addEventListener("pointerleave", () => hide(g)); g.addEventListener("blur", () => hide(g)); });
    if (svg) svg.addEventListener("pointerleave", () => tip.classList.remove("show"));
  }
  function mountCharts() { document.querySelectorAll("[data-chart]").forEach(mount); }
  function watch() {
    const mq = matchMedia("(max-width: 600px)"), dk = matchMedia("(prefers-color-scheme: dark)");
    const redraw = () => document.querySelectorAll("[data-chart]").forEach(mount);
    mq.addEventListener("change", redraw); dk.addEventListener("change", redraw);
    new MutationObserver(redraw).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  }
  return { esc, isNarrow, num, key, leg, hbar, vbar, ramp, inkOn, CHARTS, chart, tbl, mount, mountCharts, watch };
})();
