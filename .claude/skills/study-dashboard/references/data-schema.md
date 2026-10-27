# data.js: the `course` object

`assets/data.js` is `// header comment …\nwindow.CMS = {…};` where the braces hold plain JSON. A board reads
`CMS.modules[CODE]` (name, lp, links, status, schedule) and its `course` object. Edit only with
`scripts/edit_module.py` (or the same round-trip by hand: parse the JSON after `window.CMS = `, change
`modules[CODE]` only, write back with `json.dumps(indent=1, ensure_ascii=False) + ";\n"` behind the unchanged header).
Never touch `updated`, `sessions`, `enrolled`, `toConfirm` or other modules: other sessions edit those on parallel
branches and the merge must stay clean.

## Module-level fields a board uses

```json
"CMS-COR-HPC": {
  "name": "High-Performance Computing", "lp": 5, "links": { "web": "…", "opal": "https://bildungsportal.sachsen.de/opal/auth/RepositoryEntry/55582162944" },
  "status": { "opal": true, "group": "Wednesday 07:30 group", "selma": false },
  "schedule": { "src": "where the rows come from", "rows": [["2026-10-21", "Lecture 1: …", "lec"], ["2026-10-28", "…", "exe"], ["2026-11-18", "Buß- und Bettag", "off"]] },
  "course": { … }
}
```

`status` holds Bela's own state only (enrolled in OPAL, chosen group, Selma registration, seminar topic). The OPAL
course entry link (`links.opal`) is fine; links to nodes inside the course or to files are not.

## `course`

| Field | Type | Meaning |
|---|---|---|
| `page` | string | the board page, e.g. `"high-performance-computing.html"`; `CMSUtil.moduleUrl` and `module.html` redirect to it. The folder is the same name without `.html` (and without a `-board` suffix). |
| `rooms` | object | `{ "lecture": "HÜL/S186/H (Wed 09:20–10:50, 2nd DS)", "exercise": "…" }` or a single `room` string (CAI) |
| `keyDates` | list | `{ "date", "label", "kind": "lecture" \| "exercise" \| "deadline" \| "break" }`, shown as the key-dates strip on the Orga page |
| `grading` | list | `{ "variant", "how", "selma" }` per exam variant |
| `format` | string | SWS, credits, language, how exercises work |
| `contact` | string | lecturers and where questions go |
| `opalNote`, `groupNote`, `selmaNote`, `exerciseNote`, `materialsNote`, `roomNote`, `planNote` | string | one-liners the status bar, board and Orga page quote |
| `coursePage`, `reading`, `types`, `schedule`, `colab`, … | any | course-specific extras; keep them inside `course` |
| `lectures` | list | one item per lecture, see below |
| `exercises` | list | one item per exercise / tutorial / practice / home exercise |
| `meetings` | list | seminar meetings (CAI); used instead of lectures |
| `papers` | list | reading list (CMS-PRO), or derived from `topic.refs` (CAI) |

## Items (`lectures`, `exercises`, `meetings`, `papers`)

```json
{ "n": 3, "title": "Arithmetic circuits 2", "date": "2026-10-26", "icon": "✖️", "covered": true,
  "blurb": "Carry-save addition, the bit-product matrix, Wallace and Dadda trees, …" }
```

| Field | Required | Notes |
|---|---|---|
| `n` | yes | the key of the item: the card link `?n=` and the WRITEUPS key. Integers normally; strings where the course numbers oddly (TSP: `"0"`, `"x"`, `"h1"`). Never renumber an existing item: done-box state in Bela's browser is keyed `CODE:kind:n`. |
| `title` | yes (may be `null` while unknown) | the official topic in English, in your own words if the original is German |
| `date` | yes (null only for undated self-study) | ISO date of the session |
| `icon` | yes | one emoji, different per card |
| `covered` | yes | `true` once the write-up function exists in the detail page. `scripts/whats_new.py` treats `date <= today && !covered` as work to do. |
| `blurb` | yes | 1–3 sentences: what the session covers (placeholder text like "Not held yet. Planned topic: …" until covered) |
| `published` / `sheet` | exercises | date the sheet or online exercise appeared; a sheet may be written up before its session |
| `points`, `lecture` | exercises | points of the sheet; `n` of the lecture it belongs to (links the placeholder to the material) |
| `kind` | TSP exercises, CAI meetings | `practice` / `home`; `kick` / `mid` / `final` |
| `due` | home exercises | deadline |
| `planned` | APSS | `true` while topic and date are assumed from last year's order |
| `type` | HPC lectures | overview / software / hardware (shown via `c.types`) |
| `slides` | CV | public URL of the slides (never an OPAL file link) |

## Examples

Mark lecture 3 as written up and give the card its real text:

```bash
python3 .claude/skills/study-dashboard/scripts/edit_module.py CMS-TRK-DCD \
  --set 'course.lectures[2].covered=true' \
  --set 'course.lectures[2].blurb="Carry-save addition, the bit-product matrix, Wallace and Dadda reduction trees, …"'
```

Add an exercise card (replace if `n` exists, else append):

```bash
python3 .claude/skills/study-dashboard/scripts/edit_module.py CMS-COR-HPC --upsert course.exercises \
  '{"n": 3, "title": "Batch systems", "date": "2026-11-04", "published": "2026-10-29", "icon": "📐", "covered": false, "lecture": 2, "points": null, "blurb": "…"}'
```

Inspect before editing: `edit_module.py CMS-TRK-TSP --show course.exercises`.
