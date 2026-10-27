# Checklist before the commit

Run `python3 .claude/skills/study-dashboard/scripts/check_board.py CODE` first; it covers the mechanical lines. The rest
is yours.

## Data

- [ ] `assets/data.js` still parses, is in `json.dumps(indent=1, ensure_ascii=False)` form, and `git diff assets/data.js` shows only the `modules[CODE]` region (`updated`, `sessions`, `enrolled`, `toConfirm`, other modules untouched).
- [ ] Every item that has a write-up function has `covered: true`, a real `title`, `blurb` and `icon`; every future item is still a placeholder (`covered: false`, "Not held yet" blurb).
- [ ] `keyDates` reflect the current OPAL calendar; item dates match the dates the sessions were actually held.
- [ ] No item was renumbered (done-box ids are `CODE:kind:n`).

## Pages

- [ ] Each new write-up function is registered in `WRITEUPS` and opens from its card; the card shows the write-up state, not "pending".
- [ ] Every card (lecture, exercise, practice, meeting, paper) has `CMSUtil.doneBox(...)` and the board calls `CMSUtil.wireDone()`; ticking turns the card green and survives a reload.
- [ ] Every chart has `role="img"` + `aria-label`, a legend when it has more than one series, a table view when it carries numbers, and a figcaption that names the source of numbers not on the slides.
- [ ] Context boxes are marked "Context, not on the slides"; no claim is attributed to the lecturer without a source.
- [ ] Links between pages are root-relative (`<base href="../">`): board ↔ write-ups ↔ orga, next/previous lecture, the exercise of the lecture.

## Browser

- [ ] Served with `python3 -m http.server <port>` (a free port; `fuser -k <port>/tcp` to stop, never `pkill -f`), opened in a Chrome tab of your own: board, every new write-up, orga.
- [ ] Light and dark theme (toggle in the site bar): charts readable, no fixed colours bleeding through.
- [ ] Phone width (≈ 375px): no horizontal scroll, charts redraw in their narrow form, grids collapse.
- [ ] Console: no errors.
- [ ] Without an interactive browser (automation): `google-chrome --headless=new --dump-dom` of each page shows the rendered cards/headings, and the node syntax checks in `check_board.py` pass.

## Privacy

- [ ] Nothing from behind the OPAL login beyond Bela's own status and schedule: no passwords, no meeting links, no participant or co-student names, no topic lists copied verbatim, no OPAL file links. Slides summarised in own words.
- [ ] `research-project.html`, `research-topic*.html`, `project.md` and personal documents from the parent folder are not staged.

## Git

- [ ] On a work branch (Termi `termi/sN` or `study/<date>`), repo-local identity, one commit per course with a message like `Digital Circuit Design: lecture 3 write-up, exercise cards and exercise 1 page, done boxes`.
- [ ] Not pushed.
