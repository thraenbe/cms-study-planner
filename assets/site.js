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
  moduleUrl: code => "module.html?code=" + encodeURIComponent(code),
  // "enrolled", "register" (still to register) or null
  status: code => CMS.enrolled.includes(code) ? "enrolled" : (CMS.toRegister || []).includes(code) ? "register" : null,
  offeredNow: m => /winter|every semester/i.test(m.freq || ""),
  // Chosen exercise/tutorial group per module, stored per browser.
  groups() { try { return JSON.parse(localStorage.getItem("cms-groups") || "{}"); } catch (e) { return {}; } },
  setGroup(code, g) {
    const all = this.groups();
    if (g) all[code] = g; else delete all[code];
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
};
