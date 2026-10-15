// Shared bits of the Touch Sensing pages: course data, date helpers, the status bar.
window.TSP = (function () {
  const U = CMSUtil, esc = U.esc, CODE = "CMS-TRK-TSP";
  const m = CMS.modules[CODE], c = m.course, st = m.status || {};
  const today = new Date().toISOString().slice(0, 10);
  const fmt = iso => new Date(iso + "T12:00:00").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
  const daysUntil = iso => Math.round((new Date(iso + "T12:00:00") - new Date(today + "T12:00:00")) / 864e5);
  const KIND_COLOR = { lecture: "var(--c-core)", exercise: "var(--c-trk)", deadline: "var(--warn)" };
  // Room of the session on a date (date rules in data.js), else the lecture room.
  const roomOn = date => CMS.sessions.filter(s => s.code === CODE).flatMap(s => U.occurrences(s)).find(o => o.date === date)?.room
    || CMS.sessions.find(s => s.code === CODE && s.day === 1).room;
  const kindOf = topic => /^Exercise/.test(topic) ? "exe" : "lec";

  // Status buttons; the key-dates strip only where asked for (the Orga page).
  function topbar(opts = {}) {
    const nextDate = c.keyDates.find(k => k.date >= today)?.date;
    const dates = c.keyDates.map(k => `<div class="kd ${k.date < today ? "past" : ""} ${k.date === nextDate ? "next" : ""}" style="--c:${KIND_COLOR[k.kind]}">
        <div class="d">${fmt(k.date)}</div><div class="l">${esc(k.label)}</div><div class="k">${k.kind}</div></div>`).join("");
    const btn = (on, label, note) => `<span class="st ${on ? "on" : "off"}"><span class="dot"></span>${label}${note ? ` <small>· ${esc(note)}</small>` : ""}</span>`;
    const selmaOpen = c.keyDates.find(k => /Selma.*opens/.test(k.label));
    return `<section class="panel topbar" aria-label="${opts.dates ? "Status and key dates" : "Status"}">
      <div class="status"><span class="lbl">Status</span>
        ${btn(st.opal, "Enrolled in OPAL", st.opal ? "WiSe 26/27 group" : "not yet")}
        ${btn(st.selma, "Registered in Selma", st.selma ? "" : selmaOpen && selmaOpen.date > today ? `not yet · registration opens ${U.fmtDate(selmaOpen.date)}` : "not yet confirmed")}
      </div>
      ${opts.dates ? `<div class="dates" aria-label="Key dates">${dates}</div>` : ""}
    </section>`;
  }
  return { U, esc, CODE, m, c, st, today, fmt, daysUntil, roomOn, kindOf, topbar };
})();
