// Data and charts of the proposal page "WireBench": a benchmark for the research project "Context-Aware Code
// Development with AI Assistance" (CMS-PRO). Charts by name for RPViz.mount; colours from the page's --vz-* tokens
// (slot 1 blue = existing project code, slot 2 orange = code the model writes, slot 3 aqua = reference change,
// gray = reference marks). Citation counts: Semantic Scholar Graph API, read on 29 Oct 2026.
window.WB = (function () {
  const { esc, num, hbar, CHARTS, tbl } = RPViz;

  // ---------------------------------------------------------------------------------------------------------
  // 1. The hero: one Highscore feature wired into an existing game, as a call graph. Two views (the reference
  //    change and one model attempt) and a context radius around the edit site Game.onGameOver().
  // ---------------------------------------------------------------------------------------------------------
  const N = {
    loop:    { x: 92,  y: 54,  label: "GameLoop.update()", kind: "old" },
    over:    { x: 92,  y: 150, label: "Game.onGameOver()", kind: "old", site: true },
    menu:    { x: 92,  y: 250, label: "Menu.render()", kind: "old" },
    score:   { x: 330, y: 40,  label: "Score.get()", kind: "old" },
    save:    { x: 590, y: 150, label: "SaveStore.write()", kind: "old" },
    add:     { x: 330, y: 150, label: "Highscore.add()", kind: "new" },
    top:     { x: 330, y: 250, label: "Highscore.top()", kind: "new" },
    dup:     { x: 520, y: 250, label: "Highscore.writeFile()", kind: "new", only: "model" },
    ghost:   { x: 590, y: 54,  label: "Persistence.save()", kind: "ghost", only: "model" },
  };
  // Edges of the code base before the change (all four are context, never scored).
  const OLD = [["loop", "over"], ["over", "score"], ["menu", "score"], ["menu", "save"]];
  // The reference change: two wiring edges into the feature, two reuse edges out of it.
  const REF = [
    { a: "over", b: "add", role: "wire", why: "the game must call the feature when a round ends" },
    { a: "menu", b: "top", role: "wire", why: "the menu must show the ranked list" },
    { a: "add", b: "score", role: "reuse", why: "read the score from the live game object" },
    { a: "add", b: "save", role: "reuse", why: "persist through the store the game already has" },
  ];
  // One model attempt, single shot: it wires the round end and reads the score, but writes its own file helper,
  // calls a persistence class that does not exist, and never hooks the list into the menu.
  const MODEL = [
    { a: "over", b: "add", state: "ok", note: "required wiring edge present" },
    { a: "add", b: "score", state: "ok", note: "reuses the existing score accessor" },
    { a: "add", b: "dup", state: "dup", note: "re-implements file writing instead of calling SaveStore.write()" },
    { a: "add", b: "ghost", state: "phantom", note: "calls a class that exists nowhere in the project: the build fails" },
    { a: "menu", b: "top", state: "missing", note: "required wiring edge absent: the list is never shown" },
  ];
  // Hops from the edit site in the graph before the change (undirected), i.e. what a radius-k context contains.
  const HOPS = { over: 0, loop: 1, score: 1, menu: 2, save: 3 };
  const HERO = { view: "model", k: 2 };
  const inCtx = id => HOPS[id] !== undefined && HOPS[id] <= HERO.k;

  // The exact checks, computed from the two edge sets (the same functions score every task of the benchmark).
  function score() {
    const got = new Set(MODEL.filter(e => e.state === "ok").map(e => e.a + ">" + e.b));
    const wire = REF.filter(e => e.role === "wire"), reuse = REF.filter(e => e.role === "reuse");
    return {
      wire: [wire.filter(e => got.has(e.a + ">" + e.b)).length, wire.length],
      reuse: [reuse.filter(e => got.has(e.a + ">" + e.b)).length, reuse.length],
      phantom: MODEL.filter(e => e.state === "phantom").length,
      dup: MODEL.filter(e => e.state === "dup").length,
      ctxNodes: Object.keys(HOPS).filter(inCtx).length,
      reuseInCtx: reuse.filter(e => inCtx(e.b)).length,
    };
  }

  CHARTS.hero = narrow => {
    const W = 680, H = 300, view = HERO.view, s = narrow ? 0.98 : 1;
    const nodes = Object.entries(N).filter(([, n]) => !n.only || n.only === view);
    const pos = id => N[id];
    const box = n => { const w = Math.max(118, n.label.length * 7.4 + 22); return { w, h: 30, x: n.x - w / 2, y: n.y - 15 }; };
    // Edge from the border of a's box to the border of b's box, with an arrow head.
    const seg = (a, b) => { const A = pos(a), B = pos(b), ba = box(A), bb = box(B);
      const dx = B.x - A.x, dy = B.y - A.y, len = Math.hypot(dx, dy) || 1, ux = dx / len, uy = dy / len;
      const clip = (bx, ux, uy) => Math.min(Math.abs((bx.w / 2) / (ux || 1e-9)), Math.abs((bx.h / 2) / (uy || 1e-9)));
      const t0 = clip(ba, ux, uy) + 3, t1 = clip(bb, ux, uy) + 6;
      return { x1: A.x + ux * t0, y1: A.y + uy * t0, x2: B.x - ux * t1, y2: B.y - uy * t1, mx: (A.x + B.x) / 2, my: (A.y + B.y) / 2 }; };
    const ctxRing = Object.keys(HOPS).filter(inCtx);
    let out = `<defs>
      <marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="ah-old"/></marker>
      <marker id="ah-new" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="ah-new"/></marker>
      <marker id="ah-ref" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="ah-ref"/></marker>
      <marker id="ah-bad" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="ah-bad"/></marker></defs>`;
    // Context halo: the nodes a radius-k graph context would put into the prompt.
    out += ctxRing.map(id => { const b = box(N[id]); return `<rect class="halo" x="${b.x - 7}" y="${b.y - 7}" width="${b.w + 14}" height="${b.h + 14}" rx="12"/>`; }).join("");
    out += OLD.map(([a, b]) => { const g = seg(a, b); return `<line class="e-old" x1="${g.x1}" y1="${g.y1}" x2="${g.x2}" y2="${g.y2}" marker-end="url(#ah)"/>`; }).join("");
    const badge = (x, y, sym, cls, tip) => `<g class="pt" tabindex="0" data-tip="${esc(tip)}"><circle class="hit" cx="${x}" cy="${y}" r="16"/><circle class="badge ${cls} anchor" cx="${x}" cy="${y}" r="10"/><text class="badge-t" x="${x}" y="${y + 4}" text-anchor="middle">${sym}</text></g>`;
    if (view === "ref") {
      out += REF.map(e => { const g = seg(e.a, e.b);
        return `<line class="e-ref" x1="${g.x1}" y1="${g.y1}" x2="${g.x2}" y2="${g.y2}" marker-end="url(#ah-ref)"/>` +
          badge(g.mx, g.my, e.role === "wire" ? "W" : "R", "b-ref", `<b>${e.role === "wire" ? "Wiring edge" : "Reuse edge"}: ${N[e.a].label} → ${N[e.b].label}</b>${e.why}`); }).join("");
    } else {
      out += MODEL.map(e => { const g = seg(e.a, e.b), bad = e.state === "missing" || e.state === "phantom";
        const cls = e.state === "missing" ? "e-missing" : e.state === "phantom" ? "e-phantom" : "e-new";
        const sym = { ok: "✓", dup: "≈", phantom: "?", missing: "✗" }[e.state], bcls = { ok: "b-ok", dup: "b-warn", phantom: "b-bad", missing: "b-bad" }[e.state];
        return `<line class="${cls}" x1="${g.x1}" y1="${g.y1}" x2="${g.x2}" y2="${g.y2}" marker-end="url(#${bad ? "ah-bad" : "ah-new"})"/>` +
          badge(g.mx, g.my, sym, bcls, `<b>${N[e.a].label} → ${N[e.b].label}</b>${e.note}`); }).join("");
    }
    out += nodes.map(([id, n]) => { const b = box(n), dim = HOPS[id] !== undefined && !inCtx(id);
      const tip = n.kind === "ghost" ? "<b>Phantom target</b>No such class in the project. The call compiles to an unresolved symbol." :
        n.kind === "new" ? `<b>${n.label}</b>New code written for the task` :
        `<b>${n.label}</b>Existing project code · ${HOPS[id]} ${HOPS[id] === 1 ? "hop" : "hops"} from the edit site${inCtx(id) ? " · inside the context" : " · outside the context at this radius"}`;
      return `<g class="pt node n-${n.kind} ${dim ? "dim" : ""} ${n.site ? "site" : ""}" tabindex="0" data-tip="${esc(tip)}">
        <rect class="nb anchor" x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="${n.kind === "new" ? 15 : 6}"/>
        <text class="nl" x="${n.x}" y="${n.y + 4.5}" text-anchor="middle">${esc(n.label)}</text></g>`; }).join("");
    return `<svg viewBox="0 0 ${W} ${H}" style="max-width:${W * s}px" role="img" aria-label="Call graph of a Highscore feature wired into an existing game. ${view === "ref" ? "Reference change: two wiring edges into the feature and two reuse edges out of it." : "A model attempt: one wiring edge present, one missing, one reuse edge present, one helper duplicated, one call to a class that does not exist."}">${out}</svg>`;
  };

  function scorePanel() {
    const s = score(), pct = ([a, b]) => Math.round(100 * a / b);
    const row = (label, value, detail, cls = "") => `<div class="sc ${cls}"><div class="v">${value}</div><div class="l">${label}</div><div class="d">${detail}</div></div>`;
    if (HERO.view === "ref") return `<div class="scores">${row("Wiring edges", "2", "into the feature from the code that must trigger or show it")}${row("Reuse edges", "2", "out of the feature into helpers that already exist")}${row("Context at k = " + HERO.k, s.ctxNodes + " of 5", `existing nodes in the prompt · ${s.reuseInCtx} of 2 reuse targets visible`)}</div>`;
    return `<div class="scores">
      ${row("Wiring recall", pct(s.wire) + " %", `${s.wire[0]} of ${s.wire[1]} required edges present`, s.wire[0] < s.wire[1] ? "bad" : "ok")}
      ${row("Reuse recall", pct(s.reuse) + " %", `${s.reuse[0]} of ${s.reuse[1]} · ${s.dup} helper re-implemented`, s.reuse[0] < s.reuse[1] ? "warn" : "ok")}
      ${row("Phantom calls", String(s.phantom), "calls to symbols the project does not have", s.phantom ? "bad" : "ok")}
      ${row("Build", s.phantom ? "fails" : "passes", s.phantom ? "unresolved symbol, exactly the paper’s dominant failure" : "", s.phantom ? "bad" : "ok")}
    </div>`;
  }
  const heroTable = () => tbl("Table view of the graph", ["Edge", "Reference", "Model attempt"], [
    ...REF.map(e => { const m = MODEL.find(x => x.a === e.a && x.b === e.b); return { cells: [`${N[e.a].label} → ${N[e.b].label}`, e.role === "wire" ? "wiring" : "reuse", m ? (m.state === "ok" ? "present ✓" : "missing ✗") : (e.b === "save" ? "absent: duplicated in Highscore.writeFile()" : "missing ✗")] }; }),
    { cells: ["Highscore.add() → Persistence.save()", "—", "phantom call ?"] },
    { cells: ["Highscore.add() → Highscore.writeFile()", "—", "duplicate helper ≈"] },
  ]);

  // ---------------------------------------------------------------------------------------------------------
  // 2. The landscape: benchmarks by year and by what they ask of a model. Filled = scored by running tests,
  //    ring = scored by matching a reference text. Every entry was checked against arXiv on 29 Oct 2026.
  // ---------------------------------------------------------------------------------------------------------
  const LANES = ["Single functions", "Complete code inside a repo", "Generate code inside a repo", "Resolve real issues (agents)", "Measure context use"];
  const BENCH = [
    { n: "HumanEval", y: 2021.5, lane: 0, tests: true, id: "2107.03374", v: "Chen et al., 2021", d: "164 hand-written Python problems scored by unit tests; introduced pass@k." },
    { n: "RepoEval", y: 2023.2, lane: 1, tests: true, id: "2303.12570", v: "with RepoCoder, EMNLP 2023", d: "Line, API and function completion in real repositories; the function level is scored by tests." },
    { n: "RepoBench", y: 2023.45, lane: 1, tests: false, id: "2306.03091", v: "ICLR 2024", d: "Retrieval, completion and the full pipeline across files; scored by exact match and edit similarity." },
    { n: "CrossCodeEval", y: 2023.8, lane: 1, tests: false, id: "2310.11248", v: "2023", d: "Completions that are only solvable with cross-file context, in four languages; scored by matching." },
    { n: "CoderEval", y: 2023.1, lane: 2, tests: true, id: "2302.00288", v: "2023", d: "Pragmatic generation from real Python and Java projects, including functions that depend on their surroundings." },
    { n: "EvoCodeBench", y: 2024.25, lane: 2, tests: true, id: "2404.00599", v: "2024", d: "Repository-aligned generation that is refreshed over time to limit training-data leakage." },
    { n: "DevEval", y: 2024.4, lane: 2, tests: true, id: "2405.19856", v: "2024", d: "Manually annotated generation tasks aligned with real repositories." },
    { n: "JavaBench", y: 2024.45, lane: 2, tests: true, id: "2406.12902", v: "ASE 2024", d: "Object-oriented Java projects: classes and methods that must work together." },
    { n: "RepoExec", y: 2024.55, lane: 2, tests: true, id: "2406.11927", v: "NAACL 2025", d: "Executability, functional correctness and whether cross-file dependencies are actually used." },
    { n: "REPOCOD", y: 2024.8, lane: 2, tests: true, id: "2410.21647", v: "2024", d: "Whole functions from popular projects, scored by the projects’ own tests." },
    { n: "FEA-Bench", y: 2025.2, lane: 2, tests: true, id: "2503.06680", v: "ACL 2025", d: "Implementing new features from real pull requests, the closest task to the paper’s feature tasks." },
    { n: "SWE-bench", y: 2023.78, lane: 3, tests: true, id: "2310.06770", v: "ICLR 2024", d: "2,294 GitHub issues from 12 Python repositories; a fix counts when the hidden tests pass." },
    { n: "SWE-bench Verified", y: 2024.6, lane: 3, tests: true, id: null, v: "OpenAI, 2024", d: "A human-validated subset of 500 SWE-bench issues; the most quoted agent number today." },
    { n: "SWE-Bench Pro", y: 2025.72, lane: 3, tests: true, id: "2509.16941", v: "2025", d: "1,865 long-horizon problems from 41 repositories, partly held out and partly commercial." },
    { n: "CodeRAG-Bench", y: 2024.47, lane: 4, tests: true, id: "2406.14497", v: "NAACL 2025", d: "Does retrieval from docs, tutorials, posts or repositories help generation? Scored by tests." },
    { n: "SWE-ContextBench", y: 2026.1, lane: 4, tests: true, id: "2602.08316", v: "2026", d: "1,100 base tasks plus 376 related ones: do agents reuse what they learned on an earlier task?" },
    { n: "ReCUBE", y: 2026.23, lane: 4, tests: true, id: "2603.25770", v: "2026", d: "Rebuild a masked file from the rest of the repo, scored by usage-aware tests. GPT-5 reaches 37.57 % strict pass with full context." },
    { n: "Litvak et al.", y: 2026.6, lane: 4, tests: true, id: null, v: "the supervisor’s paper, 2026", d: "Typed context (structural, behavioural, functional) × generation vs reuse, 240 runs; compile and test rates." },
  ];
  CHARTS.landscape = narrow => {
    const W = narrow ? 360 : 860, L = narrow ? 8 : 214, R = narrow ? 14 : 84, T = narrow ? 8 : 12, B = 30, rowH = narrow ? 16 : 19;
    const x0 = 2021, x1 = 2027.3, x = y => L + (y - x0) / (x1 - x0) * (W - L - R);
    const items = BENCH.map(b => ({ ...b })).concat([{ n: "WireBench", y: 2026.95, lane: 4, prop: true }]);
    // Each dot owns the span of its label; a dot whose span overlaps one already in the row moves one row down.
    const span = b => narrow ? [x(b.y) - 7, x(b.y) + 7] : [x(b.y) - 7, x(b.y) + 12 + b.n.length * 6.6];
    const rows = LANES.map(() => []);
    items.sort((a, b) => a.y - b.y).forEach(b => { const [s0, s1] = span(b); let r = 0;
      while ((rows[b.lane][r] || []).some(([a0, a1]) => s0 < a1 + 4 && a0 < s1 + 4)) r++;
      (rows[b.lane][r] = rows[b.lane][r] || []).push([s0, s1]); b.row = r; });
    const laneH = rows.map(r => Math.max(2, r.length) * rowH + (narrow ? 24 : 14));
    const laneY = laneH.map((_, i) => T + laneH.slice(0, i).reduce((a, v) => a + v, 0)), bottom = laneY[LANES.length - 1] + laneH[LANES.length - 1];
    const H = bottom + B;
    let out = "";
    LANES.forEach((l, i) => { const y = laneY[i];
      out += `<line class="grid" x1="${L}" x2="${W - R}" y1="${y + laneH[i]}" y2="${y + laneH[i]}"/>`;
      out += narrow ? `<text class="cat" x="${L}" y="${y + 13}" font-size="11.5">${l}</text>` : `<text class="cat" x="${L - 12}" y="${y + laneH[i] / 2 + 4}" text-anchor="end">${l}</text>`; });
    for (let yr = 2021; yr <= 2027; yr++) out += `<text class="tick" x="${x(yr)}" y="${H - 10}" text-anchor="middle">${narrow && yr % 2 ? "" : yr}</text><line class="grid" x1="${x(yr)}" x2="${x(yr)}" y1="${T}" y2="${bottom}" stroke-dasharray="2 4"/>`;
    out += items.map(b => { const cx = x(b.y), cy = laneY[b.lane] + (narrow ? 30 : 16) + b.row * rowH;
      if (b.prop) return `<g class="pt" tabindex="0" data-tip="<b>WireBench (this proposal)</b>Planned for 2027: typed and graph context as the controlled variable, generation vs reuse, exact graph-derived integration metrics plus tests.">
        <circle class="hit" cx="${cx}" cy="${cy}" r="13"/><path class="prop anchor" d="M${cx},${cy - 7} L${cx + 7},${cy} L${cx},${cy + 7} L${cx - 7},${cy} Z"/>
        ${narrow ? "" : `<text class="dl strong" x="${cx + 10}" y="${cy + 4}">WireBench</text>`}</g>`;
      return `<g class="pt" tabindex="0" data-tip="${esc(`<b>${b.n}</b>${b.v}${b.id ? ` · arXiv ${b.id}` : ""}<br>${b.d}<br><i>${b.tests ? "Scored by running tests" : "Scored by matching a reference"}</i>`)}">
        <circle class="hit" cx="${cx}" cy="${cy}" r="12"/>
        <circle class="bdot anchor ${b.tests ? "tests" : "match"} ${b.n.startsWith("Litvak") ? "paper" : ""}" cx="${cx}" cy="${cy}" r="5.5"/>
        ${narrow ? "" : `<text class="dl" x="${cx + 9}" y="${cy + 4}">${b.n}</text>`}</g>`; }).join("");
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Timeline of ${BENCH.length} code benchmarks from 2021 to 2026 in five lanes, from single functions to measuring context use; almost all are scored by running tests, three by matching a reference.">${out}</svg>`;
  };
  const landscapeTable = () => tbl("Table view of the landscape", ["Benchmark", "Year", "What it asks", "Scoring", "Source"],
    BENCH.slice().sort((a, b) => a.y - b.y).map(b => ({ cells: [b.n, String(Math.floor(b.y)), LANES[b.lane], b.tests ? "tests" : "matching", b.id ? `<a href="https://arxiv.org/abs/${b.id}" target="_blank" rel="noopener">arXiv ${b.id}</a>` : esc(b.v)] })));

  // What each close neighbour covers, against the five properties the proposal needs. 2 = yes, 1 = partly, 0 = no.
  const PROPS = ["Code must integrate into a real project", "Context type is the controlled variable", "Generation vs reuse", "Exact structural integration metrics", "Executable tests"];
  const COVER = [
    { n: "SWE-bench", v: [2, 0, 0, 0, 2] },
    { n: "FEA-Bench", v: [2, 0, 0, 0, 2] },
    { n: "RepoExec", v: [2, 1, 0, 1, 2], note: "measures whether provided dependencies are invoked" },
    { n: "CodeRAG-Bench", v: [1, 2, 0, 0, 2] },
    { n: "ReCUBE", v: [2, 1, 0, 0, 2], note: "four context settings; caller-centric tools for agents" },
    { n: "Litvak et al. 2026", v: [2, 2, 2, 0, 2] },
    { n: "WireBench", v: [2, 2, 2, 2, 2], prop: true },
  ];
  function coverage() {
    const sym = v => v === 2 ? `<span class="cv y" title="yes">●</span>` : v === 1 ? `<span class="cv p" title="partly">◐</span>` : `<span class="cv n" title="no">○</span>`;
    return `<div class="tw cover"><table><thead><tr><th></th>${PROPS.map(p => `<th>${p}</th>`).join("")}</tr></thead><tbody>${COVER.map(r => `<tr class="${r.prop ? "prop" : ""}"><th>${r.n}${r.note ? `<small>${r.note}</small>` : ""}</th>${r.v.map(v => `<td>${sym(v)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
      <p class="legend-line"><span class="cv y">●</span> yes <span class="cv p">◐</span> partly <span class="cv n">○</span> no · read from each paper’s abstract and benchmark description on 29 Oct 2026; recheck in the literature review.</p>`;
  }

  // ---------------------------------------------------------------------------------------------------------
  // 3. Influence: citations of the three papers chosen, with three runners-up in gray for scale.
  // ---------------------------------------------------------------------------------------------------------
  const CITES = [
    { n: "Chen et al. 2021 · Codex / HumanEval", c: 12500, top: true },
    { n: "Liu et al. 2023 · Lost in the Middle", c: 5746 },
    { n: "Jimenez et al. 2024 · SWE-bench", c: 4627, top: true },
    { n: "Yang et al. 2024 · SWE-agent", c: 2322 },
    { n: "Zhang et al. 2023 · RepoCoder", c: 646, top: true },
    { n: "Liu et al. 2024 · RepoBench", c: 483 },
  ];
  CHARTS.cites = narrow => {
    const W = narrow ? 360 : 760, L = narrow ? 8 : 262, R = narrow ? 52 : 70, T = 6, bh = narrow ? 14 : 18, gap = narrow ? 30 : 14, max = 13000;
    const x = v => L + v / max * (W - L - R), H = T + CITES.length * (bh + gap) + 24;
    let out = [0, 5000, 10000].map(v => `<line class="grid" x1="${x(v)}" x2="${x(v)}" y1="${T}" y2="${H - 22}"/><text class="tick" x="${x(v)}" y="${H - 6}" text-anchor="middle">${num(v)}</text>`).join("");
    CITES.forEach((d, i) => { const y = T + i * (bh + gap) + (narrow ? 16 : 0);
      out += `<g class="pt" tabindex="0" data-tip="${esc(`<b>${d.n}</b>${num(d.c)} citations (Semantic Scholar, 29 Oct 2026)${d.top ? "" : " · runner-up, shown for scale"}`)}">
        <rect class="hit" x="${L}" y="${y - 3}" width="${W - L - R}" height="${bh + 6}"/>
        <path class="bar anchor ${d.top ? "s1" : "gray"}" d="${hbar(x(0), x(d.c), y, bh)}"/>
        <text class="${d.top ? "cat strong" : "cat"}" x="${narrow ? L : L - 10}" y="${narrow ? y - 5 : y + bh / 2 + 4}" text-anchor="${narrow ? "start" : "end"}" font-size="${narrow ? 11.5 : 13}">${d.n}</text>
        <text class="val" x="${x(d.c) + 6}" y="${y + bh / 2 + 4}">${num(d.c)}</text></g>`; });
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Citation counts: Codex and HumanEval 12,500; Lost in the Middle 5,746; SWE-bench 4,627; SWE-agent 2,322; RepoCoder 646; RepoBench 483.">${out}</svg>`;
  };
  const citesTable = () => tbl("Table view of the citation counts", ["Paper", "Citations", "Chosen"], CITES.map(d => ({ cells: [d.n, num(d.c), d.top ? "yes" : "runner-up"] })));

  // ---------------------------------------------------------------------------------------------------------
  // 4. The plan: five phases over about 20 weeks of project time.
  // ---------------------------------------------------------------------------------------------------------
  const PHASES = [
    { n: "Replicate the paper with AST-derived context", a: 1, b: 4, d: "Rerun the apo-games study with context from a parser instead of regular expressions: the paper names this as the next step." },
    { n: "Graph-diff scoring harness", a: 3, b: 7, d: "Derive the call graph before and after each run; implement wiring recall, reuse recall, phantom calls, duplicated helpers, collateral edits." },
    { n: "Mine task families B–D", a: 6, b: 11, d: "Signature propagation, reuse-or-reimplement and wiring tasks from real commits, half after the models’ training cutoff." },
    { n: "Run the context grid", a: 10, b: 15, d: "8 context conditions × 3 models × 3 runs on every task, token budget matched across conditions." },
    { n: "Analysis and case-study paper", a: 14, b: 20, d: "Effects with confidence intervals, an error taxonomy of failed builds, and the paper draft with the team." },
  ];
  const MILES = [{ w: 4, t: "Replication numbers next to the paper’s Table 2" }, { w: 11, t: "Benchmark v0 frozen" }, { w: 20, t: "Paper draft" }];
  CHARTS.plan = narrow => {
    const W = narrow ? 360 : 860, L = narrow ? 8 : 300, R = 16, T = 22, rh = narrow ? 40 : 30, x = w => L + (w - 1) / 20 * (W - L - R), H = T + PHASES.length * rh + 34;
    let out = [1, 5, 10, 15, 20].map(w => `<line class="grid" x1="${x(w)}" x2="${x(w)}" y1="${T - 4}" y2="${H - 30}"/><text class="tick" x="${x(w)}" y="${T - 9}" text-anchor="middle">wk ${w}</text>`).join("");
    PHASES.forEach((p, i) => { const y = T + i * rh + (narrow ? 14 : 6), h = narrow ? 13 : 16;
      out += `<g class="pt" tabindex="0" data-tip="${esc(`<b>${p.n}</b>weeks ${p.a}–${p.b}<br>${p.d}`)}"><rect class="hit" x="${L}" y="${y - 4}" width="${W - L - R}" height="${h + 8}"/>
        <rect class="bar s1 anchor" x="${x(p.a)}" y="${y}" width="${x(p.b + 1) - x(p.a) - 2}" height="${h}" rx="4"/>
        <text class="cat" x="${narrow ? L : L - 10}" y="${narrow ? y - 4 : y + h / 2 + 4}" text-anchor="${narrow ? "start" : "end"}" font-size="${narrow ? 11.5 : 13}">${p.n}</text></g>`; });
    const my = H - 18;
    out += `<line class="axis" x1="${L}" x2="${W - R}" y1="${my}" y2="${my}"/>` + MILES.map(m => `<g class="pt" tabindex="0" data-tip="${esc(`<b>Milestone, week ${m.w}</b>${m.t}`)}"><circle class="hit" cx="${x(m.w + 1) - 2}" cy="${my}" r="12"/><path class="mile anchor" d="M${x(m.w + 1) - 2},${my - 7} l7,7 l-7,7 l-7,-7 z"/></g>`).join("");
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Plan over 20 weeks in five overlapping phases, from replicating the paper to the paper draft, with milestones in weeks 4, 11 and 20.">${out}</svg>`;
  };

  return { HERO, scorePanel, heroTable, landscapeTable, coverage, citesTable, PHASES };
})();
