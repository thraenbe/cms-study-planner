// Shared bits of the High-Performance Computing pages: course data, date helpers, the status bar.
window.HPC = (function () {
  const U = CMSUtil, esc = U.esc, CODE = "CMS-COR-HPC";
  const m = CMS.modules[CODE], c = m.course, st = m.status || {};
  const today = new Date().toISOString().slice(0, 10);
  const fmt = iso => new Date(iso + "T12:00:00").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
  const daysUntil = iso => Math.round((new Date(iso + "T12:00:00") - new Date(today + "T12:00:00")) / 864e5);
  const KIND_COLOR = { lecture: "var(--c-core)", exercise: "var(--c-trk)", deadline: "var(--warn)", break: "var(--ink-3)" };
  const sess = kind => CMS.sessions.find(s => s.code === CODE && s.kind === kind);
  const lec = sess("Lecture"), exe = sess("Exercise");
  const slot = kind => { const s = kind === "exe" ? exe : lec; return `${s.start}–${s.end} · ${s.room}`; };
  // Lecture types of the OPAL schedule (its ℹ️ / 📜 / 💻 markers), e.g. TYPES.software = "📜 software".
  const TYPES = c.types;

  // Status buttons (OPAL course, exercise group, Selma); the key-dates strip only where asked for (the Orga page).
  function topbar(opts = {}) {
    const nextDate = c.keyDates.find(k => k.date >= today)?.date;
    const dates = c.keyDates.map(k => `<div class="kd ${k.date < today ? "past" : ""} ${k.date === nextDate ? "next" : ""}" style="--c:${KIND_COLOR[k.kind]}">
        <div class="d">${fmt(k.date)}</div><div class="l">${esc(k.label)}</div><div class="k">${k.kind}</div></div>`).join("");
    const btn = (on, label, note) => `<span class="st ${on ? "on" : "off"}"><span class="dot"></span>${label}${note ? ` <small>· ${esc(note)}</small>` : ""}</span>`;
    return `<section class="panel topbar" aria-label="${opts.dates ? "Status and key dates" : "Status"}">
      <div class="status"><span class="lbl">Status</span>
        ${btn(st.opal, "Enrolled in OPAL", st.opal ? c.opalNote : "not yet")}
        ${btn(st.group, "Exercise group", st.group || c.groupNote)}
        ${btn(st.selma, "Registered in Selma", st.selma ? "" : `not yet confirmed · ${c.selmaNote}`)}
      </div>
      ${opts.dates ? `<div class="dates" aria-label="Key dates">${dates}</div>` : ""}
    </section>`;
  }
  return { U, esc, CODE, m, c, st, today, fmt, daysUntil, lec, exe, slot, TYPES, topbar };
})();
