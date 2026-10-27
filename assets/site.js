// Shared page chrome: theme (stored per browser) and the site bar.
(function () {
  const KEY = "cms-theme";
  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  if (saved) document.documentElement.dataset.theme = saved;

  window.toggleTheme = function () {
    const cur = document.documentElement.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = cur === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem(KEY, next); } catch (e) {}
  };

  // Renders the site bar into <header class="sitebar" data-page="dashboard|plan|module">.
  document.addEventListener("DOMContentLoaded", function () {
    const bar = document.querySelector("header.sitebar");
    if (!bar) return;
    const page = bar.dataset.page;
    const link = (href, label, id) => `<a href="${href}"${page === id ? ' aria-current="page"' : ""}>${label}</a>`;
    bar.innerHTML = `<div class="sitebar-in">
      <a class="brand" href="index.html">CMS · Applied AI <small>${window.CMS ? window.CMS.semester : ""}</small></a>
      <nav class="sitenav" aria-label="Site">${link("index.html", "Dashboard", "dashboard")}${link("plan.html", "Study plan", "plan")}</nav>
      <button class="btn" type="button" data-theme-toggle>Toggle theme</button>
    </div>`;
    bar.querySelector("[data-theme-toggle]").addEventListener("click", window.toggleTheme);
  });
})();

// Small helpers shared by the pages.
window.CMSUtil = {
  DAYS: ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  DAYS_SHORT: ["", "Mon", "Tue", "Wed", "Thu", "Fri"],
  esc: s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]),
  // "Mon 09:20–10:50", "Mon · time TBA" or "Time TBA"
  when: s => s.start ? `${CMSUtil.DAYS_SHORT[s.day]} ${s.start}–${s.end}` : s.day ? `${CMSUtil.DAYS_SHORT[s.day]} · time TBA` : "Time TBA",
  mins: t => { const [h, m] = t.split(":").map(Number); return h * 60 + m; },
  fmtDate: iso => new Date(iso + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
  // Modules with a course board link straight to it; the others to the module page.
  moduleUrl: code => CMS.modules[code]?.course?.page || ("module.html?code=" + encodeURIComponent(code)),
  // The module information (description, facts, goals, contents, OPAL status), shared by
  // module.html and the Orga pages of the course boards.
  moduleInfoHTML(code) {
    const m = CMS.modules[code]; if (!m) return "";
    const esc = this.esc;
    const fmt = [m.sws && `${m.sws} SWS (lecture / exercise / seminar / practical)`, m.extra].filter(Boolean).join(", ");
    const catalogueLink = m.winter?.q ? `${CMS.sources.catalogue}?q=${encodeURIComponent(m.winter.q)}` : null;
    const st = CMS.opalStatus?.[code];
    const fact = (k, v) => v ? `<dt>${k}</dt><dd>${v}</dd>` : "";
    return `<section class="modinfo">
      <p class="lead">${esc(m.desc)}</p>
      <dl class="facts">
        ${fact("Module", `<span class="mono">${esc(m.code)}</span>`)}
        ${fact("Credits", m.lp ? `${m.lp} LP` : "")}
        ${fact("Format", `${esc(fmt || "—")} · taught in ${esc(m.lang || "English")}`)}
        ${fact("Exam", esc(m.exam || "—"))}
        ${fact("Prerequisites", esc(m.prereq || "—"))}
        ${fact("Coordinator", esc(m.coord || "—"))}
        ${fact("Offered", `${esc(m.freq || "—")}${m.planSem ? ` · planned for semester ${m.planSem}` : ""}`)}
        ${fact("Counts toward", esc(m.area))}
        ${m.winter ? fact("Teaching this semester", esc(m.winter.who)) : ""}
      </dl>
      ${st ? `<div class="opal ${st.level}"><b>Your OPAL status</b> ${esc(st.text)} <span class="src">Checked ${this.fmtDate(CMS.opalChecked)}.</span></div>` : ""}
      ${m.goals ? `<h3>Learning goals</h3><p>${esc(m.goals)}</p>` : ""}
      ${m.contents ? `<h3>Contents</h3><p>${esc(m.contents)}</p>` : ""}
      ${m.note ? `<p class="note">${esc(m.note)}</p>` : ""}
      <div class="modlinks">
        ${m.goals ? `<a href="${CMS.sources.handbook}" target="_blank" rel="noopener">Official module description (PDF) ↗</a>` : ""}
        ${catalogueLink ? `<a href="${catalogueLink}" target="_blank" rel="noopener">Faculty course catalogue ↗</a>` : ""}
        ${m.group ? `<a href="plan.html">See it in the study plan →</a>` : ""}
      </div>
    </section>`;
  },
  // "Done" checkbox for board cards (lectures, exercises, meetings, papers). State lives in this
  // browser (localStorage "cms-done": { "<CODE>:<kind>:<n>": true }); the card gets class "is-done".
  // Usage: put `${CMSUtil.doneBox("CMS-COR-HPC:lecture:1")}` inside the card markup (also inside an
  // <a class="game-card">), then call CMSUtil.wireDone() once the cards are in the DOM.
  done() { try { return JSON.parse(localStorage.getItem("cms-done") || "{}"); } catch (e) { return {}; } },
  isDone(id) { return !!this.done()[id]; },
  setDone(id, on) {
    const all = this.done(); if (on) all[id] = true; else delete all[id];
    try { localStorage.setItem("cms-done", JSON.stringify(all)); } catch (e) {}
  },
  doneBox(id, label = "done") {
    return `<label class="done-box" data-done="${this.esc(id)}"><input type="checkbox"${this.isDone(id) ? " checked" : ""}><span>${this.esc(label)}</span></label>`;
  },
  wireDone(root = document) {
    root.querySelectorAll(".done-box").forEach(box => {
      const id = box.dataset.done, cb = box.querySelector("input");
      const card = box.closest(".game-card, .card, [data-card]") || box.parentElement;
      const apply = () => { card.classList.toggle("is-done", cb.checked); box.classList.toggle("on", cb.checked); };
      apply();
      // A click inside an <a> card must not navigate, so the click is cancelled. A cancelled click on the
      // input itself restores its old checked state after the handlers ran, so the new state is set
      // from storage on the next tick instead of toggling the input directly.
      box.addEventListener("click", e => {
        e.preventDefault(); e.stopPropagation();
        const on = !CMSUtil.isDone(id); CMSUtil.setDone(id, on);
        setTimeout(() => { cb.checked = on; apply(); }, 0);
      });
      cb.addEventListener("change", () => { CMSUtil.setDone(id, cb.checked); apply(); }); // keyboard (space)
      cb.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); cb.checked = !cb.checked; CMSUtil.setDone(id, cb.checked); apply(); } });
    });
  },
  // "enrolled", "register" (still to register) or null
  status: code => CMS.enrolled.includes(code) ? "enrolled" : (CMS.toRegister || []).includes(code) ? "register" : null,
  // Priority items (data.js) with their state: done once one option is enrolled.
  priorities: () => (CMS.priorities || []).map(p => ({ ...p, done: p.options.find(c => CMS.enrolled.includes(c)) || null })),
  priorityOf: code => (CMS.priorities || []).find(p => p.options.includes(code)) || null,
  offeredNow: m => /winter|every semester/i.test(m.freq || ""),
  // Chosen exercise/tutorial group per module, stored per browser.
  // Groups registered in OPAL (data.js) unless this browser picked something else.
  groups() {
    let mine = {};
    try { mine = JSON.parse(localStorage.getItem("cms-groups") || "{}"); } catch (e) {}
    return { ...(CMS.defaultGroups || {}), ...mine };
  },
  setGroup(code, g) {
    const all = this.groups();
    if (g) all[code] = g; else delete all[code];
    // keep only real choices: a choice equal to the OPAL default needn't be stored
    Object.keys(all).forEach(c => { if (CMS.defaultGroups?.[c] === all[c]) delete all[c]; });
    try { localStorage.setItem("cms-groups", JSON.stringify(all)); } catch (e) {}
  },
  // Sessions a student actually attends: all non-group sessions plus the chosen group.
  attended(code) {
    const chosen = this.groups()[code];
    return CMS.sessions.filter(s => s.code === code && (!s.group || s.group === chosen));
  },
  overlaps: (a, b) => a.day === b.day && a.start && b.start &&
    CMSUtil.mins(a.start) < CMSUtil.mins(b.end) && CMSUtil.mins(b.start) < CMSUtil.mins(a.end),
  // Fixed sessions of enrolled modules (lectures, single exercises, chosen groups).
  committed() {
    return CMS.enrolled.flatMap(c => this.attended(c)).filter(s => s.start);
  },
  clashesWith(session, pool) {
    return pool.filter(o => o !== session && o.code !== session.code && this.overlaps(session, o));
  },
  // Dates as local "YYYY-MM-DD" strings; arithmetic at noon so DST changes don't shift the day.
  iso: d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
  addDays: (iso, n) => { const d = new Date(iso + "T12:00:00"); d.setDate(d.getDate() + n); return CMSUtil.iso(d); },
  weekday: iso => new Date(iso + "T12:00:00").getDay(), // 0 = Sunday, 1 = Monday …
  // Holidays and break periods of the term (CMS.term): no regular sessions.
  lectureFree(iso) {
    const t = CMS.term || {};
    return (t.holidays || []).some(h => h.date === iso) || (t.periods || []).some(p => p.kind === "break" && p.from <= iso && iso <= p.to);
  },
  // Every date a session takes place, from its date rules in data.js: { ...session, date, day, label }.
  occurrences(s) {
    const dates = [];
    if (s.dates) dates.push(...s.dates);
    else if (s.from && s.to && s.day) {
      let d = s.from;
      while (this.weekday(d) !== s.day) d = this.addDays(d, 1);
      for (; d <= s.to; d = this.addDays(d, 7))
        if (!(s.skip || []).includes(d) && (s.duringBreaks || !this.lectureFree(d))) dates.push(d);
    }
    const { dates: _d, extra = [], labels = {}, skip: _s, ...base } = s;
    return [
      ...dates.map(date => ({ ...base, date, label: labels[date] || "" })),
      ...extra.map(x => ({ ...base, label: "", ...x, day: this.weekday(x.date) })),
    ].sort((a, b) => a.date.localeCompare(b.date) || (a.start || "").localeCompare(b.start || ""));
  },
};
