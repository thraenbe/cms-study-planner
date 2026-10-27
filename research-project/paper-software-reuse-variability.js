// Data and charts of the write-up of Reinhartz-Berger, Gal-Oz, Litvak, Morad: "LLM-assisted Code Generation and
// Reuse: An Exploratory Study on Contextual Information" (2026). All numbers are the paper's Tables 1–3; the run
// counts per cell follow from them (five runs per condition, so 20 % = one run).
window.PAPER = (function () {
  const { esc, num, key, leg, hbar, vbar, ramp, inkOn, CHARTS, chart, tbl } = RPViz;
  const CTX = ["None", "S", "B", "F", "S+B", "S+F", "F+B", "S+F+B"];
  const CTX_LONG = { None: "no context", S: "structural", B: "behavioural", F: "functional", "S+B": "structural + behavioural", "S+F": "structural + functional", "F+B": "functional + behavioural", "S+F+B": "all three" };
  const TASKS = ["Achievements", "Options", "Highscore"];
  const SHORT = { Achievements: "Achiev.", Options: "Options", Highscore: "Highsc." };
  const STRATS = ["Generation", "Reuse"];
  // Table 2: compilation success per condition (percent of five runs).
  const COMPILE = {
    Generation: { Achievements: [40, 60, 0, 40, 0, 20, 40, 60], Options: [60, 80, 40, 80, 0, 80, 40, 60], Highscore: [20, 60, 40, 60, 40, 40, 80, 0] },
    Reuse: { Achievements: [20, 40, 20, 20, 40, 0, 0, 40], Options: [40, 0, 60, 60, 20, 100, 60, 80], Highscore: [20, 60, 20, 20, 80, 20, 0, 40] },
  };
  const COMPILE_TOTAL = { Generation: [40, 67, 27, 60, 13, 47, 53, 40], Reuse: [27, 33, 33, 33, 47, 40, 20, 53], Overall: [33, 50, 30, 47, 30, 43, 37, 47] };
  const COMPILE_ROW = { Generation: { Achievements: 33, Options: 55, Highscore: 43, Total: 43 }, Reuse: { Achievements: 23, Options: 53, Highscore: 33, Total: 36 }, Overall: 40 };
  // Table 3: mean share of tests passed, conditional on compiling (null = no run compiled).
  const TESTS = {
    Generation: { Achievements: [54, 64, null, 79, null, 96, 71, 37], Options: [90, 68, 70, 80, null, 70, 80, 73], Highscore: [69, 92, 91, 81, 88, 78, 80, null] },
    Reuse: { Achievements: [43, 41, 79, 64, 71, null, null, 50], Options: [70, null, 70, 77, 70, 78, 77, 80], Highscore: [69, 85, 100, 100, 66, 56, null, 97] },
  };
  const TESTS_TOTAL = { Generation: [71, 75, 80, 80, 88, 82, 77, 55], Reuse: [61, 63, 83, 80, 69, 67, 77, 76], Overall: [66, 69, 82, 80, 78, 74, 77, 65] };
  const TESTS_ROW = { Generation: { Achievements: 62, Options: 76, Highscore: 84, Total: 74 }, Reuse: { Achievements: 57, Options: 76, Highscore: 80, Total: 71 }, Overall: 72 };
  // Table 1: the three tasks.
  const TASK_INFO = { Achievements: { from: "ApoIcarus", to: "ApoMario", unit: 16, integ: 12 }, Options: { from: "ApoSimple", to: "ApoBot", unit: 8, integ: 2 }, Highscore: { from: "ApoIcarus", to: "ApoMario", unit: 7, integ: 9 } };
  const runs = pct => Math.round(pct / 20);
  const compiledRuns = (s, i) => TASKS.reduce((a, t) => a + runs(COMPILE[s][t][i]), 0); // compiled runs per strategy and context (of 15)
  const step5 = v => v <= 0 ? 0 : Math.min(5, Math.ceil(v / 20)); // 20 → 1 … 100 → 5
  const stepT = v => v === null ? 0 : v < 60 ? 1 : v < 70 ? 2 : v < 80 ? 3 : v < 90 ? 4 : 5;

  // ---- The study in one grid: 6 task rows × 8 contexts, plus total rows and column (Tables 2 and 3). ----
  const GRID = { mode: "compile" };
  CHARTS.grid = narrow => {
    const mode = GRID.mode, cw = narrow ? 34 : 54, ch = narrow ? 30 : 34, L = narrow ? 96 : 150, T = 26, gap = 6;
    const cols = CTX.length, W = L + cols * cw + gap + cw + 4, rowsPer = TASKS.length + 1;
    const H = T + 2 * (rowsPer * ch + gap) + gap + ch + 4;
    const src = mode === "compile" ? COMPILE : TESTS, srcT = mode === "compile" ? COMPILE_TOTAL : TESTS_TOTAL, srcR = mode === "compile" ? COMPILE_ROW : TESTS_ROW;
    const stepOf = mode === "compile" ? step5 : stepT;
    const fmtV = v => v === null ? "–" : `${v} %`;
    const cell = (x, y, v, tip, total) => { const st = stepOf(v), cls = v === null ? "na" : st === 0 ? "zero" : "";
      return `<g class="pt" tabindex="0" data-tip="${esc(tip)}"><rect class="hit" x="${x}" y="${y}" width="${cw}" height="${ch}"/><rect class="cell anchor ${cls}" x="${x + 1}" y="${y + 1}" width="${cw - 2}" height="${ch - 2}" rx="4" fill="${v === null ? "none" : ramp(st)}" ${total ? 'opacity=".82"' : ""}/><text class="cl ${inkOn(st)}" x="${x + cw / 2}" y="${y + ch / 2 + 4}" text-anchor="middle">${v === null ? "–" : v}</text></g>`; };
    let out = "", y = T;
    const head = CTX.map((c, i) => `<text class="tick" x="${L + i * cw + cw / 2}" y="${T - 8}" text-anchor="middle" font-size="${narrow ? 9 : 11}">${c}</text>`).join("") + `<text class="tick" x="${L + cols * cw + gap + cw / 2}" y="${T - 8}" text-anchor="middle">Total</text>`;
    STRATS.forEach((s, si) => {
      TASKS.forEach(t => {
        out += `<text class="cat" x="${L - 8}" y="${y + ch / 2 + 4}" text-anchor="end" font-size="${narrow ? 11 : 13}">${narrow ? SHORT[t] : t}</text>`;
        CTX.forEach((c, i) => { const v = src[s][t][i], cr = runs(COMPILE[s][t][i]);
          const tip = mode === "compile" ? `<b>${s} · ${t} · ${CTX_LONG[c]}</b>${cr} of 5 runs compiled (${v} %)` : `<b>${s} · ${t} · ${CTX_LONG[c]}</b>${v === null ? "no run compiled, so no test result" : `${v} % of tests passed on average<br>over ${cr} compiled run${cr > 1 ? "s" : ""}`}`;
          out += cell(L + i * cw, y, v, tip); });
        out += cell(L + cols * cw + gap, y, srcR[s][t], `<b>${s} · ${t}</b>${mode === "compile" ? `${srcR[s][t]} % of 40 runs compiled` : `${srcR[s][t]} % of tests passed on average`}`, true);
        y += ch;
      });
      out += `<text class="cat" x="${L - 8}" y="${y + ch / 2 + 4}" text-anchor="end" font-size="${narrow ? 11 : 13}" font-weight="700">${s}${narrow ? "" : " total"}</text>`;
      CTX.forEach((c, i) => out += cell(L + i * cw, y, srcT[s][i], `<b>${s} · ${CTX_LONG[c]}</b>${mode === "compile" ? `${compiledRuns(s, i)} of 15 runs compiled (${srcT[s][i]} %)` : `${srcT[s][i]} % of tests passed on average (${compiledRuns(s, i)} compiled runs)`}`, true));
      out += cell(L + cols * cw + gap, y, srcR[s].Total, `<b>${s}</b>${mode === "compile" ? `${srcR[s].Total} % of 120 runs compiled` : `${srcR[s].Total} % of tests passed on average`}`, true);
      y += ch + gap;
    });
    out += `<text class="cat" x="${L - 8}" y="${y + ch / 2 + 4}" text-anchor="end" font-size="${narrow ? 11 : 13}" font-weight="700">Overall</text>`;
    CTX.forEach((c, i) => out += cell(L + i * cw, y, srcT.Overall[i], `<b>All runs · ${CTX_LONG[c]}</b>${mode === "compile" ? `${compiledRuns("Generation", i) + compiledRuns("Reuse", i)} of 30 runs compiled (${srcT.Overall[i]} %)` : `${srcT.Overall[i]} % of tests passed on average`}`, true));
    out += cell(L + cols * cw + gap, y, srcR.Overall, `<b>All 240 runs</b>${mode === "compile" ? "95 of 240 compiled (40 %)" : "72 % of tests passed on average"}`, true);
    const bracket = (y0, n, label) => `<line class="ann" x1="${L - (narrow ? 90 : 142)}" x2="${L - (narrow ? 90 : 142)}" y1="${y0 + 4}" y2="${y0 + n * ch - 4}" stroke-width="2" stroke="var(--vz-s${label === "Generation" ? 1 : 2})"/>`;
    const brackets = bracket(T, rowsPer, "Generation") + bracket(T + rowsPer * ch + gap, rowsPer, "Reuse");
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Heatmap of ${mode === "compile" ? "compilation success" : "test pass rate"} for every condition of the study: two strategies, three tasks, eight context combinations, plus totals.">${head}${brackets}${out}</svg>`;
  };
  const gridTable = () => {
    const rows = [];
    STRATS.forEach(s => { TASKS.forEach(t => rows.push({ cells: [`${s} – ${t}`, ...COMPILE[s][t].map(v => `${v} %`), `${COMPILE_ROW[s][t]} %`, ...TESTS[s][t].map(v => v === null ? "–" : `${v} %`), `${TESTS_ROW[s][t]} %`] }));
      rows.push({ sum: true, cells: [`${s} total`, ...COMPILE_TOTAL[s].map(v => `${v} %`), `${COMPILE_ROW[s].Total} %`, ...TESTS_TOTAL[s].map(v => `${v} %`), `${TESTS_ROW[s].Total} %`] }); });
    rows.push({ sum: true, cells: ["Overall", ...COMPILE_TOTAL.Overall.map(v => `${v} %`), "40 %", ...TESTS_TOTAL.Overall.map(v => `${v} %`), "72 %"] });
    return tbl("Table view: compilation (Table 2) and test pass rate (Table 3) for every condition", ["Condition", ...CTX.map(c => `compile ${c}`), "compile total", ...CTX.map(c => `tests ${c}`), "tests total"], rows);
  };

  // ---- 240 runs as a waffle: one square per run, filled when it compiled. ----
  CHARTS.waffle = narrow => {
    const cols = 12, rows = 10, s = narrow ? 11 : 14, g = narrow ? 2 : 3, pw = cols * (s + g), gapP = narrow ? 24 : 40;
    const W = 2 * pw + gapP, H = rows * (s + g) + 36;
    const panel = (strat, x0) => {
      const compiled = TASKS.reduce((a, t) => a + COMPILE[strat][t].reduce((b, v) => b + runs(v), 0), 0);
      let cells = "";
      for (let i = 0; i < 120; i++) { const c = i % cols, r = Math.floor(i / cols), on = i < compiled;
        cells += `<rect x="${x0 + c * (s + g)}" y="${20 + r * (s + g)}" width="${s}" height="${s}" rx="3" fill="${on ? `var(--vz-s${strat === "Generation" ? 1 : 2})` : "var(--surface)"}" ${on ? "" : 'stroke="var(--line)"'}/>`; }
      const tip = `<b>${strat}: ${compiled} of 120 runs compiled (${Math.round(compiled / 120 * 100)} %)</b>${120 - compiled} did not compile`;
      return `<g class="pt waffle" tabindex="0" data-tip="${esc(tip)}"><rect class="hit anchor" x="${x0}" y="${20}" width="${pw}" height="${rows * (s + g)}"/><text class="cat" x="${x0}" y="12">${strat}</text><text class="val" x="${x0 + pw - g}" y="12" text-anchor="end">${compiled} / 120</text>${cells}</g>`;
    };
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Waffle chart of all 240 runs: 52 of 120 generation runs and 43 of 120 reuse runs compiled.">${panel("Generation", 0)}${panel("Reuse", pw + gapP)}<text class="note-t" x="0" y="${H - 6}">filled = compiled and could be tested · outlined = failed to compile</text></svg>`;
  };

  // ---- Compile rate by context: generation vs reuse as dumbbells (Table 2 totals). ----
  CHARTS.ctx = narrow => {
    const W = narrow ? 340 : 620, L = narrow ? 56 : 92, R = narrow ? 36 : 60, T = 14, RH = narrow ? 30 : 34, H = T + CTX.length * RH + 26, PW = W - L - R;
    const x = v => L + v / 100 * PW;
    const ticks = [0, 20, 40, 60, 80, 100].map(v => `<line class="${v ? "grid" : "axis"}" x1="${x(v)}" x2="${x(v)}" y1="${T}" y2="${H - 22}"/><text class="tick" x="${x(v)}" y="${H - 6}" text-anchor="middle">${v}${v === 100 ? " %" : ""}</text>`).join("");
    const rows = CTX.map((c, i) => { const yc = T + i * RH + RH / 2, g = COMPILE_TOTAL.Generation[i], r = COMPILE_TOTAL.Reuse[i];
      const tip = `<b>${CTX_LONG[c][0].toUpperCase() + CTX_LONG[c].slice(1)}</b><span class="trow"><i style="--c:var(--vz-s1)"></i><strong>${g} %</strong> generation (${compiledRuns("Generation", i)} of 15)</span><span class="trow"><i style="--c:var(--vz-s2)"></i><strong>${r} %</strong> reuse (${compiledRuns("Reuse", i)} of 15)</span>`;
      const lo = Math.min(g, r), hi = Math.max(g, r);
      const label = (v, who) => { const other = who === "g" ? r : g; const dx = v >= other ? 11 : -11; return `<text class="val" x="${x(v) + dx}" y="${yc + 4}" text-anchor="${dx > 0 ? "start" : "end"}" font-size="11.5">${v}</text>`; };
      return `<g class="pt" tabindex="0" data-tip="${esc(tip)}"><rect class="hit" x="0" y="${yc - RH / 2}" width="${W}" height="${RH}"/>
        <text class="cat" x="${L - 10}" y="${yc + 4}" text-anchor="end" font-size="${narrow ? 11 : 13}">${c}</text>
        <line class="link" x1="${x(lo)}" x2="${x(hi)}" y1="${yc}" y2="${yc}"/>
        <circle class="dot f1 anchor" cx="${x(g)}" cy="${yc}" r="6"/><circle class="dot f2" cx="${x(r)}" cy="${yc}" r="6"/>
        ${g !== r ? label(g, "g") + label(r, "r") : `<text class="val" x="${x(g) + 11}" y="${yc + 4}" font-size="11.5">${g}</text>`}</g>`; }).join("");
    const base = `<line class="ref" x1="${x(40)}" x2="${x(40)}" y1="${T}" y2="${T + RH}" stroke-dasharray="2 3"/><line class="ref" x1="${x(27)}" x2="${x(27)}" y1="${T}" y2="${T + RH}" stroke-dasharray="2 3"/>`;
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Dumbbell chart: compilation rate per context combination for generation and reuse. Generation is best with structural context alone (67 percent) and worst with structural plus behavioural (13 percent); reuse is best with all three (53 percent) and worst with functional plus behavioural (20 percent).">${ticks}${base}${rows}</svg>`;
  };
  const ctxTable = () => tbl("Table view: compilation rate by context (Table 2 totals)", ["Context", "Generation", "Reuse", "Overall"], CTX.map((c, i) => ({ cells: [`${c} (${CTX_LONG[c]})`, `${COMPILE_TOTAL.Generation[i]} %`, `${COMPILE_TOTAL.Reuse[i]} %`, `${COMPILE_TOTAL.Overall[i]} %`] })));

  // ---- Tasks: compile rate per task and strategy (grouped bars) and the size of each task's test suite (stacked). ----
  CHARTS.taskCompile = narrow => {
    const W = narrow ? 340 : 300, L = 34, R = 10, T = 24, B = 26, H = 196, PW = W - L - R, PH = H - T - B, bw = narrow ? 30 : 26, gap = 3;
    const y = v => T + PH - v / 100 * PH, gw = PW / TASKS.length;
    const ticks = [0, 20, 40, 60].map(v => `<line class="${v ? "grid" : "axis"}" x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}"/><text class="tick" x="${L - 6}" y="${y(v) + 4}" text-anchor="end">${v}</text>`).join("");
    const bars = TASKS.map((t, i) => { const cx = L + i * gw + gw / 2, g = COMPILE_ROW.Generation[t], r = COMPILE_ROW.Reuse[t];
      const tip = `<b>${t}</b><span class="trow"><i style="--c:var(--vz-s1)"></i><strong>${g} %</strong> generation compiled</span><span class="trow"><i style="--c:var(--vz-s2)"></i><strong>${r} %</strong> reuse compiled</span>overall ${Math.round((g + r) / 2)} %`;
      return `<g class="pt" tabindex="0" data-tip="${esc(tip)}"><rect class="hit" x="${L + i * gw}" y="${T}" width="${gw}" height="${PH}"/>
        <path class="bar s1 anchor" d="${vbar(cx - bw - gap / 2, bw, y(g), y(0))}"/><path class="bar s2" d="${vbar(cx + gap / 2, bw, y(r), y(0))}"/>
        <text class="val" x="${cx - gap / 2 - bw / 2}" y="${y(g) - 4}" text-anchor="middle" font-size="11">${g}</text><text class="val" x="${cx + gap / 2 + bw / 2}" y="${y(r) - 4}" text-anchor="middle" font-size="11">${r}</text>
        <text class="cat" x="${cx}" y="${H - 8}" text-anchor="middle" font-size="12">${t}</text></g>`; }).join("");
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Grouped bars: compilation rate per task. Options 55 and 53 percent, Highscore 43 and 33, Achievements 33 and 23 for generation and reuse."><text class="note-t" x="${L - 30}" y="10">compiled, %</text>${ticks}${bars}</svg>`;
  };
  CHARTS.taskTests = narrow => {
    const W = narrow ? 340 : 300, L = 34, R = 10, T = 24, B = 26, H = 196, PW = W - L - R, PH = H - T - B, bw = narrow ? 44 : 40;
    const y = v => T + PH - v / 30 * PH, gw = PW / TASKS.length;
    const ticks = [0, 10, 20, 30].map(v => `<line class="${v ? "grid" : "axis"}" x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}"/><text class="tick" x="${L - 6}" y="${y(v) + 4}" text-anchor="end">${v}</text>`).join("");
    const bars = TASKS.map((t, i) => { const cx = L + i * gw + gw / 2, { unit, integ, from, to } = TASK_INFO[t], tot = unit + integ;
      const tip = `<b>${t}: ${tot} tests</b><span class="trow"><i style="--c:var(--vz-s3)"></i><strong>${integ}</strong> integration tests</span><span class="trow"><i style="--c:var(--vz-s1)"></i><strong>${unit}</strong> unit tests</span>source ${from} → target ${to}`;
      return `<g class="pt" tabindex="0" data-tip="${esc(tip)}"><rect class="hit" x="${L + i * gw}" y="${T}" width="${gw}" height="${PH}"/>
        <rect class="f1 anchor" x="${cx - bw / 2}" y="${y(unit)}" width="${bw}" height="${y(0) - y(unit) - 1}"/><path class="bar s3" d="${vbar(cx - bw / 2, bw, y(tot), y(unit) - 2)}"/>
        <text class="val" x="${cx}" y="${y(tot) - 4}" text-anchor="middle" font-size="11">${tot}</text>
        <text class="cat" x="${cx}" y="${H - 8}" text-anchor="middle" font-size="12">${t}</text></g>`; }).join("");
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Stacked bars: number of unit and integration tests per task. Achievements 16 plus 12, Options 8 plus 2, Highscore 7 plus 9."><text class="note-t" x="${L - 30}" y="10">tests</text>${ticks}${bars}</svg>`;
  };

  // ---- Semantic correctness by context, with the evidence behind each mean (Table 3 totals; size = compiled runs). ----
  CHARTS.tests = narrow => {
    const W = narrow ? 340 : 620, L = narrow ? 56 : 92, R = narrow ? 30 : 60, T = 14, RH = narrow ? 32 : 36, H = T + CTX.length * RH + 26, PW = W - L - R;
    const x = v => L + (v - 40) / 60 * PW, rad = n => 3 + n * 0.65;
    const ticks = [40, 50, 60, 70, 80, 90, 100].map(v => `<line class="${v === 40 ? "axis" : "grid"}" x1="${x(v)}" x2="${x(v)}" y1="${T}" y2="${H - 22}"/><text class="tick" x="${x(v)}" y="${H - 6}" text-anchor="middle">${v}${v === 100 ? " %" : ""}</text>`).join("");
    const rows = CTX.map((c, i) => { const yc = T + i * RH + RH / 2, g = TESTS_TOTAL.Generation[i], r = TESTS_TOTAL.Reuse[i], ng = compiledRuns("Generation", i), nr = compiledRuns("Reuse", i);
      const tip = `<b>${CTX_LONG[c][0].toUpperCase() + CTX_LONG[c].slice(1)}</b><span class="trow"><i style="--c:var(--vz-s1)"></i><strong>${g} %</strong> generation · mean of ${ng} compiled run${ng > 1 ? "s" : ""}</span><span class="trow"><i style="--c:var(--vz-s2)"></i><strong>${r} %</strong> reuse · mean of ${nr} compiled run${nr > 1 ? "s" : ""}</span>`;
      const lab = (c === "None" || c === "S+B" || c === "S+F+B") ? `<text class="val" x="${x(Math.max(g, r)) + rad(Math.max(ng, nr)) + 5}" y="${yc + 4}" font-size="11.5">${g} · ${r}</text>` : "";
      return `<g class="pt" tabindex="0" data-tip="${esc(tip)}"><rect class="hit" x="0" y="${yc - RH / 2}" width="${W}" height="${RH}"/>
        <text class="cat" x="${L - 10}" y="${yc + 4}" text-anchor="end" font-size="${narrow ? 11 : 13}">${c}</text>
        <line class="link" x1="${x(Math.min(g, r))}" x2="${x(Math.max(g, r))}" y1="${yc}" y2="${yc}"/>
        <circle class="dot f1 anchor" cx="${x(g)}" cy="${yc}" r="${rad(ng)}"/><circle class="dot f2" cx="${x(r)}" cy="${yc}" r="${rad(nr)}"/>${lab}</g>`; }).join("");
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Dot plot: mean test pass rate per context for generation and reuse, dot size showing how many compiled runs the mean rests on. Generation ranges from 55 percent (all three contexts) to 88 percent (structural plus behavioural, only 2 runs); reuse from 61 (none) to 83 (behavioural).">${ticks}${rows}</svg>`;
  };
  const testsTable = () => tbl("Table view: mean test pass rate by context and the compiled runs behind it (Tables 2 and 3)", ["Context", "Generation", "runs", "Reuse", "runs", "Overall"], CTX.map((c, i) => ({ cells: [c, `${TESTS_TOTAL.Generation[i]} %`, compiledRuns("Generation", i), `${TESTS_TOTAL.Reuse[i]} %`, compiledRuns("Reuse", i), `${TESTS_TOTAL.Overall[i]} %`] })));

  // ---- The eight context combinations as a lattice: each node split into generation (left) and reuse (right) compile rate. ----
  CHARTS.lattice = narrow => {
    const W = narrow ? 340 : 620, H = narrow ? 300 : 330, r = narrow ? 17 : 22;
    const lv = [[ "None"], ["S", "B", "F"], ["S+B", "S+F", "F+B"], ["S+F+B"]];
    const pos = {}; lv.forEach((row, li) => row.forEach((c, i) => { pos[c] = { x: W / 2 + (i - (row.length - 1) / 2) * (narrow ? 100 : 170), y: 40 + li * ((H - 80) / 3) }; }));
    const edges = [["None", "S"], ["None", "B"], ["None", "F"], ["S", "S+B"], ["S", "S+F"], ["B", "S+B"], ["B", "F+B"], ["F", "S+F"], ["F", "F+B"], ["S+B", "S+F+B"], ["S+F", "S+F+B"], ["F+B", "S+F+B"]];
    const lines = edges.map(([a, b]) => `<line class="grid" x1="${pos[a].x}" y1="${pos[a].y}" x2="${pos[b].x}" y2="${pos[b].y}"/>`).join("");
    const nodes = CTX.map((c, i) => { const { x, y } = pos[c], g = COMPILE_TOTAL.Generation[i], re = COMPILE_TOTAL.Reuse[i];
      const half = (v, left) => { const st = step5(v); return `<path d="M${x},${y - r} A${r},${r} 0 0 ${left ? 0 : 1} ${x},${y + r} Z" fill="${st ? ramp(st) : "var(--surface)"}" stroke="${st ? "none" : "var(--line)"}"/>`; };
      const tip = `<b>${CTX_LONG[c][0].toUpperCase() + CTX_LONG[c].slice(1)}</b><span class="trow"><i style="--c:var(--vz-s1)"></i><strong>${g} %</strong> generation compiled</span><span class="trow"><i style="--c:var(--vz-s2)"></i><strong>${re} %</strong> reuse compiled</span>left half = generation, right half = reuse`;
      return `<g class="pt" tabindex="0" data-tip="${esc(tip)}"><circle class="hit anchor" cx="${x}" cy="${y}" r="${r + 8}"/>${half(g, true)}${half(re, false)}<line x1="${x}" y1="${y - r}" x2="${x}" y2="${y + r}" stroke="var(--surface-2)" stroke-width="2"/>
        <text class="lbl" x="${x}" y="${y + r + 14}" text-anchor="middle" font-size="${narrow ? 11 : 12}">${c}</text>
        <text class="cl ${inkOn(step5(g))}" x="${x - r / 2}" y="${y + 4}" text-anchor="middle" font-size="${narrow ? 9.5 : 11}">${g}</text><text class="cl ${inkOn(step5(re))}" x="${x + r / 2}" y="${y + 4}" text-anchor="middle" font-size="${narrow ? 9.5 : 11}">${re}</text></g>`; }).join("");
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Lattice of the eight context combinations from none at the top to all three at the bottom; each node shows the compilation rate for generation on the left and reuse on the right.">${lines}${nodes}</svg>`;
  };

  // ---- The 48-condition design as a factor diagram (3 × 2 × 8, five runs each). ----
  CHARTS.design = narrow => {
    const W = narrow ? 340 : 620, H = narrow ? 150 : 120, bw = narrow ? 100 : 150, gap = narrow ? 10 : 24;
    const factors = [["3 tasks", TASKS, "Achievements, Options, Highscore"], ["2 strategies", STRATS, "generate from scratch or reuse a sibling game's feature"], ["8 contexts", ["∅", "S", "B", "F", "S+B", "S+F", "F+B", "S+F+B"], "every subset of {structural, behavioural, functional}"]];
    const x0 = (W - (3 * bw + 2 * gap + (narrow ? 0 : 150))) / 2;
    const boxes = factors.map(([h, items, note], i) => { const x = x0 + i * (bw + gap);
      const chips = items.map((it, k) => `<rect x="${x + 6 + (k % 4) * ((bw - 12) / 4)}" y="${40 + Math.floor(k / 4) * 16}" width="${(bw - 12) / 4 - 3}" height="12" rx="3" fill="var(--vz-s${i + 1})" opacity="${0.55 + 0.45 * (k % 2)}"/>`).join("");
      return `<g class="pt" tabindex="0" data-tip="${esc(`<b>${h}</b>${note}`)}"><rect class="hit anchor" x="${x}" y="${8}" width="${bw}" height="${74}" rx="8" fill="var(--surface)" stroke="var(--line)"/><text class="cat" x="${x + bw / 2}" y="${30}" text-anchor="middle">${h}</text>${chips}</g>` + (i < 2 ? `<text class="lbl" x="${x + bw + gap / 2}" y="${50}" text-anchor="middle" font-size="16">×</text>` : ""); }).join("");
    const eq = narrow ? `<text class="val" x="${W / 2}" y="${118}" text-anchor="middle" font-size="13">= 48 conditions × 5 runs = 240 runs</text>` : `<text class="lbl" x="${x0 + 3 * bw + 2 * gap + 12}" y="${38}" font-size="13">= 48 conditions</text><text class="lbl" x="${x0 + 3 * bw + 2 * gap + 12}" y="${58}" font-size="13">× 5 runs each</text><text class="val" x="${x0 + 3 * bw + 2 * gap + 12}" y="${78}" font-size="15">= 240 runs</text>`;
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Factor diagram: three tasks times two strategies times eight context combinations give 48 conditions, run five times each: 240 runs.">${boxes}${eq}</svg>`;
  };

  // ---- Related work: pass@1 on HumanEval for three assistants, as cited in the paper (self-contained functions). ----
  CHARTS.humaneval = narrow => {
    const D = [["ChatGPT", 65.2], ["Copilot", 46.3], ["CodeWhisperer", 31.1]];
    const W = narrow ? 340 : 480, L = narrow ? 100 : 110, R = 50, T = 8, RH = 30, H = T + D.length * RH + 24, PW = W - L - R, x = v => L + v / 100 * PW;
    const ticks = [0, 25, 50, 75, 100].map(v => `<line class="${v ? "grid" : "axis"}" x1="${x(v)}" x2="${x(v)}" y1="${T}" y2="${H - 20}"/><text class="tick" x="${x(v)}" y="${H - 5}" text-anchor="middle">${v}${v === 100 ? " %" : ""}</text>`).join("");
    const rows = D.map(([k, v], i) => { const y0 = T + i * RH + 6; return `<g class="pt" tabindex="0" data-tip="${esc(`<b>${k}: pass@1 = ${v} %</b>share of HumanEval problems whose generated<br>function passed all hidden tests (as cited in the paper)`)}"><rect class="hit" x="0" y="${y0 - 6}" width="${W}" height="${RH}"/><path class="bar s1 anchor" d="${hbar(x(0), x(v), y0, 18)}"/><text class="cat" x="${L - 8}" y="${y0 + 13}" text-anchor="end">${k}</text><text class="val" x="${x(v) + 6}" y="${y0 + 13}">${v}</text></g>`; }).join("");
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Bar chart: HumanEval pass at 1 as cited in the paper, ChatGPT 65.2 percent, Copilot 46.3, CodeWhisperer 31.1.">${ticks}${rows}</svg>`;
  };

  // ---- The run of one condition: prompt → model → integrate → compile → test (static explainer). ----
  CHARTS.pipeline = narrow => {
    if (narrow) {
      const steps = [["Prompt", "role · feature · task & instructions · context pointer · required public members (+ source feature for reuse)"], ["Gemini 3.1 Flash Lite", "one shot, no retries, no fixes"], ["Integrate into the target game", "the code must live inside an existing Java system"], ["Compile", "syntactic validity: 40 % pass"], ["Run the task's tests", "semantic correctness: 72 % of tests pass, on average, if it compiled"]];
      const H = 20 + steps.length * 62;
      const b = steps.map(([h, t], i) => { const y = 10 + i * 62; return `<rect x="4" y="${y}" width="332" height="50" rx="8" fill="${i === 3 ? "var(--vz-s1)" : "var(--surface)"}" stroke="var(--line)"/><text class="cat" x="16" y="${y + 20}" font-size="12.5" fill="${i === 3 ? "#fff" : "var(--ink)"}">${h}</text><foreignObject x="16" y="${y + 24}" width="310" height="26"><div xmlns="http://www.w3.org/1999/xhtml" style="font-size:10.5px;line-height:1.2;color:${i === 3 ? "#fff" : "var(--ink-2)"}">${t}</div></foreignObject>${i < steps.length - 1 ? `<path d="M170,${y + 50} v6 l-5,-4 M170,${y + 56} l5,-4" stroke="var(--ink-3)" fill="none"/>` : ""}`; }).join("");
      return `<svg viewBox="0 0 340 ${H}" role="img" aria-label="Flow of one run: prompt, model, integration into the target game, compilation, tests.">${b}</svg>`;
    }
    const box = (x, y, w, h, title, lines, fill) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${fill || "var(--surface)"}" stroke="${fill ? "none" : "var(--line)"}"/><text class="cat" x="${x + w / 2}" y="${y + 18}" text-anchor="middle" font-size="12.5" fill="${fill ? "#fff" : "var(--ink)"}">${title}</text>${lines.map((l, i) => `<text class="note-t" x="${x + w / 2}" y="${y + 34 + i * 13}" text-anchor="middle" fill="${fill ? "#fff" : "var(--ink-2)"}">${l}</text>`).join("")}`;
    const arrow = (x1, y1, x2, y2, lbl) => `<path d="M${x1},${y1} L${x2},${y2}" stroke="var(--ink-3)" fill="none" marker-end="url(#arr)"/>${lbl ? `<text class="note-t" x="${(x1 + x2) / 2}" y="${(y1 + y2) / 2 - 6}" text-anchor="middle">${lbl}</text>` : ""}`;
    return `<svg viewBox="0 0 620 222" role="img" aria-label="Flow of one run: a five-part prompt goes to Gemini 3.1 Flash Lite in one shot; the output is integrated into the target game, compiled, and if it compiles the task's unit and integration tests are run. For reuse the prompt also carries the source game's feature.">
      <defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--ink-3)"/></marker></defs>
      ${box(4, 20, 150, 112, "Prompt (5 parts)", ["role · feature spec", "task &amp; instructions", "pointer to context files", "required public members", "+ target's key classes"])}
      ${box(4, 150, 150, 60, "Reuse only", ["+ the source game's", "feature implementation"])}
      ${arrow(79, 150, 79, 134)}
      ${arrow(154, 76, 196, 76)}
      ${box(198, 42, 118, 68, "Gemini 3.1", ["Flash Lite", "single shot, no fixes"])}
      ${arrow(316, 76, 358, 76)}
      ${box(360, 42, 118, 68, "Integrate", ["into the target game", "(existing Java system)"])}
      ${arrow(478, 76, 520, 76)}
      ${box(522, 42, 94, 68, "Compile", ["40 % pass", "95 of 240"], "var(--vz-s1)")}
      ${arrow(569, 110, 569, 150)}
      ${box(470, 152, 146, 60, "Run the tests", ["72 % pass on average", "unit + integration"])}
      <path d="M569,110 L569,130 L420,130 L420,172 L390,172" stroke="var(--ink-3)" fill="none" stroke-dasharray="3 3" marker-end="url(#arr)"/>
      ${box(250, 152, 138, 46, "no test result", ["60 % of runs stop here", "(“–” in Table 3)"])}
    </svg>`;
  };

  // ---- Context extraction: from source code to three typed JSON files, and the slicing step for reuse. ----
  CHARTS.extract = narrow => {
    const W = narrow ? 340 : 620, H = narrow ? 330 : 206;
    const box = (x, y, w, h, title, lines, slot) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${slot ? `var(--vz-s${slot})` : "var(--surface)"}" stroke="${slot ? "none" : "var(--line)"}"/><text class="cat" x="${x + w / 2}" y="${y + 17}" text-anchor="middle" font-size="12" fill="${slot ? "#fff" : "var(--ink)"}">${title}</text>${lines.map((l, i) => `<text class="note-t" x="${x + w / 2}" y="${y + 31 + i * 12}" text-anchor="middle" font-size="10.5" fill="${slot ? "#fff" : "var(--ink-2)"}">${l}</text>`).join("")}`;
    const ar = (x1, y1, x2, y2) => `<path d="M${x1},${y1} L${x2},${y2}" stroke="var(--ink-3)" fill="none" marker-end="url(#arr2)"/>`;
    const defs = `<defs><marker id="arr2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--ink-3)"/></marker></defs>`;
    if (narrow) return `<svg viewBox="0 0 340 330" role="img" aria-label="Context extraction pipeline.">${defs}
      ${box(4, 6, 332, 46, "Game source code (Java)", ["one apo-games variant"])}${ar(170, 52, 170, 66)}
      ${box(4, 68, 332, 58, "Regex static analysis, per class", ["parent · fields · assets · methods", "outgoing calls · field-assignment hints · documented intent"])}${ar(170, 126, 170, 140)}
      ${box(4, 142, 104, 58, "Structural", ["module name, parent,", "fields, assets"], 1)}${box(118, 142, 104, 58, "Behavioural", ["calls per method,", "logic hints, literals"], 2)}${box(232, 142, 104, 58, "Functional", ["role tags,", "method intent"], 3)}
      ${ar(170, 200, 170, 214)}${box(4, 216, 332, 46, "Inheritance resolved", ["parent fields propagated into child modules"])}
      ${ar(170, 262, 170, 276)}${box(4, 278, 332, 46, "Reuse only: feature slicing", ["the feature's classes + their parents and dependencies"])}</svg>`;
    return `<svg viewBox="0 0 620 206" role="img" aria-label="Context extraction pipeline: the game's Java source is parsed with regex-based static analysis into per-class facts, inheritance is resolved, and the facts are split into three typed JSON files: structural, behavioural and functional. For reuse a slicing step narrows the source game's context to the feature's classes.">${defs}
      ${box(4, 60, 120, 60, "Game source", ["Java, one apo-games", "variant per role"])}${ar(124, 90, 150, 90)}
      ${box(152, 40, 170, 100, "Regex static analysis", ["per class: parent, fields,", "assets, methods; per method:", "calls, assignment hints, intent;", "parent fields propagated"])}${ar(322, 70, 370, 36)}${ar(322, 90, 370, 90)}${ar(322, 110, 370, 144)}
      ${box(372, 10, 120, 52, "structural.json", ["module, parent,", "fields, assets"], 1)}${box(372, 68, 120, 52, "behavioural.json", ["calls, logic hints,", "numeric literals"], 2)}${box(372, 126, 120, 52, "functional.json", ["role tags,", "method intent"], 3)}
      ${ar(492, 90, 520, 90)}${box(522, 56, 94, 68, "Prompt", ["the subset the", "condition asks for", "(S, B, F, …)"])}
      <text class="note-t" x="310" y="196" text-anchor="middle">Reuse adds a slicing step before the split: only the source game's classes of the feature, their parents and dependencies.</text></svg>`;
  };

  return { CTX, CTX_LONG, TASKS, STRATS, COMPILE, COMPILE_TOTAL, COMPILE_ROW, TESTS, TESTS_TOTAL, TESTS_ROW, TASK_INFO, runs, compiledRuns, GRID, gridTable, ctxTable, testsTable };
})();
