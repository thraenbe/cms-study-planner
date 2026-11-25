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
  // ---------------- Evolutionary algorithm helpers (lecture 5, tutorial 4) ----------------
  // Crossover operators. Each returns { child, src, steps }: src[i] is 1 or 2 (the parent the gene came from), steps is
  // the construction as the slides describe it, one { text, child, src, hl } snapshot per step for the explorer.
  // Positions are 0-indexed as on slides 25–26 and sheet 4.
  const snap = (child, src, text, hl = []) => ({ text, child: child.slice(), src: src.slice(), hl });
  function onePoint(p1, p2, cut) {
    const n = p1.length, child = Array(n).fill(null), src = Array(n).fill(0), steps = [];
    for (let i = 0; i < cut; i++) { child[i] = p1[i]; src[i] = 1; }
    steps.push(snap(child, src, `Copy the head, positions 0–${cut - 1}, from P1.`, [...Array(cut).keys()]));
    for (let i = cut; i < n; i++) { child[i] = p2[i]; src[i] = 2; }
    steps.push(snap(child, src, `Copy the tail, positions ${cut}–${n - 1}, from P2.`, [...Array(n - cut).keys()].map(k => k + cut)));
    return { child, src, steps };
  }
  function uniform(p1, p2, mask) {
    const n = p1.length, child = Array(n).fill(null), src = Array(n).fill(0), steps = [];
    for (let i = 0; i < n; i++) { child[i] = mask[i] ? p1[i] : p2[i]; src[i] = mask[i] ? 1 : 2;
      steps.push(snap(child, src, `Position ${i}: mask ${mask[i]}, so take ${mask[i] ? "P1" : "P2"}[${i}] = ${child[i]}.`, [i])); }
    return { child, src, steps };
  }
  // Order crossover as on slide 24: keep P1's first `cut` genes, then walk P2 from position `cut` (wrapping round)
  // and append every value not yet in the child.
  function ox(p1, p2, cut) {
    const n = p1.length, child = Array(n).fill(null), src = Array(n).fill(0), steps = [];
    for (let i = 0; i < cut; i++) { child[i] = p1[i]; src[i] = 1; }
    steps.push(snap(child, src, `Copy P1's first part, positions 0–${cut - 1}.`, [...Array(cut).keys()]));
    let w = cut;
    for (let k = 0; k < n; k++) { const j = (cut + k) % n, v = p2[j];
      if (child.includes(v)) { steps.push(snap(child, src, `P2[${j}] = ${v} is already in the child: skip.`, [])); continue; }
      child[w] = v; src[w] = 2; steps.push(snap(child, src, `P2[${j}] = ${v} is new: write it at position ${w}.`, [w])); w++; }
    return { child, src, steps };
  }
  // Partially mapped crossover as on slide 25: copy P1's segment a..b, place each displaced P2 segment value by following
  // the position chain out of the segment, then fill the remaining positions from P2.
  function pmx(p1, p2, a, b) {
    const n = p1.length, child = Array(n).fill(null), src = Array(n).fill(0), steps = [], inSeg = i => i >= a && i <= b;
    for (let i = a; i <= b; i++) { child[i] = p1[i]; src[i] = 1; }
    steps.push(snap(child, src, `Copy P1's segment, positions ${a}–${b}: mapping ${[...Array(b - a + 1).keys()].map(k => `${p1[a + k]}↔${p2[a + k]}`).join(", ")}.`, [...Array(b - a + 1).keys()].map(k => k + a)));
    for (let i = a; i <= b; i++) { const v = p2[i];
      if (child.includes(v)) { steps.push(snap(child, src, `P2[${i}] = ${v} is already in the child: nothing to place.`, [])); continue; }
      let pos = i; const hops = [];
      while (true) { const u = p1[pos]; const nxt = p2.indexOf(u); hops.push(`position ${pos} holds ${u}, and ${u} sits at position ${nxt} in P2${inSeg(nxt) ? " (inside the segment)" : " (outside)"}`); pos = nxt; if (!inSeg(pos)) break; }
      child[pos] = v; src[pos] = 2;
      steps.push(snap(child, src, `P2[${i}] = ${v}: ${hops.join("; ")}. Place ${v} at position ${pos}.`, [pos])); }
    const rest = [...Array(n).keys()].filter(i => child[i] === null);
    rest.forEach(i => { child[i] = p2[i]; src[i] = 2; });
    steps.push(snap(child, src, rest.length ? `Fill the free positions ${rest.join(", ")} straight from P2.` : "No free positions left.", rest));
    return { child, src, steps };
  }
  // Cycle crossover as on slide 26: trace cycles (take P2[i], find that value in P1, continue there); odd-numbered cycles
  // come from P1, even-numbered ones from P2.
  function cycles(p1, p2) {
    const n = p1.length, cyc = Array(n).fill(0); let c = 0;
    for (let s = 0; s < n; s++) { if (cyc[s]) continue; c++; let i = s; do { cyc[i] = c; i = p1.indexOf(p2[i]); } while (i !== s); }
    return cyc;
  }
  function cx(p1, p2) {
    const n = p1.length, cyc = cycles(p1, p2), child = Array(n).fill(null), src = Array(n).fill(0), steps = [], k = Math.max(...cyc);
    for (let c = 1; c <= k; c++) { const pos = [...Array(n).keys()].filter(i => cyc[i] === c), from = c % 2 ? 1 : 2;
      pos.forEach(i => { child[i] = from === 1 ? p1[i] : p2[i]; src[i] = from; });
      steps.push(snap(child, src, `Cycle ${c} covers position${pos.length > 1 ? "s" : ""} ${pos.join(", ")}; cycle ${c} is ${c % 2 ? "odd" : "even"}, so these genes come from P${from}.`, pos)); }
    return { child, src, steps, cyc };
  }
  // 8-queens: genotype p, queen in column i (0-based) on row p[i]. Penalty of a queen = number of queens on a shared
  // diagonal (rows and columns never clash in a permutation); the configuration's penalty is the sum, twice the pairs.
  const qPen = p => p.map((r, i) => p.filter((s, j) => j !== i && Math.abs(r - s) === Math.abs(i - j)).length);
  const qPenalty = p => qPen(p).reduce((s, v) => s + v, 0);
  const shuffle = (a, rand) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  // Strip of genes as cells: src 1/2 tint by parent (slots 1/2), hl marks the cells changed in this step.
  const genes = (vals, src = [], hl = [], label = "", cls = "") => `<div class="gstrip ${cls}">${label ? `<span class="gl">${label}</span>` : ""}${vals.map((v, i) => `<span class="gc${src[i] ? ` p${src[i]}` : ""}${hl.includes(i) ? " hl" : ""}${v === null ? " empty" : ""}" title="position ${i}${src[i] ? `, from P${src[i]}` : ""}">${v === null ? "·" : v}</span>`).join("")}</div>`;
  const posRow = (n, label = "") => `<div class="gstrip idx">${label !== null ? `<span class="gl">${label}</span>` : ""}${[...Array(n).keys()].map(i => `<span>${i}</span>`).join("")}</div>`;
  // The crossover explorer, shared by lecture 5 and tutorial 4. ex = [{ id, label, op, p1, p2, cut | a, b | mask, note }].
  const OPS = { one: "one-point", uni: "uniform", ox: "order (OX)", pmx: "partially mapped (PMX)", cx: "cycle (CX)" };
  // swap = true gives the second child: the same operator with the parents' roles exchanged. src and the step texts are
  // then renamed back, so 1 / "P1" always mean the real P1.
  function runOp(e, swap = false) {
    const [a, b] = swap ? [e.p2, e.p1] : [e.p1, e.p2];
    const r = e.op === "one" ? onePoint(a, b, e.cut) : e.op === "uni" ? uniform(a, b, e.mask) : e.op === "ox" ? ox(a, b, e.cut) : e.op === "pmx" ? pmx(a, b, e.a, e.b) : cx(a, b);
    if (!swap) return r;
    const ren = t => t.replace(/P([12])/g, (_, d) => `P${3 - d}`), sw = s => s.map(x => x ? 3 - x : 0);
    return { ...r, src: sw(r.src), steps: r.steps.map(s => ({ ...s, src: sw(s.src), text: ren(s.text) })) };
  }
  function xoverLab(body, examples) {
    const st = { e: 0, i: 0, o2: false };
    body.innerHTML = `<p class="lab-note">Pick an example, then step through the construction. Each child cell is tinted by the parent its gene came from; the outlined cells changed in the last step. “Second child” runs the same operator with the parents' roles swapped.</p>
      <div class="presets" role="group" aria-label="Crossover example">${examples.map((e, k) => `<button class="preset" data-x="${k}" aria-pressed="${k === 0}">${e.label}</button>`).join("")}</div>
      <div class="ctl"><label><input type="checkbox" data-o2> second child (parents swapped)</label></div>
      ${leg([[1, "gene from P1"], [2, "gene from P2"]])}
      <div class="steps"><button class="preset" data-s="reset">↺ Reset</button><button class="preset" data-s="prev">← Back</button><button class="preset" data-s="next">Step →</button><button class="preset" data-s="end">⇥ Run to end</button><span class="scount">step <output>0</output> of <span class="sn"></span></span></div><div class="out"></div>`;
    const out = body.querySelector(".out"), cnt = body.querySelector(".scount output"), sn = body.querySelector(".sn");
    const render = () => {
      const e = examples[st.e], r = runOp(e, st.o2), n = e.p1.length, steps = r.steps; st.n = steps.length; sn.textContent = steps.length; cnt.value = st.i;
      const cur = st.i ? steps[st.i - 1] : { child: Array(n).fill(null), src: Array(n).fill(0), hl: [], text: "Press Step to start." };
      const cutMark = e.op === "pmx" ? `segment ${e.a}–${e.b}` : e.op === "ox" || e.op === "one" ? `cut after position ${e.cut - 1}` : e.op === "uni" ? `mask ${e.mask.join("")}, 1 takes ${st.o2 ? "P2" : "P1"}` : "no cut point, cycles instead";
      const seg = i => e.op === "pmx" ? i >= e.a && i <= e.b : (e.op === "ox" || e.op === "one") ? i < e.cut : false;
      const pStrip = (vals, k) => genes(vals, vals.map(() => k), [], `P${k}`, "par");
      const segRow = e.op === "cx" || e.op === "uni" ? "" : `<div class="gstrip idx seg" aria-hidden="true"><span class="gl">${e.op === "pmx" ? "segment" : "head"}</span>${[...Array(n).keys()].map(i => `<span class="${seg(i) ? "in" : ""}"></span>`).join("")}</div>`;
      const extra = e.op === "cx" ? `<div class="gstrip idx"><span class="gl">cycle</span>${cycles(e.p1, e.p2).map(c => `<span>${c}</span>`).join("")}</div>` : e.op === "uni" ? `<div class="gstrip idx"><span class="gl">mask</span>${e.mask.map(m => `<span>${m}</span>`).join("")}</div>` : "";
      out.innerHTML = `<div class="gwrap">${posRow(n, "position")}${pStrip(e.p1, 1)}${pStrip(e.p2, 2)}${segRow}${extra}${genes(cur.child, cur.src, cur.hl, st.o2 ? "O2" : "O1", "kid")}</div>
        <dl class="ro"><dt>operator</dt><dd>${OPS[e.op]}, ${cutMark}</dd><dt>this step</dt><dd>${cur.text}</dd>${st.i === steps.length ? `<dt>result</dt><dd class="mono">(${r.child.join(", ")})</dd>` : ""}${e.note ? `<dt>note</dt><dd>${e.note}</dd>` : ""}</dl>`;
      body.querySelectorAll("[data-x]").forEach(b => b.setAttribute("aria-pressed", +b.dataset.x === st.e));
    };
    body.querySelectorAll("[data-x]").forEach(b => b.addEventListener("click", () => { st.e = +b.dataset.x; st.i = 0; render(); }));
    body.querySelector("[data-o2]").addEventListener("change", ev => { st.o2 = ev.target.checked; st.i = 0; render(); });
    body.querySelectorAll("[data-s]").forEach(b => b.addEventListener("click", () => { const k = b.dataset.s; st.i = k === "reset" ? 0 : k === "prev" ? Math.max(0, st.i - 1) : k === "next" ? Math.min(st.n, st.i + 1) : st.n; render(); }));
    render();
  }
  return { rng, accept, unsat, gsatStep, isNarrow, key, leg, flag, hbar, vbar, num, sci, sciH, col, CHARTS, LINES, place, chart, lab, stepBar, wireSteps, lineGeo, lineSVG, line, wireLines, vbars, mountCharts, nodeSVG, binTree,
    onePoint, uniform, ox, pmx, cycles, cx, qPen, qPenalty, shuffle, genes, posRow, xoverLab, runOp };
})();
