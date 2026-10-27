// Shared bits of the __NAME__ pages: course data, date helpers, the status bar.
window.__NS__ = (function () {
  const U = CMSUtil, esc = U.esc, CODE = "__CODE__";
  const m = CMS.modules[CODE], c = m.course, st = m.status || {};
  const today = new Date().toISOString().slice(0, 10);
  const fmt = iso => new Date(iso + "T12:00:00").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
  const daysUntil = iso => Math.round((new Date(iso + "T12:00:00") - new Date(today + "T12:00:00")) / 864e5);
  const KIND_COLOR = { lecture: "var(--c-core)", exercise: "var(--c-trk)", deadline: "var(--warn)", break: "var(--ink-3)" };
  // The sessions Bela attends (CMS.sessions, chosen group): the lecture and the first exercise-like session.
  const mine = U.attended(CODE);
  const lec = mine.find(s => s.kind === "Lecture") || null;
  const exe = mine.find(s => s.kind !== "Lecture") || null;
  const EX = "__EX__"; // label of the exercise-like sessions on cards: Exercise, Tutorial, Practice …
  const slot = kind => { const s = kind === "exe" ? exe : lec; return s ? `${s.start}–${s.end} · ${s.room}` : "time TBA"; };

  // Status buttons (OPAL course, group if the course has groups, Selma); the key-dates strip only where asked for (the Orga page).
  function topbar(opts = {}) {
    const nextDate = (c.keyDates || []).find(k => k.date >= today)?.date;
    const dates = (c.keyDates || []).map(k => `<div class="kd ${k.date < today ? "past" : ""} ${k.date === nextDate ? "next" : ""}" style="--c:${KIND_COLOR[k.kind] || "var(--ink-3)"}">
        <div class="d">${fmt(k.date)}</div><div class="l">${esc(k.label)}</div><div class="k">${k.kind}</div></div>`).join("");
    const btn = (on, label, note) => `<span class="st ${on ? "on" : "off"}"><span class="dot"></span>${label}${note ? ` <small>· ${esc(note)}</small>` : ""}</span>`;
    return `<section class="panel topbar" aria-label="${opts.dates ? "Status and key dates" : "Status"}">
      <div class="status"><span class="lbl">Status</span>
        ${btn(st.opal, "Enrolled in OPAL", st.opal ? c.opalNote || "" : "not yet")}
        ${st.group || c.groupNote ? btn(st.group, `${EX} group`, st.group || c.groupNote) : ""}
        ${btn(st.selma, "Registered in Selma", st.selma ? "" : `not yet confirmed${c.selmaNote ? ` · ${c.selmaNote}` : ""}`)}
      </div>
      ${opts.dates && dates ? `<div class="dates" aria-label="Key dates">${dates}</div>` : ""}
    </section>`;
  }
  return { U, esc, CODE, m, c, st, today, fmt, daysUntil, mine, lec, exe, EX, slot, topbar };
})();
