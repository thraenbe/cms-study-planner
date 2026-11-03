// Shared chart and explorer helpers of the Scientific Software Engineering pages (lecture and exercise write-ups).
// Colour roles: categorical slots 1-4 from the dataviz palette set on each page (--vz-s1 … --vz-s4), gray for reference marks.
// Text stays in ink; colour sits on marks, swatches, underlines and tinted cells.
window.DPFViz = (function () {
  const esc = DPF.esc;
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


  // ---------- Class diagrams (UML-ish, role-tinted) ----------
  // dgm(narrow, {cols, rowH}) returns a small builder: box(col, row, spec) places a class box on a column grid,
  // inh(child, parent) draws generalisation (hollow triangle), ref(from, to, opts) an association or dependency with
  // an open arrowhead and label, note(col, row, lines, to) a dashed pseudo-code note tied to a box, svg(aria) renders.
  // Roles tint the boxes: t = template (slot 1), h = hook (slot 2), c = client (slot 3), p = product / other (slot 4),
  // g = neutral. Abstract classes get an italic name. The diagram is our own drawing, not a copy of a slide.
  function dgm(narrow, o = {}) {
    const W = narrow ? 340 : 600, pad = 6, cols = o.cols || (narrow ? 2 : 4), gap = o.gap ?? (narrow ? 10 : 16);
    const colW = (W - 2 * pad - gap * (cols - 1)) / cols, rowH = o.rowH || (narrow ? 72 : 78);
    const boxes = [], edges = [], notes = [];
    let maxY = 0;
    const H = () => maxY + pad;
    const box = (c, r, sp) => {
      const span = sp.span || 1, w = sp.w || colW * span + gap * (span - 1);
      const lines = sp.ops || [], h = sp.h || 24 + lines.length * 13 + (lines.length ? 6 : 0) + (sp.stereo ? 10 : 0);
      const x = pad + c * (colW + gap) + (sp.dx || 0), y = pad + r * rowH + (sp.dy || 0);
      const b = { x, y, w, h, cx: x + w / 2, cy: y + h / 2, name: sp.name, ops: lines, role: sp.role || "g", abs: sp.abstract, stereo: sp.stereo, mono: sp.mono, sm: sp.sm };
      boxes.push(b); maxY = Math.max(maxY, y + h); return b;
    };
    const inh = (child, parent, opts = {}) => edges.push({ k: "inh", a: child, b: parent, ...opts });
    const ref = (from, to, opts = {}) => edges.push({ k: opts.kind || "ref", a: from, b: to, ...opts });
    const note = (c, r, lines, to, opts = {}) => { const w = opts.w || colW * (opts.span || 1) + gap * ((opts.span || 1) - 1);
      const x = pad + c * (colW + gap) + (opts.dx || 0), y = pad + r * rowH + (opts.dy || 0), h = 10 + lines.length * 12;
      notes.push({ x, y, w, h, lines, to, cx: x + w / 2, cy: y + h / 2 }); maxY = Math.max(maxY, y + h); };
    const txt = (x, y, t, cls, anchor = "middle") => `<text class="${cls}" x="${x}" y="${y}" text-anchor="${anchor}">${esc(t)}</text>`;
    // Edge geometry: pick the pair of sides that face each other.
    const ports = (a, b) => {
      const vert = a.y >= b.y + b.h - 1 || b.y >= a.y + a.h - 1;
      const horiz = !vert && (a.x + a.w <= b.x + 1 || b.x + b.w <= a.x + 1);
      if (horiz) { const l2r = a.cx < b.cx; return { p: [l2r ? a.x + a.w : a.x, a.cy], q: [l2r ? b.x : b.x + b.w, b.cy], dir: l2r ? "r" : "l" }; }
      const down = a.cy < b.cy; return { p: [a.cx, down ? a.y + a.h : a.y], q: [b.cx, down ? b.y : b.y + b.h], dir: down ? "d" : "u" };
    };
    const route = (e) => {
      const { p, q, dir } = ports(e.a, e.b);
      if (dir === "d" || dir === "u") { if (Math.abs(p[0] - q[0]) < 2) return [p, q]; const my = e.k === "inh" ? q[1] + (dir === "u" ? 16 : -16) : p[1] + (q[1] - p[1]) * 0.4; return [p, [p[0], my], [q[0], my], q]; }
      if (Math.abs(p[1] - q[1]) < 2) return [p, q]; const mx = e.k === "inh" ? q[0] + (dir === "r" ? -16 : 16) : (p[0] + q[0]) / 2; return [p, [mx, p[1]], [mx, q[1]], q];
    };
    const head = (pts, kind) => {
      const [x1, y1] = pts[pts.length - 2], [x2, y2] = pts[pts.length - 1], ang = Math.atan2(y2 - y1, x2 - x1), s = kind === "inh" ? 11 : 8;
      const l = [x2 - s * Math.cos(ang - 0.45), y2 - s * Math.sin(ang - 0.45)], r = [x2 - s * Math.cos(ang + 0.45), y2 - s * Math.sin(ang + 0.45)];
      if (kind === "inh") return `<path class="tri" d="M${x2},${y2} L${l[0].toFixed(1)},${l[1].toFixed(1)} L${r[0].toFixed(1)},${r[1].toFixed(1)} Z"/>`;
      if (kind === "agg") { const b = [x2 - 2 * s * Math.cos(ang) * 0.8, y2 - 2 * s * Math.sin(ang) * 0.8]; return `<path class="dia" d="M${x2},${y2} L${l[0].toFixed(1)},${l[1].toFixed(1)} L${b[0].toFixed(1)},${b[1].toFixed(1)} L${r[0].toFixed(1)},${r[1].toFixed(1)} Z"/>`; }
      return `<path class="arr" d="M${l[0].toFixed(1)},${l[1].toFixed(1)} L${x2},${y2} L${r[0].toFixed(1)},${r[1].toFixed(1)}"/>`;
    };
    const svg = (aria, extra = "") => {
      const bx = boxes.map(b => {
        const stereo = b.stereo ? txt(b.cx, b.y + 11, `«${b.stereo}»`, "st") : "";
        const ny = b.y + (b.stereo ? 24 : 16);
        const ops = b.ops.map((op, i) => txt(b.x + 7, ny + 15 + i * 13, op, "op" + (b.mono ? " mono" : ""), "start")).join("");
        const sep = b.ops.length ? `<line class="sep" x1="${b.x}" x2="${b.x + b.w}" y1="${ny + 6}" y2="${ny + 6}"/>` : "";
        return `<g class="cls ${b.role}"><rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="5"/>${stereo}${txt(b.cx, ny, b.name, "cn" + (b.abs ? " abs" : "") + (b.sm ? " sm" : ""))}${sep}${ops}</g>`;
      }).join("");
      const ed = edges.map(e => {
        const pts = route(e); const d = "M" + pts.map(p => p.map(v => (+v).toFixed(1)).join(",")).join(" L");
        let tail = pts; if (e.k === "inh") { const s = 11, [x1, y1] = pts[pts.length - 2], [x2, y2] = pts[pts.length - 1], ang = Math.atan2(y2 - y1, x2 - x1); tail = [...pts.slice(0, -1), [x2 - s * Math.cos(ang), y2 - s * Math.sin(ang)]]; }
        const dl = "M" + tail.map(p => p.map(v => (+v).toFixed(1)).join(",")).join(" L");
        let label = ""; if (e.label) { const seg = pts.length > 2 ? [pts[1], pts[2]] : [pts[0], pts[1]]; const [[ax, ay], [bx, by]] = seg; const vert = Math.abs(ax - bx) < 2, mx = (ax + bx) / 2, my = pts.length > 2 ? (ay + by) / 2 : ay + (by - ay) * 0.62;
          const len = Math.hypot(bx - ax, by - ay), room = vert ? 24 : e.label.length * 6;
          if (len >= room) label = txt(vert ? mx + 5 : mx, vert ? my + 4 : my - 5, e.label, "el", vert ? "start" : "middle"); }
        let mult = ""; if (e.mult) { const [lx, ly] = pts[pts.length - 1]; mult = txt(lx + (pts[pts.length - 2][0] > lx ? 4 : -4), ly - 4, e.mult, "el", pts[pts.length - 2][0] > lx ? "start" : "end"); }
        return `<g class="edge ${e.k}"><path class="ln${e.k === "dep" ? " dash" : ""}" d="${dl}"/>${head(pts, e.k)}${label}${mult}</g>`;
      }).join("");
      const nt = notes.map(n => {
        const t = n.lines.map((l, i) => txt(n.x + 6, n.y + 12 + i * 12, l, "nt", "start")).join("");
        let con = ""; if (n.to) { const { p, q } = ports(n, n.to); con = `<line class="ncon" x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}"/>`; }
        return `<g class="note">${con}<rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="4"/>${t}</g>`;
      }).join("");
      return `<svg class="dgm" viewBox="0 0 ${W} ${H()}" role="img" aria-label="${esc(aria)}">${nt}${bx}${ed}${extra}</svg>`;
    };
    return { W, pad, cols, gap, colW, rowH, box, inh, ref, note, svg, txt, boxes };
  }
  // Sequence diagram: participants across the top, messages as arrows between lifelines, top to bottom.
  function seq(narrow, parts, msgs, aria) {
    const W = narrow ? 340 : 600, pad = 6, n = parts.length, cw = (W - 2 * pad) / n, top = 30, step = narrow ? 34 : 36, H = top + 12 + msgs.length * step + 18;
    const cx = i => pad + cw * i + cw / 2;
    const heads = parts.map((p, i) => `<g class="cls ${p.role || "g"}"><rect x="${cx(i) - Math.min(cw - 8, narrow ? 92 : 120) / 2}" y="${pad}" width="${Math.min(cw - 8, narrow ? 92 : 120)}" height="22" rx="5"/><text class="cn" x="${cx(i)}" y="${pad + 15}" text-anchor="middle">${esc(p.name)}</text></g><line class="life" x1="${cx(i)}" x2="${cx(i)}" y1="${pad + 22}" y2="${H - 6}"/>`).join("");
    const ms = msgs.map((m, i) => { const y = top + 18 + i * step, x1 = cx(m.from), x2 = cx(m.to), self = m.from === m.to;
      if (self) return `<g class="msg"><path class="ln" d="M${x1},${y} h22 v14 h-22"/><path class="arr" d="M${x1 + 7},${y + 9} L${x1},${y + 14} L${x1 + 7},${y + 19}"/><text class="el" x="${x1 + 26}" y="${y + 11}" text-anchor="start">${esc(m.text)}</text></g>`;
      const dir = x2 > x1 ? 1 : -1, ax = x2 - dir * 2;
      return `<g class="msg${m.ret ? " ret" : ""}"><path class="ln${m.ret ? " dash" : ""}" d="M${x1},${y} L${ax},${y}"/><path class="arr" d="M${ax - dir * 7},${y - 5} L${ax},${y} L${ax - dir * 7},${y + 5}"/><text class="el" x="${(x1 + x2) / 2}" y="${y - 5}" text-anchor="middle">${esc(m.text)}</text>${m.tag ? `<text class="tag" x="${(x1 + x2) / 2}" y="${y + 13}" text-anchor="middle">${esc(m.tag)}</text>` : ""}</g>`; }).join("");
    return `<svg class="dgm" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(aria)}">${heads}${ms}</svg>`;
  }

  return { key, leg, flag, hbar, vbar, num, pct, col, CHARTS, LINES, place, chart, lab, lineGeo, lineSVG, line, wireLines, mountCharts, isNarrow, dgm, seq };
})();
