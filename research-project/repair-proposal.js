// Data and charts of the proposal page "When the build fails, which context fixes it?" for the research project
// "Context-Aware Code Development with AI Assistance" (CMS-PRO). Charts by name for RPViz.mount; colours from the
// page's --vz-* tokens (slot 1 blue = generation, slot 2 orange = reuse, gray = reference marks).
window.RS = (function () {
  const { esc, CHARTS, tbl } = RPViz;

  // ---------------------------------------------------------------------------------------------------------
  // 1. The hero: three kinds of failure and what the model receives in each repair arm. Names are invented.
  // ---------------------------------------------------------------------------------------------------------
  const FAIL = [
    { id: "ref", label: "Unresolved reference", build: "ScoreManager.java:212: error: cannot find symbol\n  symbol:   method saveHighscore(int)\n  location: class ScoreManager",
      lookup: "Closest real methods in ScoreManager:\n  saveScore(int)\n  loadScore()\nsaveScore is called by Game.onGameOver()",
      why: "The model invented a name. A lookup of the real symbols should settle this at very low cost." },
    { id: "contract", label: "Contract violation", build: "Highscore.java:48: error: method write in class SaveStore\ncannot be applied to given types\n  required: String,int\n  found:    int",
      lookup: "SaveStore.write(String key, int value)\nExample call in Menu.saveOptions():\n  store.write(\"sound\", level)",
      why: "The method exists but is used wrongly. The compiler names the signature; a real call site shows how the project uses it." },
    { id: "wiring", label: "Misplaced wiring", silent: true, build: "BUILD SUCCESSFUL\nNo compiler error.\nHighscore.add() exists, but nothing calls it.",
      lookup: "No error, so no lookup is triggered.\nOptional graph check:\n  new method Highscore.add() has 0 callers\n  nearest edit site: Game.onGameOver()",
      why: "The feature is written but never runs. Only the tests or a call-graph check can see this, so stage 2 measures it separately." },
  ];
  const ARMS = [
    { id: "e", label: "Error alone", get: f => f.silent ? "Nothing: the build passed, so no repair round starts." : "The compiler output and the failed code. Nothing else." },
    { id: "l", label: "Error + lookup", get: f => f.lookup, mono: true },
    { id: "f", label: "Error + full context", get: f => f.silent ? "Nothing: the build passed, so no repair round starts." : "The compiler output, the failed code and the full S + F + B context of the project." },
  ];

  // ---------------------------------------------------------------------------------------------------------
  // 2. What the paper's compile rates can carry: Table 2 totals as counts of 15 runs (5 runs × 3 tasks) with 95 %
  //    Wilson intervals. The intervals ignore task effects, so they are if anything too narrow.
  // ---------------------------------------------------------------------------------------------------------
  const CTX = ["None", "S", "B", "F", "S+B", "S+F", "F+B", "S+F+B"];
  const GEN = [6, 10, 4, 9, 2, 7, 8, 6], REU = [4, 5, 5, 5, 7, 6, 3, 8];
  const N = 15;
  const wilson = (x, n, z = 1.96) => { const p = x / n, d = 1 + z * z / n, c = (p + z * z / (2 * n)) / d, h = z * Math.sqrt(p * (1 - p) / n + z * z / (4 * n * n)) / d; return [c - h, c + h]; };
  const pct = v => Math.round(v * 100);
  CHARTS.ci = narrow => {
    const W = narrow ? 360 : 860, L = narrow ? 62 : 86, R = narrow ? 14 : 30, T = 10, B = 28, row = narrow ? 34 : 38, H = T + row * CTX.length + B;
    const x = v => L + v * (W - L - R);
    let out = "";
    [0, .25, .5, .75, 1].forEach(v => { out += `<line class="grid" x1="${x(v)}" x2="${x(v)}" y1="${T}" y2="${H - B}"/><text class="tick" x="${x(v)}" y="${H - 8}" text-anchor="middle">${v * 100} %</text>`; });
    const mark = (cx, y, strat) => strat === "g" ? `<circle class="dot f1 anchor" cx="${cx}" cy="${y}" r="5.5"/>` : `<rect class="dia f2 anchor" x="${cx - 5}" y="${y - 5}" width="10" height="10" rx="1.5" transform="rotate(45 ${cx} ${y})"/>`;
    CTX.forEach((c, i) => {
      const y0 = T + row * i + row / 2;
      out += `<text class="cat" x="${L - 10}" y="${y0 + 4}" text-anchor="end">${c}</text>`;
      [["g", GEN[i], y0 - 7, "Generation", "s1"], ["r", REU[i], y0 + 7, "Reuse", "s2"]].forEach(([s, v, y, name, cls]) => {
        const [lo, hi] = wilson(v, N), p = v / N;
        out += `<g class="pt" tabindex="0" data-tip="${esc(`<b>${name}, ${c}</b>${v} of ${N} compiled (${pct(p)} %)<br>95 % interval ${pct(lo)}–${pct(hi)} %`)}">
          <rect class="hit" x="${L}" y="${y - 7}" width="${W - L - R}" height="14"/>
          <line class="ci ${cls}" x1="${x(lo)}" x2="${x(hi)}" y1="${y}" y2="${y}"/>${mark(x(p), y, s)}</g>`;
      });
    });
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Compile rates for eight context types under generation and reuse, each with a wide 95 percent interval. Most intervals overlap.">${out}</svg>`;
  };
  const ciTable = () => tbl("Table view of the compile rates", ["Context", "Generation", "95 % interval", "Reuse", "95 % interval"],
    CTX.map((c, i) => { const g = wilson(GEN[i], N), r = wilson(REU[i], N); return { cells: [c, `${GEN[i]} of ${N} (${pct(GEN[i] / N)} %)`, `${pct(g[0])}–${pct(g[1])} %`, `${REU[i]} of ${N} (${pct(REU[i] / N)} %)`, `${pct(r[0])}–${pct(r[1])} %`] }; }));

  // ---------------------------------------------------------------------------------------------------------
  // 3. Runs needed per arm against a 40 % baseline: two-sided α = .05, power .8, normal approximation.
  // ---------------------------------------------------------------------------------------------------------
  const DIFF = [10, 15, 20, 27, 30, 40, 45];
  const need = d => { const p1 = .4, p2 = .4 + d / 100; return Math.ceil(Math.pow(1.96 + .8416, 2) * (p1 * (1 - p1) + p2 * (1 - p2)) / Math.pow(d / 100, 2)); };
  CHARTS.power = narrow => {
    const W = narrow ? 360 : 860, H = narrow ? 250 : 280, L = 46, R = narrow ? 18 : 30, T = 16, B = 40, yMax = 400;
    const x = d => L + (d - 10) / 35 * (W - L - R), y = n => T + (1 - n / yMax) * (H - T - B);
    let out = "";
    [0, 100, 200, 300, 400].forEach(v => { out += `<line class="${v ? "grid" : "axis"}" x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}"/><text class="tick" x="${L - 7}" y="${y(v) + 4}" text-anchor="end">${v}</text>`; });
    [10, 20, 30, 40].forEach(d => { out += `<text class="tick" x="${x(d)}" y="${H - B + 17}" text-anchor="middle">${d}</text>`; });
    out += `<text class="note-t" x="${(L + W - R) / 2}" y="${H - 5}" text-anchor="middle">Difference to detect, in percentage points above a 40 % baseline</text>`;
    out += `<line class="ref" stroke-dasharray="4 4" x1="${L}" x2="${W - R}" y1="${y(15)}" y2="${y(15)}"/><text class="lbl" x="${x(11)}" y="${y(15) - 7}">15 runs: the paper’s cells</text>`;
    out += `<path class="ln" d="${DIFF.map((d, i) => `${i ? "L" : "M"}${x(d)},${y(need(d))}`).join(" ")}"/>`;
    DIFF.forEach(d => {
      const n = need(d), key = d === 27;
      out += `<g class="pt" tabindex="0" data-tip="${esc(`<b>${d} points</b>about ${n} runs per arm`)}"><circle class="hit" cx="${x(d)}" cy="${y(n)}" r="17"/><circle class="dot f1 anchor" cx="${x(d)}" cy="${y(n)}" r="${key ? 7 : 5}"/></g>`;
      if (key) out += `<text class="lbl" x="${x(d) + 11}" y="${y(n) - 11}">27 points (S vs. none): ${n} runs</text>`;
    });
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Runs needed per arm fall from about ${need(10)} for a 10 point difference to about ${need(45)} for 45 points. The paper's 15 runs per cell only detect differences of around 45 points.">${out}</svg>`;
  };
  const powerTable = () => tbl("Table view of the runs needed", ["Difference", "Runs per arm"], DIFF.map(d => ({ cells: [`${d} points`, `${need(d)}`] })));

  return { FAIL, ARMS, ciTable, powerTable, need };
})();
