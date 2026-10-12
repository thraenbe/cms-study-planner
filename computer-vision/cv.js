// Shared bits of the Computer Vision pages: course data, date helpers, the status bar.
window.CV = (function () {
  const U = CMSUtil, esc = U.esc, CODE = "CMS-TRK-CV";
  const m = CMS.modules[CODE], c = m.course, st = m.status || {};
  const today = new Date().toISOString().slice(0, 10);
  const fmt = iso => new Date(iso + "T12:00:00").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
  const daysUntil = iso => Math.round((new Date(iso + "T12:00:00") - new Date(today + "T12:00:00")) / 864e5);
  const KIND_COLOR = { lecture: "var(--c-core)", exercise: "var(--c-trk)", deadline: "var(--warn)" };
  const sessions = CMS.sessions.filter(s => s.code === CODE);
  const lec = sessions.find(s => s.kind === "Lecture");
  const exe = sessions.find(s => s.kind === "Exercise" && s.group === "A"); // Bela's group (OPAL "Exercise Group 1")
  const slot = s => `${s.start}–${s.end} · ${s.room}`;

  // Status buttons; the key-dates strip only where asked for (the Orga page).
  function topbar(opts = {}) {
    const nextDate = c.keyDates.find(k => k.date >= today)?.date;
    const dates = c.keyDates.map(k => `<div class="kd ${k.date < today ? "past" : ""} ${k.date === nextDate ? "next" : ""}" style="--c:${KIND_COLOR[k.kind]}">
        <div class="d">${fmt(k.date)}</div><div class="l">${esc(k.label)}</div><div class="k">${k.kind}</div></div>`).join("");
    const btn = (on, label, note) => `<span class="st ${on ? "on" : "off"}"><span class="dot"></span>${label}${note ? ` <small>· ${esc(note)}</small>` : ""}</span>`;
    return `<section class="panel topbar" aria-label="${opts.dates ? "Status and key dates" : "Status"}">
      <div class="status"><span class="lbl">Status</span>
        ${btn(st.opal, "Enrolled in OPAL", st.opal ? "CV Group + Exercise Group 1" : "not yet")}
        ${btn(st.selma, "Registered in Selma", st.selma ? "" : "not yet confirmed · period not announced")}
      </div>
      ${opts.dates ? `<div class="dates" aria-label="Key dates">${dates}</div>` : ""}
    </section>`;
  }
  return { U, esc, CODE, m, c, st, today, fmt, daysUntil, lec, exe, slot, topbar };
})();
