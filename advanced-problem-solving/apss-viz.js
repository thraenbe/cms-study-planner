// Chart and explorer helpers shared by the Advanced Problem Solving and Search write-up pages (lecture.html,
// exercise.html). Charts are functions of `narrow` (phone width) that return an <svg viewBox …> string; CHARTS[name]
// is mounted into <div data-chart="name">, LINES holds the line-chart configs, labs are <div data-lab="name">.
window.APSSViz = (function () {
  const esc = APSS.esc;
  const isNarrow = () => matchMedia("(max-width: 600px)").matches;
  // ---------------- Shared chart and explorer helpers (as on the other course boards) ----------------
  // Colour roles: categorical slots 1-4 from the palette above, gray for reference marks and unvisited nodes.
  // Text stays in ink; colour sits on marks, swatches, underlines and tinted cells.
  const key = (s, kind = "") => `<span class="key ${kind}" style="--c:${s === "g" ? "var(--vz-gray)" : `var(--vz-s${s})`}"></span>`;
  const leg = items => `<div class="legend">${items.map(([s, t, k]) => `<span class="li">${s ? key(s, k) : ""}<span class="lt">${t}</span></span>`).join("")}</div>`;
  const flag = (k, t) => `<span class="flag ${k}">${k === "ok" ? "✓" : "⚠"} ${t}</span>`;
  const hbar = (x0, x1, y0, h) => { const r = Math.min(4, (x1 - x0) / 2, h / 2); return `M${x0},${y0} H${x1 - r} Q${x1},${y0} ${x1},${y0 + r} V${y0 + h - r} Q${x1},${y0 + h} ${x1 - r},${y0 + h} H${x0} Z`; };
  const vbar = (x0, w, y0, y1) => { const r = Math.min(4, w / 2, Math.max(0, (y1 - y0) / 2)); return `M${x0},${y1} V${y0 + r} Q${x0},${y0} ${x0 + r},${y0} H${x0 + w - r} Q${x0 + w},${y0} ${x0 + w},${y0 + r} V${y1} Z`; };
  const num = (v, d = 2) => v.toLocaleString("en-GB", { maximumFractionDigits: d });
  const sci = v => { if (v < 1e6) return num(v, 0); const e = Math.floor(Math.log10(v)); return `${num(v / 10 ** e, 2)} × 10<tspan dy="-5" font-size="9">${e}</tspan>`; };
  const sciH = v => { if (v < 1e6) return num(v, 0); const e = Math.floor(Math.log10(v)); return `${num(v / 10 ** e, 2)} × 10<sup>${e}</sup>`; };
  const col = s => `var(--vz-${s.slot ? "s" + s.slot : "gray"})`;
  const CHARTS = {}, LINES = {};
  const place = (tip, wrap, x, y) => { tip.classList.add("show"); const half = tip.offsetWidth / 2; tip.style.left = Math.min(Math.max(x, half), wrap.clientWidth - half) + "px"; tip.style.top = y + "px"; };
  const chart = (name, legend = "") => `<figure class="viz">${legend}<div class="chart-wrap"><div data-chart="${name}"></div><div class="tip" role="tooltip"></div></div>`;
  const lab = (name, title) => `<div class="lab" data-lab="${name}"><div class="lab-h">Try it <b>${title}</b></div><div class="lab-body"></div></div>`;
  const stepBar = (n, label) => `<div class="steps"><button class="preset" data-s="reset">↺ Reset</button><button class="preset" data-s="prev">← Back</button><button class="preset" data-s="next">Step →</button><button class="preset" data-s="end">⇥ Run to end</button><span class="scount">step <output>0</output> of ${n}${label ? ` · ${label}` : ""}</span></div>`;
  // Wires reset/back/step/end buttons to a state {i, n} and a render() callback.
  function wireSteps(body, st, render) {
    body.querySelectorAll("[data-s]").forEach(b => b.addEventListener("click", () => {
      const k = b.dataset.s; st.i = k === "reset" ? 0 : k === "prev" ? Math.max(0, st.i - 1) : k === "next" ? Math.min(st.n, st.i + 1) : st.n; render(); }));
  }

  // Line charts on a linear x axis; y linear or log10. Series are functions of x; direct labels at the right end,
  // a crosshair snaps to whole x and lists every series in the tooltip.
  function lineGeo(cfg, narrow) {
    const W = narrow ? 340 : 600, H = narrow ? 240 : 260, L = narrow ? 40 : 48, R = narrow ? 14 : cfg.labelW || 96, T = 24, B = 30;
    const PW = W - L - R, PH = H - T - B, [x0, x1] = cfg.x, [y0, y1] = cfg.y, ty = v => cfg.log ? Math.log10(v) : v;
    return { W, H, L, R, T, B, PW, PH, x: v => L + (v - x0) / (x1 - x0) * PW, y: v => T + PH - (ty(v) - ty(y0)) / (ty(y1) - ty(y0)) * PH,
      inv: px => x0 + Math.min(1, Math.max(0, (px - L) / PW)) * (x1 - x0) };
  }
  function lineSVG(name, narrow) {
    const cfg = LINES[name], g = lineGeo(cfg, narrow), { W, H, L, R, T, PW, PH, x, y } = g;
    const xt = (narrow && cfg.xTicksN || cfg.xTicks).map(v => `<line class="grid" x1="${x(v)}" x2="${x(v)}" y1="${T}" y2="${T + PH}"/><text class="tick" x="${x(v)}" y="${H - 10}" text-anchor="middle">${v}</text>`).join("");
    const yt = cfg.yTicks.map(v => `<line class="${v === cfg.y[0] ? "axis" : "grid"}" x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}"/><text class="tick" x="${L - 6}" y="${y(v) + 4}" text-anchor="end">${cfg.fmtTick ? cfg.fmtTick(v) : v}</text>`).join("");
    const n = 200, sx = Array.from({ length: n + 1 }, (_, k) => cfg.x[0] + (cfg.x[1] - cfg.x[0]) * k / n);
    const d = f => "M" + sx.map(v => `${x(v).toFixed(1)},${Math.max(T - 2, y(Math.min(f(v), cfg.y[1] * 10))).toFixed(1)}`).join(" L");
    const lines = cfg.series.map(s => `<path class="line${s.dash ? " dash" : ""}" style="stroke:${col(s)}" d="${d(s.f)}"/>`).join("");
    const lbl = s => { const at = s.labelAt || cfg.x[1], X = x(at), Y = y(Math.min(s.f(at), cfg.y[1])) + (s.dy || 0);
      return at === cfg.x[1] ? `<text class="lbl" x="${X + 6}" y="${Y + 4}">${s.short || s.name}</text>` : `<text class="lbl" x="${X - 6}" y="${Y}" text-anchor="end">${s.short || s.name}</text>`; };
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(cfg.aria)}">
      <defs><clipPath id="clip-${name}"><rect x="${L}" y="${T - 3}" width="${PW + 3}" height="${PH + 3}"/></clipPath></defs>
      ${yt}${xt}<text class="note" x="${L - 36}" y="12">${cfg.yTitle}</text><text class="note" x="${W - R}" y="${H - 10}" text-anchor="end">${cfg.xTitle || ""}</text>
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
        dots.forEach((dt, i) => { dt.setAttribute("cx", X); dt.setAttribute("cy", g.y(Math.min(ys[i], cfg.y[1]))); dt.style.display = ys[i] > cfg.y[1] || ys[i] < cfg.y[0] ? "none" : ""; });
        const order = ys.map((_, i) => i).sort((a, b) => ys[b] - ys[a]);
        tip.innerHTML = `<b>${cfg.tipHead(v)}</b>${order.map(i => `<span class="trow"><i style="--c:${col(cfg.series[i])}"></i><strong>${cfg.fmtY(ys[i])}</strong> ${cfg.series[i].name}</span>`).join("")}`;
        const s = svg.getBoundingClientRect(), w = wrap.getBoundingClientRect(), vis = dots.filter(dt => dt.style.display !== "none");
        const top = vis.length ? Math.min(...vis.map(dt => dt.getBoundingClientRect().top)) : s.top + g.T / g.H * s.height;
        place(tip, wrap, s.left - w.left + X / g.W * s.width, top - w.top);
      };
      const off = () => { layer.style.display = "none"; tip.classList.remove("show"); };
      hit.addEventListener("pointermove", e => { const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(svg.getScreenCTM().inverse()); at(g.inv(p.x)); });
      hit.addEventListener("pointerleave", off); hit.addEventListener("blur", off); hit.addEventListener("focus", () => at(cfg.focusAt || cfg.x[0]));
      hit.addEventListener("keydown", e => { const v = +hit.dataset.v; const nv = { ArrowRight: v + 1, ArrowLeft: v - 1 }[e.key]; if (nv === undefined) return; e.preventDefault(); at(Math.min(cfg.x[1], Math.max(cfg.x[0], nv))); });
    });
  }
  // Grouped vertical bars: cats on x, one bar per series, optional log y. Each group is a hover target.
  function vbars(name, cfg) {
    CHARTS[name] = narrow => {
      const W = narrow ? 340 : 600, H = narrow ? 230 : 250, L = narrow ? 44 : 56, R = 12, T = 18, B = 34, PW = W - L - R, PH = H - T - B;
      const [y0, y1] = cfg.y, ty = v => cfg.log ? Math.log10(v) : v, y = v => T + PH - (ty(Math.max(v, y0)) - ty(y0)) / (ty(y1) - ty(y0)) * PH;
      const n = cfg.cats.length, gw = PW / n, k = cfg.series.length, bw = Math.min(28, (gw * 0.7) / k), pad = (gw - bw * k) / 2;
      const yt = cfg.yTicks.map(v => `<line class="${v === y0 ? "axis" : "grid"}" x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}"/><text class="tick" x="${L - 6}" y="${y(v) + 4}" text-anchor="end">${cfg.fmtTick ? cfg.fmtTick(v) : v}</text>`).join("");
      const groups = cfg.cats.map((cat, i) => {
        const x0 = L + i * gw, vals = cfg.series.map(s => s.vals[i]);
        const bars = cfg.series.map((s, j) => `<path class="bar" style="fill:${col(s)}" d="${vbar(x0 + pad + j * bw + 1, bw - 2, y(vals[j]), T + PH)}"/>`).join("");
        const tip = `<b>${cfg.tipHead(cat, i)}</b>${cfg.series.map((s, j) => `<span class="trow"><i style="--c:${col(s)}"></i><strong>${cfg.fmtY(vals[j])}</strong> ${s.name}</span>`).join("")}`;
        return `<g class="pt" tabindex="0" data-tip="${esc(tip)}"><rect class="hit anchor" x="${x0}" y="${T}" width="${gw}" height="${PH}"/>${bars}<text class="tick" x="${x0 + gw / 2}" y="${H - 12}" text-anchor="middle">${cat}</text></g>`; }).join("");
      return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(cfg.aria)}">${yt}<text class="note" x="${L - 44}" y="11">${cfg.yTitle}</text>${groups}</svg>`;
    };
  }
  // Charts by name: <div data-chart="name"> is filled with CHARTS[name](narrow) and redrawn when the width class changes.
  function mountCharts() {
    document.querySelectorAll("[data-chart]").forEach(el => {
      el.dataset.narrow = isNarrow(); el.innerHTML = CHARTS[el.dataset.chart](isNarrow());
      const wrap = el.parentElement, tip = wrap.querySelector(".tip"), svg = el.querySelector("svg");
      const show = g => { const a = (g.querySelector(".anchor") || g.querySelector(".dot") || g.querySelector(".bar") || g).getBoundingClientRect(), w = wrap.getBoundingClientRect();
        tip.innerHTML = g.dataset.tip; g.classList.add("on"); svg.classList.add("hovering"); place(tip, wrap, a.left + a.width / 2 - w.left, a.top - w.top); };
      const hide = g => { g.classList.remove("on"); svg.classList.remove("hovering"); tip.classList.remove("show"); };
      el.querySelectorAll(".pt[data-tip]").forEach(g => { g.addEventListener("pointerenter", () => show(g)); g.addEventListener("focus", () => show(g));
        g.addEventListener("pointerleave", () => hide(g)); g.addEventListener("blur", () => hide(g)); });
    });
    wireLines();
  }
  // A node in a search drawing: circle + letter, state class decides the colour (legend + ring, never colour alone).
  const nodeSVG = (x, y, label, cls = "", r = 13, extra = "") => `<g class="node ${cls}" transform="translate(${x},${y})">${extra}<circle r="${r}"/><text y="4">${label}</text></g>`;
  // Complete binary tree of `depth` levels (0..depth) with letters A, B, C … laid out in a W×H box.
  function binTree(depth, W, H, top = 22) {
    const nodes = [], edges = [], N = 2 ** (depth + 1) - 1, rowH = (H - top - 20) / depth;
    for (let i = 0; i < N; i++) {
      const lv = Math.floor(Math.log2(i + 1)), pos = i + 1 - 2 ** lv, cnt = 2 ** lv;
      nodes.push({ id: i, label: String.fromCharCode(65 + i), depth: lv, x: W * (pos + 0.5) / cnt, y: top + lv * rowH, parent: i ? Math.floor((i - 1) / 2) : null, kids: 2 * i + 1 < N ? [2 * i + 1, 2 * i + 2] : [] });
      if (i) edges.push([Math.floor((i - 1) / 2), i]);
    }
    return { nodes, edges };
  }

  // ---------------- Local search helpers (lecture 3, tutorial 2) ----------------
  // Seeded PRNG (mulberry32) so an explorer replays the same run after a reset or a resize.
  const rng = seed => { let a = seed >>> 0; return () => { a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };
  // Acceptance probability of the stochastic hill-climber: p = 1 / (1 + e^((eval(vc) − eval(vn)) / T)), maximising eval.
  const accept = (delta, T) => 1 / (1 + Math.exp(delta / T));
  // GSAT on a CNF: clauses are [[var, wantTrue], …], an assignment is an array of booleans (index 0 = x1).
  const unsat = (clauses, a) => clauses.filter(cl => cl.every(([v, want]) => a[v - 1] !== want)).length;
  // One GSAT step: every single flip with its unsat count; the chosen flip is the largest decrease, ties by `tie`:
  // "low" = lowest variable index, "fresh" = lowest index that does not undo the previous flip, "rnd" = seeded random.
  function gsatStep(clauses, a, tie = "fresh", prev = -1, rand = Math.random) {
    const flips = a.map((_, i) => { const b = a.slice(); b[i] = !b[i]; return { i, a: b, u: unsat(clauses, b) }; });
    const best = Math.min(...flips.map(f => f.u));
    let cands = flips.filter(f => f.u === best);
    if (tie === "fresh" && cands.length > 1 && cands.some(f => f.i !== prev)) cands = cands.filter(f => f.i !== prev);
    const pick = tie === "rnd" ? cands[Math.floor(rand() * cands.length)] : cands[0];
    return { flips, pick, best };
  }
  return { rng, accept, unsat, gsatStep, isNarrow, key, leg, flag, hbar, vbar, num, sci, sciH, col, CHARTS, LINES, place, chart, lab, stepBar, wireSteps, lineGeo, lineSVG, line, wireLines, vbars, mountCharts, nodeSVG, binTree };
})();
