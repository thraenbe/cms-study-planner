// Shared bits of the Conversational AI seminar pages: course data, date helpers, the status bar, chart helpers.
window.CAI = (function () {
  const U = CMSUtil, esc = U.esc, CODE = "CMS-TRK-CAI";
  const m = CMS.modules[CODE], c = m.course, st = m.status || {};
  const today = new Date().toISOString().slice(0, 10);
  const fmt = iso => new Date(iso + "T12:00:00").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
  const daysUntil = iso => Math.round((new Date(iso + "T12:00:00") - new Date(today + "T12:00:00")) / 864e5);
  // The seminar slot comes from the dashboard's session list (one entry with explicit dates).
  const sess = CMS.sessions.find(s => s.code === CODE) || { start: "11:10", end: "12:40", room: c.room, who: "Charvi Jain" };
  const slot = `${sess.start}–${sess.end} · ${sess.room}`;
  // Meeting kinds: kick-off, intermediate presentations, final presentations; plus deadline/break for key dates.
  const KINDS = { kick: "Kick-off", mid: "Intermediate presentations", final: "Final presentations", deadline: "Deadline", break: "Break", off: "No seminar" };
  const KIND_COLOR = { kick: "var(--vz-s1)", mid: "var(--vz-s2)", final: "var(--vz-s3)", deadline: "var(--warn)", break: "var(--ink-3)", off: "var(--ink-3)" };
  const held = c.meetings.filter(x => x.date <= today);
  const next = c.meetings.find(x => x.date > today);

  // Status buttons (OPAL course, topic, Selma); the key-dates strip only where asked for (the Orga page).
  function topbar(opts = {}) {
    const nextDate = c.keyDates.find(k => k.date >= today)?.date;
    const dates = c.keyDates.map(k => `<div class="kd ${k.date < today ? "past" : ""} ${k.date === nextDate ? "next" : ""}" style="--c:${KIND_COLOR[k.kind]}">
        <div class="d">${fmt(k.date)}</div><div class="l">${esc(k.label)}</div><div class="k">${KINDS[k.kind] || k.kind}</div></div>`).join("");
    const btn = (on, label, note) => `<span class="st ${on ? "on" : "off"}"><span class="dot"></span>${label}${note ? ` <small>· ${esc(note)}</small>` : ""}</span>`;
    return `<section class="panel topbar" aria-label="${opts.dates ? "Status and key dates" : "Status"}">
      <div class="status"><span class="lbl">Status</span>
        ${btn(st.opal, "Enrolled in OPAL", st.opal ? c.opalNote : "not yet")}
        ${btn(!!st.topic, "Topic", st.topic ? `${st.topic} · ${c.topicNote}` : "none chosen yet")}
        ${btn(st.selma, "Registered in Selma", st.selma ? "" : `not yet · ${c.selmaNote}`)}
      </div>
      ${opts.dates ? `<div class="dates" aria-label="Key dates">${dates}</div>` : ""}
    </section>`;
  }

  // ---- Chart helpers (same pattern as the other boards): <div data-chart="name"> is filled by CHARTS[name](narrow),
  // marks with class "pt" and a data-tip get a hover/focus tooltip, [data-lab] blocks are filled by LABS[name](el).
  const isNarrow = () => matchMedia("(max-width: 600px)").matches;
  const key = (s, kind = "") => `<span class="key ${kind}" style="--c:${s === "g" ? "var(--vz-gray)" : `var(--vz-s${s})`}"></span>`;
  const leg = items => `<div class="legend">${items.map(([s, t, k]) => `<span class="li">${s || k ? key(s, k) : ""}<span class="lt">${t}</span></span>`).join("")}</div>`;
  const flag = (k, t) => `<span class="flag ${k}">${k === "ok" ? "✓" : "⚠"} ${t}</span>`;
  const hbar = (x0, x1, y0, h) => { const r = Math.min(4, Math.max(0, (x1 - x0) / 2), h / 2); return `M${x0},${y0} H${x1 - r} Q${x1},${y0} ${x1},${y0 + r} V${y0 + h - r} Q${x1},${y0 + h} ${x1 - r},${y0 + h} H${x0} Z`; };
  const vbar = (x0, w, top, base) => { const r = Math.min(4, w / 2, Math.max(0, base - top)); return `M${x0},${base} V${top + r} Q${x0},${top} ${x0 + r},${top} H${x0 + w - r} Q${x0 + w},${top} ${x0 + w},${top + r} V${base} Z`; };
  const num = (v, d = 1) => v.toLocaleString("en-GB", { maximumFractionDigits: d });
  const CHARTS = {}, LABS = {};
  const place = (tip, wrap, x, y) => { tip.classList.add("show"); const half = tip.offsetWidth / 2; tip.style.left = Math.min(Math.max(x, half), wrap.clientWidth - half) + "px"; tip.style.top = y + "px"; };
  const chart = (name, legend = "") => `<figure class="viz">${legend}<div class="chart-wrap"><div data-chart="${name}"></div><div class="tip" role="tooltip"></div></div>`;
  const lab = (name, title) => `<div class="lab" data-lab="${name}"><div class="lab-h">Try it <b>${title}</b></div><div class="lab-body"></div></div>`;
  function mountCharts() {
    document.querySelectorAll("[data-chart]").forEach(el => {
      el.dataset.narrow = isNarrow(); el.innerHTML = CHARTS[el.dataset.chart](isNarrow());
      const wrap = el.parentElement, tip = wrap.querySelector(".tip"), svg = el.querySelector("svg");
      const show = g => { const a = (g.querySelector(".anchor") || g.querySelector(".dot") || g.querySelector(".bar") || g).getBoundingClientRect(), w = wrap.getBoundingClientRect();
        tip.innerHTML = g.dataset.tip; g.classList.add("on"); svg && svg.classList.add("hovering"); place(tip, wrap, a.left + a.width / 2 - w.left, a.top - w.top); };
      const hide = g => { g.classList.remove("on"); svg && svg.classList.remove("hovering"); tip.classList.remove("show"); };
      el.querySelectorAll(".pt[data-tip]").forEach(g => { g.addEventListener("pointerenter", () => show(g)); g.addEventListener("focus", () => show(g));
        g.addEventListener("pointerleave", () => hide(g)); g.addEventListener("blur", () => hide(g)); });
    });
  }
  const mountLabs = () => document.querySelectorAll("[data-lab]").forEach(el => { if (!el.dataset.mounted) { el.dataset.mounted = 1; LABS[el.dataset.lab](el.querySelector(".lab-body")); } });
  let narrowNow = isNarrow();
  addEventListener("resize", () => { if (isNarrow() !== narrowNow) { narrowNow = isNarrow(); mountCharts(); } });

  return { U, esc, CODE, m, c, st, today, fmt, daysUntil, sess, slot, KINDS, KIND_COLOR, held, next, topbar,
    isNarrow, key, leg, flag, hbar, vbar, num, CHARTS, LABS, place, chart, lab, mountCharts, mountLabs };
})();
