// Shared bits of the Research Project pages (CMS-PRO): module data, date helpers, the status bar.
window.RP = (function () {
  const U = CMSUtil, esc = U.esc, CODE = "CMS-PRO";
  const m = CMS.modules[CODE], c = m.course, st = m.status || {};
  const today = new Date().toISOString().slice(0, 10);
  const fmt = iso => new Date(iso + "T12:00:00").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
  const fmtLong = iso => new Date(iso + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const daysUntil = iso => Math.round((new Date(iso + "T12:00:00") - new Date(today + "T12:00:00")) / 864e5);
  const KIND_COLOR = { milestone: "var(--rp-accent)", deadline: "var(--warn)", meeting: "var(--c-core)", paper: "var(--c-sem)" };
  // A paper's citation line (authors, title, venue, year) as plain text, for cards, headers and the reference list.
  const cite = p => `${p.authors.join(", ")}: ${p.title}. ${p.venue} (${p.year})`;
  const paperUrl = p => `research-project/paper-${p.slug}.html`;

  // Status buttons (project allocation, team, grading) and, where asked for, the key-dates strip.
  function topbar(opts = {}) {
    const nextDate = c.keyDates.find(k => k.date >= today)?.date;
    const dates = c.keyDates.map(k => `<div class="kd ${k.date < today ? "past" : ""} ${k.date === nextDate ? "next" : ""}" style="--c:${KIND_COLOR[k.kind]}">
        <div class="d">${fmt(k.date)}</div><div class="l">${esc(k.label)}</div><div class="k">${k.kind}</div></div>`).join("");
    const btn = (on, label, note) => `<span class="st ${on ? "on" : "off"}"><span class="dot"></span>${label}${note ? ` <small>· ${esc(note)}</small>` : ""}</span>`;
    return `<section class="panel topbar" aria-label="${opts.dates ? "Status and key dates" : "Status"}">
      <div class="status"><span class="lbl">Status</span>
        ${btn(st.allocated, "Project allocated", st.allocated ? c.allocNote : "waiting for the allocation")}
        ${btn(st.team, "Team", st.team || c.teamNote)}
        ${btn(st.selma, "Registered in Selma", st.selma ? "" : c.selmaNote)}
      </div>
      ${opts.dates ? `<div class="dates" aria-label="Key dates">${dates}</div>` : ""}
    </section>`;
  }
  return { U, esc, CODE, m, c, st, today, fmt, fmtLong, daysUntil, cite, paperUrl, topbar };
})();
