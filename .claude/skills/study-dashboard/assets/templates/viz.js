// Shared chart and explorer helpers of the __NAME__ pages (lecture and exercise write-ups).
// Colour roles: categorical slots 1-4 from the dataviz palette set on each page (--vz-s1 … --vz-s4), gray for reference marks.
// Text stays in ink; colour sits on marks, swatches, underlines and tinted cells.
window.__NS__Viz = (function () {
  const esc = __NS__.esc;
  const isNarrow = () => matchMedia("(max-width: 600px)").matches;
  const key = (s, kind = "") => `<span class="key ${kind}" style="--c:${s === "g" ? "var(--vz-gray)" : `var(--vz-s${s})`}"></span>`;
  const leg = items => `<div class="legend">${items.map(([s, t, k]) => `<span class="li">${s ? key(s, k) : ""}<span class="lt">${t}</span></span>`).join("")}</div>`;
  const flag = (k, t) => `<span class="flag ${k}">${k === "ok" ? "✓" : "⚠"} ${t}</span>`;
  const hbar = (x0, x1, y0, h) => { const r = Math.min(4, (x1 - x0) / 2, h / 2); return `M${x0},${y0} H${x1 - r} Q${x1},${y0} ${x1},${y0 + r} V${y0 + h - r} Q${x1},${y0 + h} ${x1 - r},${y0 + h} H${x0} Z`; };
  const vbar = (x0, w, top, base) => { const r = Math.min(4, w / 2, Math.max(0, base - top)); return `M${x0},${base} V${top + r} Q${x0},${top} ${x0 + r},${top} H${x0 + w - r} Q${x0 + w},${top} ${x0 + w},${top + r} V${base} Z`; };
  const num = (v, d = 2) => v.toLocaleString("en-GB", { maximumFractionDigits: d });
  const pct = v => num(v * 100, 1) + " %";
  const col = s => `var(--vz-${s.slot ? "s" + s.slot : "gray"})`;
  const CHARTS = {}, LINES = {};
  const place = (tip, wrap, x, y) => { tip.classList.add("show"); const half = tip.offsetWidth / 2; tip.style.left = Math.min(Math.max(x, half), wrap.clientWidth - half) + "px"; tip.style.top = y + "px"; };
  const chart = (name, legend = "") => `<figure class="viz">${legend}<div class="chart-wrap"><div data-chart="${name}"></div><div class="tip" role="tooltip"></div></div>`;
  const lab = (name, title) => `<div class="lab" data-lab="${name}"><div class="lab-h">Try it <b>${title}</b></div><div class="lab-body"></div></div>`;

  // Line charts on a log₂ x axis (PEs or instructions): series are functions, direct labels sit at the right end
  // (or at labelAt), and a crosshair snaps to whole numbers and lists every series in the tooltip.
  function lineGeo(cfg, narrow) {
    const W = narrow ? 340 : 600, H = narrow ? 240 : 260, L = narrow ? 34 : 40, R = narrow ? 14 : cfg.labelW || 96, T = 24, B = 30;
    const PW = W - L - R, PH = H - T - B, lg = Math.log2, [x0, x1] = cfg.x, [y0, y1] = cfg.y;
    return { W, H, L, R, T, B, PW, PH,
      x: v => L + (lg(v) - lg(x0)) / (lg(x1) - lg(x0)) * PW,
      y: v => T + PH - (v - y0) / (y1 - y0) * PH,
      inv: px => 2 ** (lg(x0) + Math.min(1, Math.max(0, (px - L) / PW)) * (lg(x1) - lg(x0))) };
  }
  function lineSVG(name, narrow) {
    const cfg = LINES[name], g = lineGeo(cfg, narrow), { W, H, L, R, T, PW, PH, x, y } = g;
    const xt = (narrow && cfg.xTicksN || cfg.xTicks).map(v => `<line class="grid" x1="${x(v)}" x2="${x(v)}" y1="${T}" y2="${T + PH}"/><text class="tick" x="${x(v)}" y="${H - 10}" text-anchor="middle">${v.toLocaleString("en-GB")}</text>`).join("");
    const yt = cfg.yTicks.map(v => `<line class="${v === cfg.y[0] ? "axis" : "grid"}" x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}"/><text class="tick" x="${L - 6}" y="${y(v) + 4}" text-anchor="end">${v}</text>`).join("");
    const sx = Array.from({ length: 241 }, (_, k) => cfg.x[0] * (cfg.x[1] / cfg.x[0]) ** (k / 240));
    const d = f => "M" + sx.map(v => `${x(v).toFixed(1)},${y(f(v)).toFixed(1)}`).join(" L");
    const lines = cfg.series.map(s => `<path class="line${s.dash ? " dash" : ""}" style="stroke:${col(s)}" d="${d(s.f)}"/>`).join("");
    const lbl = s => { const at = s.labelAt || cfg.x[1], X = x(at), Y = y(Math.min(s.f(at), cfg.y[1])) + (s.dy || 0);
      return at === cfg.x[1] ? `<text class="lbl" x="${X + 6}" y="${Y + 4}">${s.short || s.name}</text>` : `<text class="lbl" x="${X - 6}" y="${Y}" text-anchor="end">${s.short || s.name}</text>`; };
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(cfg.aria)}">
      <defs><clipPath id="clip-${name}"><rect x="${L}" y="${T - 3}" width="${PW + 3}" height="${PH + 3}"/></clipPath></defs>
      ${yt}${xt}<text class="note" x="${L - 30}" y="12">${cfg.yTitle}</text>
      <g clip-path="url(#clip-${name})">${lines}</g>${cfg.extra ? cfg.extra(g, narrow) : ""}${narrow ? "" : cfg.series.map(lbl).join("")}
      <g class="xh-layer" style="display:none"><line class="xh" y1="${T}" y2="${T + PH}"/>${cfg.series.map(s => `<circle class="dot" style="fill:${col(s)}" r="4.5"/>`).join("")}</g>
      <rect class="hit plot" x="${L}" y="${T}" width="${PW}" height="${PH}" tabindex="0" aria-label="${esc(cfg.hitLabel)}"/></svg>`;
  }
  const line = (name, cfg) => { LINES[name] = cfg; CHARTS[name] = narrow => lineSVG(name, narrow); };
  function wireLines() {
    document.querySelectorAll("[data-chart]").forEach(el => {
      const cfg = LINES[el.dataset.chart]; if (!cfg) return;
      const g = lineGeo(cfg, el.dataset.narrow === "true"), svg = el.querySelector("svg"), wrap = el.parentElement, tip = wrap.querySelector(".tip");
      const layer = svg.querySelector(".xh-layer"), [ln, ...dots] = layer.children, hit = svg.querySelector(".plot");
      const at = raw => {
        const v = Math.min(cfg.x[1], Math.max(cfg.x[0], Math.round(raw))), X = g.x(v), ys = cfg.series.map(s => s.f(v));
        layer.style.display = ""; ln.setAttribute("x1", X); ln.setAttribute("x2", X); hit.dataset.v = v;
        dots.forEach((dt, i) => { dt.setAttribute("cx", X); dt.setAttribute("cy", g.y(Math.min(ys[i], cfg.y[1]))); dt.style.display = ys[i] > cfg.y[1] ? "none" : ""; });
        const order = ys.map((_, i) => i).sort((a, b) => ys[b] - ys[a]);
        tip.innerHTML = `<b>${cfg.tipHead(v)}</b>${order.map(i => `<span class="trow"><i style="--c:${col(cfg.series[i])}"></i><strong>${cfg.fmtY(ys[i])}</strong> ${cfg.series[i].name}</span>`).join("")}`;
        const s = svg.getBoundingClientRect(), w = wrap.getBoundingClientRect(), top = Math.min(...dots.filter(dt => dt.style.display !== "none").map(dt => dt.getBoundingClientRect().top));
        place(tip, wrap, s.left - w.left + X / g.W * s.width, top - w.top);
      };
      const off = () => { layer.style.display = "none"; tip.classList.remove("show"); };
      hit.addEventListener("pointermove", e => { const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(svg.getScreenCTM().inverse()); at(g.inv(p.x)); });
      hit.addEventListener("pointerleave", off); hit.addEventListener("blur", off); hit.addEventListener("focus", () => at(cfg.focusAt || 16));
      hit.addEventListener("keydown", e => { const v = +hit.dataset.v, lg = Math.log2(v);
        const nv = { ArrowRight: 2 ** (Math.floor(lg + 1e-9) + 1), ArrowLeft: 2 ** (Math.ceil(lg - 1e-9) - 1) }[e.key]; if (!nv) return; e.preventDefault(); at(Math.min(cfg.x[1], Math.max(cfg.x[0], nv))); });
    });
  }
  // Charts by name: <div data-chart="name"> is filled with CHARTS[name](narrow) and redrawn when the width class changes.
  function mountCharts() {
    document.querySelectorAll("[data-chart]").forEach(el => {
      el.dataset.narrow = isNarrow(); el.innerHTML = CHARTS[el.dataset.chart](isNarrow());
      const wrap = el.parentElement, tip = wrap.querySelector(".tip"), svg = el.querySelector("svg");
      const show = g => { const a = (g.querySelector(".dot") || g.querySelector(".bar.s1") || g.querySelector(".bar") || g).getBoundingClientRect(), w = wrap.getBoundingClientRect();
        tip.innerHTML = g.dataset.tip; g.classList.add("on"); svg.classList.add("hovering"); place(tip, wrap, a.left + a.width / 2 - w.left, a.top - w.top); };
      const hide = g => { g.classList.remove("on"); svg.classList.remove("hovering"); tip.classList.remove("show"); };
      el.querySelectorAll(".pt[data-tip]").forEach(g => { g.addEventListener("pointerenter", () => show(g)); g.addEventListener("focus", () => show(g));
        g.addEventListener("pointerleave", () => hide(g)); g.addEventListener("blur", () => hide(g)); });
    });
    wireLines();
  }


  return { key, leg, flag, hbar, vbar, num, pct, col, CHARTS, LINES, place, chart, lab, lineGeo, lineSVG, line, wireLines, mountCharts, isNarrow };
})();
