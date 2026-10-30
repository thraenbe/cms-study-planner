// Data and charts of the page "Three papers on agents and context for code" (CMS-PRO). Charts by name for RPViz.mount;
// colours from the page's --vz-* tokens. Colour follows the criterion across the page: slot 1 blue = citations,
// slot 2 orange = build-on, slot 3 aqua = practice, gray = comparison marks. Every number here was read on 30 Oct 2026
// from the source named next to it; scores are computed below from these raw numbers, not typed in.
window.AC = (function () {
  const { esc, num, hbar, vbar, CHARTS, tbl } = RPViz;
  const ax = id => `<a href="https://arxiv.org/abs/${id}" target="_blank" rel="noopener">${id}</a>`;
  const READ = 2026.83;  // 30 Oct 2026, for citations per year

  // s2 = Semantic Scholar, gs = Google Scholar main record (null: Scholar blocked the lookup), oa = OpenAlex best single
  // record (null: none found). a / b = panel papers citing it, out of 29 agent papers and 16 context papers.
  // p = the three practice checks: design reused elsewhere, lab or vendor use, still in use by name.
  const C = [
    { n: "ReAct", id: "2210.03629", yr: 2022.76, by: "Yao et al.", v: "ICLR 2023", s2: 13243, gs: 18505, oa: 607, a: 6, b: 4, p: [1, 1, 1], code: false, kind: "agent loop" },
    { n: "Reflexion", id: "2303.11366", yr: 2023.21, by: "Shinn et al.", v: "NeurIPS 2023", s2: 6404, gs: 9168, oa: 1061, a: 1, b: 3, p: [1, 0, 0], code: false, kind: "agent loop" },
    { n: "Toolformer", id: "2302.04761", yr: 2023.11, by: "Schick et al.", v: "NeurIPS 2023", s2: 6402, gs: 8402, oa: 1146, a: 2, b: 3, p: [0, 0, 0], code: false, kind: "tool use" },
    { n: "Lost in the Middle", id: "2307.03172", yr: 2023.51, by: "Liu et al.", v: "TACL 2024", s2: 5753, gs: 7462, oa: 1592, a: 2, b: 3, p: [0, 0, 0], code: false, kind: "context" },
    { n: "SWE-bench", id: "2310.06770", yr: 2023.77, by: "Jimenez et al.", v: "ICLR 2024", s2: 4630, gs: 5660, oa: 71, a: 27, b: 12, p: [1, 1, 1], code: true, kind: "benchmark" },
    { n: "SWE-agent", id: "2405.15793", yr: 2024.34, by: "Yang et al.", v: "NeurIPS 2024", s2: 2324, gs: 3461, oa: null, a: 21, b: 12, p: [1, 1, 1], code: true, kind: "agent" },
    { n: "OpenHands", id: "2407.16741", yr: 2024.56, by: "Wang et al.", v: "ICLR 2025", s2: 1291, gs: 1422, oa: 23, a: 18, b: 9, p: [0, 0, 1], code: true, kind: "agent" },
    { n: "AutoCodeRover", id: "2404.05427", yr: 2024.26, by: "Zhang et al.", v: "ISSTA 2024", s2: 534, gs: 890, oa: 202, a: 11, b: 4, p: [1, 0, 0], code: true, kind: "agent" },
    { n: "Agentless", id: "2407.01489", yr: 2024.5, by: "Xia et al.", v: "PACM SE 2025", s2: 564, gs: 367, oa: 24, a: 13, b: 8, p: [0, 0, 0], code: true, kind: "agent" },
    { n: "MetaGPT", id: "2308.00352", yr: 2023.58, by: "Hong et al.", v: "ICLR 2024", s2: 2730, gs: 4631, oa: 235, a: 3, b: 3, p: [0, 0, 1], code: true, kind: "agent" },
    { n: "AgentCoder", id: "2312.13010", yr: 2023.97, by: "Huang et al.", v: "arXiv 2023", s2: 484, gs: 560, oa: 34, a: 6, b: 0, p: [0, 0, 0], code: true, kind: "agent" },
    { n: "RepoCoder", id: "2303.12570", yr: 2023.22, by: "Zhang et al.", v: "EMNLP 2023", s2: 647, gs: 746, oa: 171, a: 1, b: 5, p: [0, 0, 0], code: true, kind: "context" },
    { n: "RepoBench", id: "2306.03091", yr: 2023.43, by: "Liu et al.", v: "ICLR 2024", s2: 483, gs: 506, oa: 23, a: 4, b: 2, p: [0, 0, 0], code: true, kind: "context" },
    { n: "CrossCodeEval", id: "2310.11248", yr: 2023.8, by: "Ding et al.", v: "NeurIPS 2023", s2: 334, gs: 378, oa: 36, a: 1, b: 3, p: [0, 0, 0], code: true, kind: "context" },
    { n: "DocPrompting", id: "2207.05987", yr: 2022.53, by: "Zhou et al.", v: "ICLR 2023", s2: 252, gs: 331, oa: 33, a: 0, b: 1, p: [0, 0, 0], code: true, kind: "context" },
    { n: "RepoGraph", id: "2410.14684", yr: 2024.76, by: "Ouyang et al.", v: "ICLR 2025", s2: 147, gs: 156, oa: 2, a: 2, b: 7, p: [0, 0, 0], code: true, kind: "code graph" },
    { n: "GraphCoder", id: "2406.07003", yr: 2024.44, by: "Liu et al.", v: "arXiv 2024", s2: 67, gs: 75, oa: 6, a: 0, b: 6, p: [0, 0, 0], code: true, kind: "code graph" },
    { n: "CodexGraph", id: "2408.03910", yr: 2024.6, by: "Liu et al.", v: "NAACL 2025", s2: 114, gs: null, oa: 20, a: 0, b: 2, p: [0, 0, 0], code: true, kind: "code graph" },
    { n: "LocAgent", id: "2503.09089", yr: 2025.19, by: "Chen et al.", v: "ACL 2025", s2: 141, gs: null, oa: 15, a: 2, b: 2, p: [0, 0, 0], code: true, kind: "code graph" },
    { n: "PAL", id: "2211.10435", yr: 2022.88, by: "Gao et al.", v: "ICML 2023", s2: 898, gs: null, oa: 155, a: 0, b: 0, p: [0, 0, 0], code: false, kind: "code as reasoning" },
  ];
  const NA = 29, NB = 16;

  // Scoring: each criterion runs from 0 to 5, so the sum runs from 0 to 15.
  const logScale = get => { const v = C.map(get).map(Math.log10), lo = Math.min(...v), hi = Math.max(...v); return c => 5 * (Math.log10(get(c)) - lo) / (hi - lo); };
  const cS2 = logScale(c => c.s2), cGs = logScale(c => c.gs ?? c.s2), cYr = logScale(c => c.s2 / (READ - c.yr));
  const bAll = c => 5 * (c.a / NA + c.b / NB) / 2, bA = c => 5 * c.a / NA, bB = c => 5 * c.b / NB;
  const prac = c => c.p.reduce((s, x) => s + x, 0) * 5 / 3;
  const LENSES = [
    { id: "equal", t: "Equal weights", c: cS2, b: bAll, p: prac, main: true },
    { id: "cites", t: "Citations only", c: cS2, b: null, p: null, main: true },
    { id: "build", t: "Build-on only", c: null, b: bAll, p: null, main: true },
    { id: "prac", t: "Practice only", c: null, b: null, p: prac, main: true },
    { id: "nojudge", t: "No judgement: drop practice", c: cS2, b: bAll, p: null, main: true },
    { id: "code", t: "Code papers only", c: cS2, b: bAll, p: prac, only: c => c.code, main: true },
    { id: "gs", t: "Google Scholar counts", c: cGs, b: bAll, p: prac },
    { id: "year", t: "Citations per year", c: cYr, b: bAll, p: prac },
    { id: "pa", t: "Agent panel only", c: cS2, b: bA, p: prac },
    { id: "pb", t: "Context panel only", c: cS2, b: bB, p: prac },
  ];
  const STATE = { lens: "equal" };
  const scored = l => C.filter(c => !l.only || l.only(c)).map(c => { const sc = l.c ? l.c(c) : 0, sb = l.b ? l.b(c) : 0, sp = l.p ? l.p(c) : 0; return { ...c, sc, sb, sp, t: sc + sb + sp }; }).sort((x, y) => y.t - x.t || y.s2 - x.s2);
  const f1 = v => v.toFixed(1);
  const TOP = ["SWE-bench", "SWE-agent", "ReAct"];

  CHARTS.score = narrow => {
    const l = LENSES.find(x => x.id === STATE.lens), rows = scored(l);
    const parts = [["sc", "s1", "Citations"], ["sb", "s2", "Build-on"], ["sp", "s3", "Practice"]].filter(([k]) => l[k[1]]);
    const W = narrow ? 360 : 760, L = narrow ? 8 : 178, R = 44, T = 6, bh = narrow ? 11 : 15, gap = narrow ? 24 : 9, step = bh + gap;
    const max = parts.length * 5, x = v => L + v / max * (W - L - R), H = T + rows.length * step + 22;
    let out = Array.from({ length: parts.length + 1 }, (_, i) => i * 5).map(v => `<line class="grid" x1="${x(v)}" x2="${x(v)}" y1="${T}" y2="${H - 22}"/><text class="tick" x="${x(v)}" y="${H - 6}" text-anchor="middle">${v}</text>`).join("");
    rows.forEach((r, i) => { const y = T + i * step + (narrow ? 14 : 0), win = i < 3; let acc = 0;
      const segs = parts.map(([k, cls]) => { const a = x(acc) + (acc ? 1 : 0), b = x(acc + r[k]) - 1; acc += r[k]; return b > a + .5 ? `<path class="bar ${cls}" d="${hbar(a, b, y, bh)}"/>` : ""; }).join("");
      const tip = `<b>${r.n}</b>${r.by}, ${r.v}<br>${parts.map(([k, , t]) => `${t} ${f1(r[k])}`).join(" · ")}<br>Total ${f1(r.t)} of ${max}`;
      out += `<g class="pt" tabindex="0" data-tip="${esc(tip)}"><rect class="hit" x="0" y="${y - gap / 2}" width="${W}" height="${step}"/>
        <rect class="anchor" x="${x(0)}" y="${y}" width="${Math.max(1, x(r.t) - x(0))}" height="${bh}" fill="none"/>${segs}
        <text class="${win ? "cat strong" : "cat"}" x="${narrow ? L : L - 10}" y="${narrow ? y - 4 : y + bh / 2 + 4}" text-anchor="${narrow ? "start" : "end"}" font-size="${narrow ? 12 : 13}">${i + 1}. ${esc(r.n)}</text>
        <text class="val" x="${x(r.t) + 6}" y="${y + bh / 2 + 4}">${f1(r.t)}</text></g>`; });
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Ranked scores of ${rows.length} papers under the lens ${esc(l.t)}. Top three: ${rows.slice(0, 3).map(r => `${r.n} ${f1(r.t)}`).join(", ")}.">${out}</svg>`;
  };
  const scoreTable = () => tbl("Table view of the scores, with raw numbers", ["Rank", "Paper", "Citations /5", "Build-on /5", "Practice /5", "Total /15", "Semantic Scholar", "Agent panel", "Context panel"],
    scored(LENSES[0]).map((r, i) => ({ cells: [i + 1, `${r.n} (${ax(r.id)})`, f1(r.sc), f1(r.sb), f1(r.sp), f1(r.t), num(r.s2), `${r.a}/${NA}`, `${r.b}/${NB}`] })));

  // Which papers hold the top three under each lens.
  function lensTable() {
    return `<div class="tw lt"><table><thead><tr><th>Lens</th><th>First</th><th>Second</th><th>Third</th><th>Fourth</th></tr></thead><tbody>${LENSES.map(l => { const r = scored(l);
      return `<tr><th>${l.t}</th>${[0, 1, 2, 3].map(i => `<td class="${i < 3 && !TOP.includes(r[i].n) ? "chg" : ""}">${esc(r[i].n)} <small>${f1(r[i].t)}</small></td>`).join("")}</tr>`; }).join("")}</tbody></table></div>`;
  }

  // Practice evidence: only pages that were opened. Rows without a mark have no entry.
  const PRACTICE = {
    ReAct: ["Sequential ReAct is the main loop in 7 of 13 open agents studied at source level", "LangGraph ships a prebuilt ReAct-style agent", "Named as a loop type in that source-level study"],
    "SWE-bench": ["7 of the 13 agents are built for SWE-bench evaluation; later benchmarks copy its shape", "OpenAI calls Verified a standard metric of frontier releases", "Reported on a public leaderboard"],
    "SWE-agent": ["DARS-Agent is a fork; a minimal successor comes from the same team", "Anthropic’s agent guide uses the ACI term, without naming the paper", "About 19k GitHub stars"],
    OpenHands: [null, null, "About 70k GitHub stars"],
    MetaGPT: [null, null, "71.1k GitHub stars"],
    Reflexion: ["Called foundational to the generate-test-repair loop", null, null],
    AutoCodeRover: ["AST-aware search also appears in 3 other studied agents", null, null],
  };
  const practiceTable = () => tbl("Table view of the practice evidence", ["Paper", "Design reused", "Lab or vendor use", "In use by name"],
    Object.entries(PRACTICE).map(([n, r]) => ({ cells: [n, ...r.map(x => x ? `✓ ${esc(x)}` : "no evidence found")] })));

  // ---------------------------------------------------------------------------------------------------------
  // Citation counts from three sources on one log axis, in the order of the Semantic Scholar count.
  // ---------------------------------------------------------------------------------------------------------
  CHARTS.sources = narrow => {
    const rows = C.slice().sort((a, b) => b.s2 - a.s2);
    const W = narrow ? 360 : 760, L = narrow ? 8 : 150, R = 18, T = 6, step = narrow ? 34 : 22, H = T + rows.length * step + 24;
    const lo = 0, hi = Math.log10(30000), x = v => L + (Math.log10(v) - lo) / (hi - lo) * (W - L - R);
    let out = [1, 10, 100, 1000, 10000].map(v => `<line class="grid" x1="${x(v)}" x2="${x(v)}" y1="${T}" y2="${H - 22}"/><text class="tick" x="${x(v)}" y="${H - 6}" text-anchor="middle">${num(v)}</text>`).join("");
    rows.forEach((r, i) => { const y = T + i * step + (narrow ? 25 : 11);
      const tip = `<b>${r.n}</b>Semantic Scholar ${num(r.s2)}<br>Google Scholar ${r.gs ? num(r.gs) : "not read"}<br>OpenAlex ${r.oa !== null ? num(r.oa) : "no record found"}`;
      out += `<g class="pt" tabindex="0" data-tip="${esc(tip)}"><rect class="hit" x="0" y="${y - step / 2}" width="${W}" height="${step}"/>
        <line class="grid" x1="${L}" x2="${W - R}" y1="${y}" y2="${y}"/>
        <text class="cat" x="${narrow ? L : L - 10}" y="${narrow ? y - 9 : y + 4}" text-anchor="${narrow ? "start" : "end"}" font-size="${narrow ? 12 : 13}">${esc(r.n)}</text>
        ${r.oa ? `<circle class="dot fg" cx="${x(r.oa)}" cy="${y}" r="4.5"/>` : ""}
        ${r.gs ? `<circle class="ring1" cx="${x(r.gs)}" cy="${y}" r="5"/>` : ""}
        <circle class="dot f1 anchor" cx="${x(r.s2)}" cy="${y}" r="4.5"/></g>`; });
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Citation counts of 20 papers from Semantic Scholar, Google Scholar and OpenAlex on a log axis. Semantic Scholar and Google Scholar stay close; OpenAlex is far lower for most preprints.">${out}</svg>`;
  };
  const sourcesTable = () => tbl("Table view of the citation counts", ["Paper", "Semantic Scholar", "Google Scholar", "OpenAlex (best record)", "Citations per year (S2)"],
    C.slice().sort((a, b) => b.s2 - a.s2).map(r => ({ cells: [r.n, num(r.s2), r.gs ? num(r.gs) : "not read", r.oa !== null ? num(r.oa) : "none found", num(r.s2 / (READ - r.yr))] })));

  // ---------------------------------------------------------------------------------------------------------
  // Share of each panel whose reference list contains the paper.
  // ---------------------------------------------------------------------------------------------------------
  CHARTS.panels = narrow => {
    const rows = C.slice().sort((a, b) => bAll(b) - bAll(a)).slice(0, 12);
    const W = narrow ? 360 : 760, L = narrow ? 8 : 150, R = 22, T = 6, step = narrow ? 34 : 24, H = T + rows.length * step + 24, x = v => L + v * (W - L - R);
    let out = [0, .25, .5, .75, 1].map(v => `<line class="grid" x1="${x(v)}" x2="${x(v)}" y1="${T}" y2="${H - 22}"/><text class="tick" x="${x(v)}" y="${H - 6}" text-anchor="middle">${v * 100} %</text>`).join("");
    rows.forEach((r, i) => { const y = T + i * step + (narrow ? 25 : 12), a = r.a / NA, b = r.b / NB;
      out += `<g class="pt" tabindex="0" data-tip="${esc(`<b>${r.n}</b>Cited by ${r.a} of ${NA} agent papers<br>and ${r.b} of ${NB} context papers`)}"><rect class="hit" x="0" y="${y - step / 2}" width="${W}" height="${step}"/>
        <line class="link" x1="${x(Math.min(a, b))}" x2="${x(Math.max(a, b))}" y1="${y}" y2="${y}"/>
        <text class="${TOP.includes(r.n) ? "cat strong" : "cat"}" x="${narrow ? L : L - 10}" y="${narrow ? y - 9 : y + 4}" text-anchor="${narrow ? "start" : "end"}" font-size="${narrow ? 12 : 13}">${esc(r.n)}</text>
        <circle class="ring2" cx="${x(b)}" cy="${y}" r="5.5"/><circle class="dot f2 anchor" cx="${x(a)}" cy="${y}" r="5"/></g>`; });
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Share of 2025 to 2026 papers that cite each candidate. SWE-bench leads with 27 of 29 agent papers and 12 of 16 context papers, then SWE-agent, then OpenHands. ReAct is cited by 6 of 29 and 4 of 16.">${out}</svg>`;
  };
  const panelsTable = () => tbl("Table view of the panels", ["Paper", `Agent panel (of ${NA})`, `Context panel (of ${NB})`], C.slice().sort((a, b) => bAll(b) - bAll(a)).map(r => ({ cells: [r.n, r.a, r.b] })));

  // Panel membership: arXiv id, title, panel, which of the three winners its reference list contains.
  const PANEL = [["2501.18160", "RepoAudit: An Autonomous LLM-Agent for Repository-Level Code Auditing", "agent", []], ["2502.00350", "OrcaLoca: An LLM Agent Framework for Software Issue Localization", "agent", ["ReAct", "SWE-bench", "SWE-agent"]], ["2502.13069", "Ambig-SWE: Interactive Agents to Overcome Underspecificity in Software Engineering", "agent", ["SWE-bench"]], ["2502.13681", "Repo2Run: Automated Building Executable Environment for Code Repository at Scale", "agent", ["ReAct", "SWE-bench", "SWE-agent"]], ["2503.14443", "EnvBench: A Benchmark for Automated Environment Setup", "agent", ["ReAct", "SWE-bench"]], ["2503.20589", "What to Retrieve for Effective Retrieval-Augmented Code Generation? An Empirical Study and Beyond", "context", []], ["2503.21710", "Enhancing repository-level software repair via repository-aware knowledge graphs", "context", ["SWE-bench", "SWE-agent"]], ["2504.08703", "SWE-PolyBench: A multi-language benchmark for repository level evaluation of coding agents", "agent", ["SWE-bench", "SWE-agent"]], ["2505.07473", "Web-Bench: A LLM Code Benchmark Based on Web Standards and Frameworks", "agent", ["SWE-bench", "SWE-agent"]], ["2505.16901", "Code Graph Model (CGM): A Graph-Integrated Large Language Model for Repository-Level Software Engineering Tasks", "context", ["SWE-bench", "SWE-agent"]], ["2505.20411", "SWE-rebench: An Automated Pipeline for Task Collection and Decontaminated Evaluation of Software Engineering Agents", "agent", ["SWE-bench"]], ["2506.11791", "SEC-bench: Automated Benchmarking of LLM Agents on Real-World Software Security Tasks", "agent", ["SWE-bench", "SWE-agent"]], ["2506.18824", "Understanding Software Engineering Agents: A Study of Thought-Action-Result Trajectories", "agent", ["SWE-bench", "SWE-agent"]], ["2506.19290", "Skywork-SWE: Unveiling Data Scaling Laws for Software Engineering in LLMs", "agent", ["SWE-bench", "SWE-agent"]], ["2507.12415", "SWE-Perf: Can Language Models Optimize Code Performance on Real-World Repositories?", "agent", ["SWE-bench", "SWE-agent"]], ["2507.19942", "Prometheus: Towards Long-Horizon Codebase Navigation for Repository-Level Problem Solving", "context", ["SWE-bench", "SWE-agent"]], ["2507.23348", "SWE-Debate: Competitive Multi-Agent Debate for Software Issue Resolution", "agent", ["SWE-bench", "SWE-agent"]], ["2507.23361", "SWE-Exp: Experience-Driven Software Issue Resolution", "agent", ["SWE-bench", "SWE-agent"]], ["2507.23370", "Trae Agent: An LLM-based Agent for Software Engineering with Test-time Scaling", "agent", ["SWE-bench", "SWE-agent"]], ["2508.21433", "The Complexity Trap: Simple Observation Masking Is as Efficient as LLM Summarization for Agent Context Management", "both", ["ReAct", "SWE-bench", "SWE-agent"]], ["2509.14635", "SWE-QA: Can Language Models Answer Repository-level Code Questions?", "both", ["SWE-bench", "SWE-agent"]], ["2509.16941", "SWE-Bench Pro: Can AI Agents Solve Long-Horizon Software Engineering Tasks?", "agent", ["SWE-bench", "SWE-agent"]], ["2509.23586", "Reducing Cost of LLM Agents with Trajectory Reduction", "both", ["ReAct", "SWE-bench", "SWE-agent"]], ["2510.21413", "Context Engineering for AI Agents in Open-Source Software", "context", ["SWE-agent"]], ["2511.00197", "Understanding Code Agent Behaviour: An Empirical Study of Success and Failure Trajectories", "context", []], ["2511.03690", "The OpenHands Software Agent SDK: A Composable and Extensible Foundation for Production Agents", "agent", ["SWE-bench"]], ["2511.12884", "Agent READMEs: An Empirical Study of Context Files for Agentic Coding", "both", ["SWE-bench"]], ["2511.13646", "Live-SWE-agent: Can Software Engineering Agents Self-Evolve on the Fly?", "agent", ["SWE-bench", "SWE-agent"]], ["2512.12730", "NL2Repo-Bench: Towards Long-Horizon Repository Generation Evaluation of Coding Agents", "agent", ["SWE-bench", "SWE-agent"]], ["2601.10112", "Repository Intelligence Graph: Deterministic Architectural Map for LLM Code Assistants", "context", []], ["2601.18341", "Agentic Much? Adoption of Coding Agents on GitHub", "agent", ["SWE-bench"]], ["2602.09185", "AIDev: Studying AI Coding Agents on GitHub", "agent", ["SWE-agent"]], ["2602.10975", "FeatureBench: Benchmarking Agentic Coding for Complex Feature Development", "agent", ["SWE-bench"]], ["2602.11988", "Evaluating AGENTS.md: Are Repository-Level Context Files Helpful for Coding Agents?", "context", ["SWE-bench", "SWE-agent"]], ["2603.15401", "SWE-Skills-Bench: Do Agent Skills Actually Help in Real-World Software Engineering?", "agent", ["ReAct", "SWE-bench", "SWE-agent"]], ["2603.25770", "ReCUBE: Evaluating Repository-Level Context Utilization in Code Generation", "context", ["SWE-bench", "SWE-agent"]], ["2604.03515", "Inside the Scaffold: A Source-Code Taxonomy of Coding Agent Architectures", "context", ["ReAct", "SWE-bench", "SWE-agent"]], ["2604.14228", "Dive into Claude Code: The Design Space of Today's and Future AI Agent Systems", "context", ["ReAct", "SWE-bench", "SWE-agent"]], ["2604.20779", "SWE-chat: Coding Agent Interactions From Real Users in the Wild", "agent", ["SWE-bench", "SWE-agent"]], ["2607.07946", "DeepSWE: Measuring Frontier Coding Agents on Original, Long-Horizon Engineering Tasks", "agent", ["SWE-bench", "SWE-agent"]], ["2609.16936", "RepoAtlas: Guiding Coding Agents via Evolving Multimodal Repository Views", "context", ["SWE-bench", "SWE-agent"]]];
  const panelList = () => tbl(`The ${PANEL.length} panel papers and which of the three each one cites`, ["Paper", "Panel", "SWE-bench", "SWE-agent", "ReAct"],
    PANEL.map(([id, t, g, hits]) => ({ cells: [`${esc(t)} (${ax(id)})`, g, ...TOP.map(n => hits.includes(n) ? "✓" : "")] })));

  // ---------------------------------------------------------------------------------------------------------
  // SWE-bench: two measures at three context sizes, drawn side by side on their own axes.
  // ---------------------------------------------------------------------------------------------------------
  const CTX = [{ k: "13k", r: 29.58, c: 1.96 }, { k: "27k", r: 44.41, c: 1.87 }, { k: "50k", r: 51.06, c: 1.22 }];
  CHARTS.context = narrow => {
    const W = narrow ? 360 : 560, gapX = 24, pw = narrow ? W : (W - gapX) / 2, ph = 158;
    const panel = (ox, oy, title, key, max, fmt) => { const b = 36, x0 = ox + 10, y0 = oy + 26, y1 = oy + ph - 24, step = (pw - 20) / 3, h = v => (y1 - y0) * v / max;
      return `<text class="lbl" x="${ox + 4}" y="${oy + 13}">${title}</text><line class="axis" x1="${x0}" x2="${ox + pw - 10}" y1="${y1}" y2="${y1}"/>` +
        CTX.map((d, i) => { const x = x0 + i * step + (step - b) / 2, v = d[key];
          return `<g class="pt" tabindex="0" data-tip="${esc(`<b>${d.k} tokens of context</b>${title}: ${fmt(v)}`)}"><rect class="hit" x="${x - 8}" y="${y0}" width="${b + 16}" height="${y1 - y0}"/>
            <path class="bar gray anchor" d="${vbar(x, b, y1 - h(v), y1)}"/><text class="val" x="${x + b / 2}" y="${y1 - h(v) - 5}" text-anchor="middle">${fmt(v)}</text><text class="tick" x="${x + b / 2}" y="${y1 + 15}" text-anchor="middle">${d.k}</text></g>`; }).join(""); };
    const one = panel(0, 0, "BM25 recall of the files that matter", "r", 62, v => v.toFixed(1) + " %");
    const two = panel(narrow ? 0 : pw + gapX, narrow ? ph + 8 : 0, "Issues resolved by Claude 2", "c", 2.4, v => v.toFixed(2) + " %");
    return `<svg viewBox="0 0 ${W} ${narrow ? ph * 2 + 8 : ph}" role="img" aria-label="As the context limit grows from 13k to 50k tokens, retrieval recall rises from 29.6 to 51.1 percent while resolved issues fall from 1.96 to 1.22 percent.">${one}${two}</svg>`;
  };
  const contextTable = () => tbl("Table view of the context sizes", ["Maximum context", "BM25 recall (avg.)", "Claude 2 resolved"], CTX.map(d => ({ cells: [d.k, d.r + " %", d.c + " %"] })));

  // ---------------------------------------------------------------------------------------------------------
  // SWE-agent: the eight ablations against the shipped interface (18.0 % on SWE-bench Lite).
  // ---------------------------------------------------------------------------------------------------------
  const ABL = [
    { g: "File viewer", n: "30-line window", v: 14.3, ctx: true }, { g: "File viewer", n: "Whole file", v: 12.7, ctx: true },
    { g: "Context", n: "Full history", v: 15.0, ctx: true }, { g: "Context", n: "No demonstration", v: 16.3, ctx: true },
    { g: "Search", n: "Results one by one", v: 12.0, ctx: true }, { g: "Search", n: "No search commands", v: 15.7, ctx: true },
    { g: "Editor", n: "Edit without linter", v: 15.0 }, { g: "Editor", n: "No edit command", v: 10.3 },
  ];
  CHARTS.ablate = narrow => {
    const W = narrow ? 360 : 560, L = narrow ? 8 : 196, R = 40, T = 22, bh = narrow ? 12 : 15, gap = narrow ? 22 : 9, step = bh + gap, H = T + ABL.length * step + 8, x = v => L + v / 20 * (W - L - R);
    let out = `<line class="ref" x1="${x(18)}" x2="${x(18)}" y1="${T - 4}" y2="${H - 6}"/><text class="lbl" x="${x(18)}" y="${T - 9}" text-anchor="middle">Shipped design 18.0</text>`;
    ABL.forEach((d, i) => { const y = T + i * step + (narrow ? 13 : 0);
      out += `<g class="pt" tabindex="0" data-tip="${esc(`<b>${d.g}: ${d.n}</b>${d.v.toFixed(1)} % resolved, ${(18 - d.v).toFixed(1)} points below the shipped design`)}"><rect class="hit" x="0" y="${y - gap / 2}" width="${W}" height="${step}"/>
        <path class="bar ${d.ctx ? "ink" : "soft"} anchor" d="${hbar(x(0), x(d.v), y, bh)}"/>
        <text class="cat" x="${narrow ? L : L - 10}" y="${narrow ? y - 4 : y + bh / 2 + 4}" text-anchor="${narrow ? "start" : "end"}" font-size="${narrow ? 12 : 13}">${d.g}: ${d.n}</text>
        <text class="val" x="${x(d.v) + 6}" y="${y + bh / 2 + 4}">${d.v.toFixed(1)}</text></g>`; });
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Resolved percentage on SWE-bench Lite when one part of the interface is changed. Every change falls below the shipped 18.0 percent. Showing the whole file gives 12.7, full history 15.0.">${out}</svg>`;
  };
  const ablateTable = () => tbl("Table view of the ablations", ["Part", "Change", "% resolved", "Change from 18.0"], ABL.map(d => ({ cells: [d.g, d.n, d.v.toFixed(1), "−" + (18 - d.v).toFixed(1)] })));

  // ---------------------------------------------------------------------------------------------------------
  // RepoGraph: context radius and format inside Agentless on SWE-bench Lite.
  // ---------------------------------------------------------------------------------------------------------
  const HOPS = [{ n: "1 hop, flattened", v: 29.67, t: 2310.7, nodes: 11.6 }, { n: "2 hops, summarised", v: 28.67, t: 1229.2, nodes: 54.5 }, { n: "1 hop, summarised", v: 28.33, t: 717.5, nodes: 11.6 }, { n: "2 hops, flattened", v: 26.00, t: 10505.3, nodes: 54.5 }];
  CHARTS.hops = narrow => {
    const W = narrow ? 360 : 760, L = narrow ? 8 : 170, R = 26, T = 24, step = narrow ? 42 : 30, H = T + HOPS.length * step + 22, lo = 25, hi = 31, x = v => L + (v - lo) / (hi - lo) * (W - L - R);
    let out = [25, 26, 27, 28, 29, 30, 31].map(v => `<line class="grid" x1="${x(v)}" x2="${x(v)}" y1="${T - 4}" y2="${H - 22}"/><text class="tick" x="${x(v)}" y="${H - 6}" text-anchor="middle">${v} %</text>`).join("");
    out += `<line class="ref" x1="${x(27.33)}" x2="${x(27.33)}" y1="${T - 4}" y2="${H - 22}"/><text class="lbl" x="${x(27.33)}" y="${T - 9}" text-anchor="middle">No graph 27.33</text>`;
    HOPS.forEach((d, i) => { const y = T + i * step + (narrow ? 24 : 13);
      out += `<g class="pt" tabindex="0" data-tip="${esc(`<b>${d.n}</b>${d.v.toFixed(2)} % resolved<br>${num(d.t)} tokens · ${d.nodes} nodes on average`)}"><rect class="hit" x="0" y="${y - step / 2}" width="${W}" height="${step}"/>
        <line class="link" x1="${x(27.33)}" x2="${x(d.v)}" y1="${y}" y2="${y}"/><circle class="dot fink anchor" cx="${x(d.v)}" cy="${y}" r="6"/>
        <text class="cat" x="${narrow ? L : L - 10}" y="${narrow ? y - 11 : y + 4}" text-anchor="${narrow ? "start" : "end"}" font-size="${narrow ? 12 : 13}">${d.n}</text>
        <text class="val" x="${x(d.v) + (d.v > 27.33 ? 10 : -10)}" y="${y + 4}" text-anchor="${d.v > 27.33 ? "start" : "end"}">${d.v.toFixed(2)}</text></g>`; });
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Resolved percentage with RepoGraph at two radii and two formats. The no-graph baseline is 27.33. One hop flattened reaches 29.67; two hops flattened falls to 26.00, below the baseline.">${out}</svg>`;
  };
  const hopsTable = () => tbl("Table view of the radius test", ["Variant", "% resolved", "Tokens", "Nodes"], [{ cells: ["No graph (Agentless)", "27.33", "not listed", "not listed"] }, ...HOPS.map(d => ({ cells: [d.n, d.v.toFixed(2), num(d.t), d.nodes] }))]);

  // ---------------------------------------------------------------------------------------------------------
  // Where 13 open agents get their code context (Rombaut 2026, Table 8).
  // ---------------------------------------------------------------------------------------------------------
  const NAV = ["SWE-agent", "OpenHands", "Codex CLI", "Gemini CLI", "Cline", "mini-swe-agent", "DARS-Agent", "OpenCode"];
  const SCAF = [["Aider", "PageRank repo map"], ["Agentless", "file to line narrowing"], ["AutoCodeRover", "AST search"], ["Moatless Tools", "AST and embeddings"], ["Prometheus", "knowledge graph"]];
  CHARTS.agents = narrow => {
    const W = narrow ? 360 : 760, cols = narrow ? 2 : 4, cw = (W - (cols - 1) * 8) / cols, ch = 44, cell = (t, s, i, y0, cls) => { const x = (i % cols) * (cw + 8), y = y0 + Math.floor(i / cols) * (ch + 8);
      return `<g class="pt" tabindex="0" data-tip="${esc(`<b>${t}</b>${s}`)}"><rect class="chip ${cls} anchor" x="${x}" y="${y}" width="${cw}" height="${ch}" rx="8"/><text class="cat" x="${x + 10}" y="${y + (s ? 18 : 27)}" font-size="13">${t}</text>${s ? `<text class="tick" x="${x + 10}" y="${y + 34}">${s}</text>` : ""}</g>`; };
    const r1 = Math.ceil(NAV.length / cols), r2 = Math.ceil(SCAF.length / cols), y1 = 20, y2 = y1 + r1 * (ch + 8) + 28, H = y2 + r2 * (ch + 8);
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Eight of 13 open agents let the model navigate with grep and find. Five build structure first: Aider a PageRank repo map, Agentless hierarchical narrowing, AutoCodeRover AST search, Moatless Tools AST search and embeddings, Prometheus a knowledge graph.">
      <text class="lbl" x="0" y="12">The model navigates with shell search: 8 agents</text>${NAV.map((n, i) => cell(n, "", i, y1, "nav")).join("")}
      <text class="lbl" x="0" y="${y2 - 8}">The tool prepares structure first: 5 agents</text>${SCAF.map(([n, s], i) => cell(n, s, i, y2, "scaf")).join("")}</svg>`;
  };
  const agentsTable = () => tbl("Table view of the agents", ["Agent", "How it finds code"], [...NAV.map(n => ({ cells: [n, "the model calls grep, find or ripgrep"] })), ...SCAF.map(([n, s]) => ({ cells: [n, s] }))]);

  return { STATE, LENSES, C, scored, f1, scoreTable, lensTable, practiceTable, sourcesTable, panelsTable, panelList, contextTable, ablateTable, hopsTable, agentsTable, ax };
})();
