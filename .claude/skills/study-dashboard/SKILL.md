---
name: study-dashboard
description: Update Bela's CMS study board (the cms-study-planner site) after lectures. For one module code, several, or every enrolled course it finds the lectures, exercises, tutorials, practices and seminar meetings that have taken place (or whose sheet is out) but have no write-up yet, and creates the card plus a rich visual study write-up page for each, idempotently, under the project's data.js, done-box, privacy, testing and commit rules. Use it whenever the user mentions a course board, a lecture or exercise write-up, "update the dashboard", summarising slides or OPAL material, a module code like CMS-TRK-DCD or CMS-COR-HPC in this repository, or types /study-dashboard; also the entry point for a scheduled automation after each lecture.
---

# study-dashboard

The board is a static site (plain JS, no build step): `index.html` dashboard, `plan.html`, `module.html`, and one
course board per module (`<slug>.html` + `<slug>/`). All data lives in `assets/data.js`; the cards are rendered
from `CMS.modules[CODE].course`, so most of the work is one write-up function per session plus one data item.
Eight sessions did exactly this on 2026-10-27; this skill is that workflow, so a future run needs no further
explanation.

## Arguments

```
/study-dashboard CMS-TRK-DCD                 one course
/study-dashboard CMS-TRK-DCD CMS-COR-HPC     several
/study-dashboard all                         every module in CMS.enrolled (also the default with no arguments)
  --dry-run                                  print the work list and stop (no files touched)
  --today YYYY-MM-DD                         pretend it is another day (tests, catching up)
  --no-browser                               skip the interactive Chrome check (automation); headless checks still run
```

## Workflow

Every step has a reason; the scripts in `scripts/` do the mechanical parts so they come out the same every run.

### 0. Where am I

```bash
echo "$TERMI_ROLE"; git rev-parse --abbrev-ref HEAD; pwd; git status --short | head
```

- Inside a Termi member worktree (`.termi/worktrees/sN`, branch `termi/sN`): work there, `git merge main` first so
  the newest boards and helpers are in, report to the orchestrator at the end.
- In the shared folder on `main`: do not commit on main. `git switch -c study/$(date +%F)` (or reuse an existing
  `study/*` branch), then continue. Several sessions share this folder, so check `git status` before touching files.
- `project.md` in the repo root (untracked) holds the project conventions and watch-outs; read it if present.

### 1. The work list

```bash
python3 .claude/skills/study-dashboard/scripts/whats_new.py CODE… [--today …]     # or: all
```

It reads data.js and the board files and prints, per course: `NEW` items (held, or sheet published, and not covered),
`FIX` inconsistencies (covered without a page function, or the reverse), `CHECK` held session dates without a card,
`NOTE`/`BOARD` for modules without a board. "Nothing new" means exactly that: stop after the report, change nothing,
commit nothing. That is what makes the skill safe to run after every lecture. With `--dry-run`, print the list and stop.

### 2. Boards that do not exist yet

`references/course-registry.md` says which modules have a board and which do not. For a `BOARD` note on an enrolled
module: scaffold it (`scripts/scaffold_board.py CODE --slug … --ns … --icon …`), fill the `course` object from the
sources (rooms, key dates, grading, format, contact, one item per session with `covered: false` and a "Not held yet"
blurb; `references/data-schema.md`), then treat its held sessions like any other NEW item. The scaffold already
links the board from the dashboard and module page (through `course.page`).

### 3. Sources, in that order

Local PDFs first (registry table, plus `ls -t ~/Downloads/*.pdf | head`), then decks readable in the browser, then
OPAL in Chrome. Chrome only in a **new tab of your own**: other sessions share the browser. Bela is logged in via
TUfast; never type passwords or 2FA codes, never enrol, unenrol or submit forms. Opening an OPAL file link downloads
it to `~/Downloads`: ask first; when nobody can answer (automation), skip the item, keep it uncovered and list the
missing file in the report. Never invent content for slides you could not read.

### 4. One item at a time

Load the `dataviz` skill before the first chart and `frontend-design:frontend-design` before the first page
(Skill tool). Then, per NEW item, in this order so a crash leaves nothing half-done:

1. Read the source fully (PDF pages in chunks). Note slide ranges per topic.
2. Write the write-up function in the detail page (`lecture.html`, `exercise.html`, `session.html`) following
   `references/page-pattern.md` for the code and `references/writeup-guide.md` for the content: lead, sections with
   slide ranges, three to six charts or explorers via the course's viz helper, worked examples, context boxes marked
   "Context, not on the slides", stat tiles, take-home, next/exercise links. Register it in `WRITEUPS`.
3. Update the item in data.js with the round-trip script, inside `modules[CODE]` only:
   `scripts/edit_module.py CODE --set 'course.lectures[i].covered=true' --set 'course.lectures[i].blurb="…"'`
   (`--upsert course.exercises '{…}'` for a new card). Future items stay placeholders. If the OPAL calendar moved
   sessions, fix `keyDates` and item dates in the same module.
4. The card appears from data.js; make sure the board renders `CMSUtil.doneBox(\`${CODE}:kind:${n}\`)` inside every
   card (lecture, exercise, meeting, paper) and calls `CMSUtil.wireDone()` after rendering.

Item keys (`n`) are never renumbered: the done-box state in Bela's browser is keyed by them.

### 5. Verify

```bash
python3 .claude/skills/study-dashboard/scripts/check_board.py CODE…
python3 -m http.server 8790 &          # any free port; stop with: fuser -k 8790/tcp   (never pkill -f)
```

Open the board, every new write-up and the Orga page in your own Chrome tab: light and dark theme, phone width
(no horizontal scroll, charts in their narrow form), console clean. With `--no-browser`, render each page with
`google-chrome --headless=new --disable-gpu --dump-dom URL` and confirm the cards and headings are there.
`references/checklist.md` is the full list.

### 6. Commit, never push

One commit per course on the work branch with the repo-local identity (already configured), message like
`Digital Circuit Design: lecture 3 write-up, exercise cards and exercise 1 page, done boxes`. Only the course's
files and `assets/data.js` go in. Never stage `research-project.html`, `research-topic*.html`, `project.md` or
anything from the parent folder. Do not push: merging and publishing are the orchestrator's or Bela's decision.

### 7. Report

As a Termi member, send it to the orchestrator (`msg`); otherwise it is the final message. Format:

```
study-dashboard · 2026-10-27 · branch termi/s366
CMS-TRK-DCD Digital Circuit Design
  created: lecture 3 write-up (digital-circuit-design/lecture.html?n=3), exercise cards 1–8, exercise 1 page
  data.js: modules[CMS-TRK-DCD].course.lectures[2] covered, exercises list added
  checks: check_board OK · Chrome light/dark/phone OK (or: headless only)
  commit: 7bb6793 Digital Circuit Design: lecture 3 write-up, exercise cards and exercise 1 page, done boxes
  missing: exercise sheet 1 not read (OPAL download needs an OK)
  open: is the Thursday group's second date 5 Nov or 12 Nov?
CMS-TRK-CAI: nothing new (7 future placeholders)
```

## Rules that always apply

- **data.js**: edit only `modules[CODE]` through the JSON round-trip (`scripts/edit_module.py`); never `updated`,
  `sessions`, `enrolled`, `toConfirm` or other modules. Other sessions edit those on parallel branches.
- **Privacy**: nothing from behind the OPAL login except Bela's own status and schedule. No passwords, no meeting
  links, no participant or co-student names, no topic lists copied verbatim, no OPAL file links. Slides in your own
  words. Never attribute a claim to the professor that the slides do not carry.
- **Done boxes** on every card; **charts** through the dataviz skill; **pages** through the frontend-design skill.
- **No workload warnings** in the pages or the report; study notes, not advice.
- **Idempotent**: a second run on the same day finds nothing new and changes nothing.

## Running it as an automation

The cheap pre-check needs no model: `python3 .claude/skills/study-dashboard/scripts/whats_new.py all --json` prints the
work list; an empty `new` list for every course means there is nothing to do. When there is work:

```bash
cd ~/dresden-tu/cms-study-planner && claude -p "/study-dashboard all --no-browser" --permission-mode acceptEdits
```

or, from the Termi orchestrator of this project, one member session per course (`open` with the task
`/study-dashboard CMS-TRK-DCD --no-browser`, then `close` to merge). A scheduled run (cron, the `schedule` skill)
fits the evening after lecture days (Mon–Wed for this semester) plus one on Friday. An unattended run can only use
sources already on disk or readable in the browser; it reports what it could not read instead of guessing, and it
leaves the branch unpushed for Bela or the orchestrator to review and merge.

## Files of this skill

- `references/course-registry.md`: module code → board, folder, namespace, item kinds, local PDFs, special notes.
- `references/data-schema.md`: the `course` object and item fields, with edit examples.
- `references/page-pattern.md`: board, write-up and Orga page code, chart helpers, CSS components, phone width.
- `references/writeup-guide.md`: what a lecture, exercise and seminar write-up contains; sources and honesty.
- `references/checklist.md`: the pre-commit list.
- `scripts/whats_new.py`, `scripts/edit_module.py`, `scripts/check_board.py`, `scripts/scaffold_board.py`
  (`scripts/cms_data.py` is their shared loader); `assets/templates/` holds the files the scaffold writes.
