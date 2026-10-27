# Page and code pattern of a course board

Reference implementations, in order of fidelity: `high-performance-computing/` (lecture 1, exercise 02),
`digital-circuit-design/` (lecture 2 and 3, exercise 1), `touch-sensing/` (string keys, practices and home
exercises), `conversational-ai/` (seminar meetings, paper cards). The templates in `../assets/templates/` are the
generic version of the HPC files; `scripts/scaffold_board.py` instantiates them.

## Files

```
<slug>.html                 board: hero, status bar, one card per item + Orga card, CMSUtil.wireDone()
<slug>/<ns>.js              window.<NS>: course data (m, c, st), today, fmt, daysUntil, lec/exe sessions, topbar()
<slug>/<ns>.css             look of the board (SML-games card grid) and the write-up components, scoped to body.<ns>
<slug>/<ns>-viz.js          window.<NS>Viz: chart helpers (key, leg, chart, line, lab, mountCharts, isNarrow …)
<slug>/lecture.html?n=N     one write-up function per lecture in `const WRITEUPS = { 1: lecture1, … }`, else placeholder()
<slug>/exercise.html?n=N    same for exercises / tutorials / practices (session.html for seminar meetings)
<slug>/orga.html            status + key dates, module description (CMSUtil.moduleInfoHTML), next session, grading, schedule, links, contact
```

Sub-pages carry `<base href="../">`, so every href and src inside them is written from the repo root
(`assets/site.css`, `<slug>/lecture.html?n=2`, `<slug>.html`). Every page loads `assets/data.js`, `assets/site.js`,
then the course js (and the viz helper on write-up pages). `<header class="sitebar" data-page="course">` renders the
site bar; the theme toggle and dark mode come from `assets/site.css` tokens (`--bg`, `--surface`, `--surface-2`,
`--ink`, `--ink-2`, `--ink-3`, `--line`, `--focus`, `--ok`, `--warn`, `--bad`, `--c-core`, `--c-trk`, `--c-team`).

## The board page

```js
const { m, c, esc, U, CODE, fmt, lec, exe, today } = HPC;
const lectures = c.lectures.map(l => `<a class="game-card lec ${l.covered ? "" : "soon"}" href="high-performance-computing/lecture.html?n=${l.n}">
    <div class="game-icon">${l.icon}</div>
    <h2>Lecture ${l.n} – ${esc(l.title)}</h2>
    <p class="when">${fmt(l.date)} · ${lec.start} · ${esc(lec.room)}</p>
    <p>${esc(l.blurb)}</p>
    ${U.doneBox(`${CODE}:lecture:${l.n}`)}
  </a>`).join("") + `<a class="game-card" href="high-performance-computing/orga.html">…Orga…</a>`;
// … exercises the same way with `${CODE}:exercise:${x.n}` (meeting, paper for the other kinds) …
document.getElementById("page").innerHTML = `…${HPC.topbar()}<div class="game-cards">${lectures}</div>…`;
U.wireDone();
```

Cards come from data.js, so a new item needs no board edit: add the item, and the card appears. Future items get the
class `soon` (dashed, dimmed). The done box must be inside the card markup and `CMSUtil.wireDone()` must run after
the cards are in the DOM; the ticked state lives in the browser under `CODE:kind:n`, so never renumber items.

## A write-up page

```js
const { key, leg, flag, hbar, num, pct, col, CHARTS, LINES, place, chart, lab, line, mountCharts, isNarrow } = HPCViz;
const l = c.lectures.find(x => x.n === Number(q));             // or String(x.n) === q for string keys
const why = (t, body) => `<div class="why"><div class="kicker">${t}</div>${body}</div>`;   // context box
const ex = (t, body) => `<div class="ex"><div class="kicker">${t}</div>${body}</div>`;     // worked example

// A chart: a function of `narrow` (phone width) that returns an <svg viewBox …> string. Width 600 wide / 340 narrow.
CHARTS.latency = narrow => {
  const W = narrow ? 340 : 600, L = narrow ? 92 : 112, R = narrow ? 44 : 60, T = 8, RH = 40, H = T + rows.length * RH + 26;
  …
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Bar chart: …, in words, with the numbers">${ticks}${rows}</svg>`;
};
// A line chart on a log₂ x axis (functions as series, crosshair tooltip, keyboard arrows): line("pipe", { x, y, xTicks, yTicks, yTitle, series: [{ slot: 1, name, short, f }], tipHead, fmtY, aria, hitLabel });

function lecture1() {
  return `${head(l)}
    <p class="lead">One paragraph: what the lecture is about and why it matters for the course.</p>
    <h2>Section following the slides (slides 3–8)</h2>
    <p>…own words…</p>
    ${chart("latency", leg([[1, "measured"], ["g", "reference"]]))}
      <figcaption>What the chart shows; where numbers not on the slides come from.</figcaption>
    </figure>
    ${tbl(["Level", "Cycles"], rows.map(r => [r.k, r.t]))}
    ${why("Context, not on the slides: why caches are organised this way", "<p>…motivation, derivation, pitfalls…</p>")}
    ${ex("Worked example: 16 384 additions on 128 threads", "<p>…numbers all the way through…</p>")}
    ${lab("pipe", "a 5-stage pipeline, cycle by cycle")}
    <div class="tiles"><div class="tile"><div class="v">1 / (1 − f)</div><div class="l">Amdahl's ceiling</div></div>…</div>
    <h2>Take-home</h2><ul><li>…</li></ul>
    <p class="muted">Next: … (<a href="high-performance-computing/lecture.html?n=2">lecture 2</a>, 28 Oct). Slides: OPAL → Lectures (they may not be republished).</p>`;
}
const WRITEUPS = { 0: lecture0, 1: lecture1 };
const LABS = { pipe: initPipe };          // interactive explorers: LABS[name](container) fills a <div class="lab">
page.innerHTML = (WRITEUPS[l.n] || placeholder)();
mountCharts(); mountLabs();
addEventListener("resize", () => { if (isNarrow() !== narrowNow) { narrowNow = isNarrow(); mountCharts(); } });
```

`chart(name, legend)` opens a `<figure class="viz">` with the chart container and a tooltip element; close it
yourself with `<figcaption>…</figcaption></figure>`. Marks with `class="pt" tabindex="0" data-tip="…"` get a
hover/focus tooltip from `mountCharts()`. Every chart gets a `role="img"` with an `aria-label` that says what it
shows in words, and a `tbl()` table view when it carries numbers.

Exercise pages add `task(id, points, title, body)` (one section per task, numbered like the sheet) and
`ans([[value, label], …])` tiles for the results; the question is restated in your own words, the sheet itself is
never copied.

## Components available in the course css (scoped to `body.<ns>`)

| Class | Use |
|---|---|
| `.why` / `.ex` with `.kicker` | context box (teal rail) / worked example (blue rail) |
| `.q` | question box (what to think about before the session) |
| `.tiles` > `.tile` (`.v`, `.l`) | stat tiles: a number or formula and its label |
| `.cmp` (`li > b`, `.v`, `.sw`) | side-by-side comparison rows (`.cmp.three` for three columns) |
| `.formula` | monospace formula block |
| `details.tbl` | table view of a chart |
| `.flag.ok` / `.flag.bad` | inline ✓ / ⚠ pills |
| `.ro` (`dt`, `dd`) | read-out pairs under an explorer |
| `.lab` > `.lab-h`, `.lab-body`; `.ctl` | interactive explorer with controls (`input[type=range]`, buttons) |
| `.cell`, `.bit`, `.agrid`, `.gantt` | cell grids for bits, tables and cycle-by-cycle diagrams |
| `.task`, `.task-h`, `.task-n`, `.pts`, `.ans` | exercise tasks and answer tiles |
| `.box`, `.box.placeholder`, `.muted`, `.lead`, `.refs` | boxes and text styles on detail pages |

Chart colours are the dataviz reference palette, declared in a `<style>` on each write-up page as `--vz-s1 … --vz-s4`
(categorical slots), `--vz-gray` (reference marks), `--vz-grid`, `--vz-axis`, with dark-mode values under both
`@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) … }` and `:root[data-theme="dark"]`. Text stays
in ink colours; colour goes on marks, swatches and tinted cells only. Course-specific marks get their own rules at
the end of the course css (as the HPC file does for Gantt charts, PCAM grids, Flynn's grid).

## Phone width

`isNarrow()` is `max-width: 600px`. Charts take `narrow` and shrink margins, drop direct labels, move category
labels above bars; `mountCharts()` redraws on a width change. Grids collapse to one column under 760px. The
`.wrap` has a 16px gutter below 760px; nothing may scroll horizontally.
