# What a write-up contains

The bar is `digital-circuit-design/lecture.html?n=2` and `high-performance-computing/lecture.html?n=1`: a page Bela
can study from instead of the slides, in English, in our own words, with the numbers worked through and the reasons
the slides leave out. A write-up that only lists the slide titles is a placeholder with extra steps.

## Lecture write-up

1. **Lead paragraph**: what the lecture is about, why it sits where it does in the course, what it builds on.
2. **Sections that follow the slides**, each heading with the slide range it covers ("Carry-save addition
   (slides 4–5)"). Explain, do not transcribe: a definition, the idea behind it, the one example that makes it click.
3. **Several charts or explainers per lecture** (three to six): a bar chart of the numbers on a slide, a line chart of
   a formula over its range, a timeline, a cell grid or diagram redrawn as SVG, a cycle-by-cycle Gantt, an
   interactive explorer (`lab`) where a parameter is worth playing with. Load the `dataviz` skill before the first chart
   and the `frontend-design:frontend-design` skill before the first page: they set the colour, form and
   typography rules; `page-pattern.md` has the helpers.
4. **Worked examples** with concrete numbers carried all the way through (`ex("Worked example: −3 × 5 in 4 bits …")`),
   at least one per major section.
5. **Context boxes** (`why("Context, not on the slides: …")`) for what a lecturer says aloud: motivation, intuition,
   a derivation the slide skips, a pitfall, how this connects to another lecture or course, what is exam-relevant.
   Mark every such box as context, and phrase it as what it is: standard material, typical practice, your reasoning.
   Never put words in the professor's mouth ("the professor said", "will be in the exam") unless a source on disk
   says so; "this kind of calculation is standard written-exam material for a course like this" is fine.
6. **Stat tiles** of the three or four numbers or formulas worth remembering.
7. **Take-home** list: the questions the lecture answers, each with its one-line answer.
8. **Next / exercise** paragraph: the exercise that belongs to this lecture (linked), the next lecture (linked), and
   where the slides are (OPAL section name, with the note that they may not be republished).

## Exercise / tutorial / practice write-up

- One `task()` section per task, numbered as the sheet numbers them, with the points if the sheet gives them.
- The question restated in your own words (never the sheet verbatim), then the worked answer with every
  intermediate value, then `ans()` tiles with the final results. Where a counting convention is ambiguous, give the
  alternatives and say which to try first.
- A chart or explorer wherever the answer is a function of something (speedup over PEs, delay over bits).
- "Before the session" list: what to finish, what to reread (linked lecture), what to ask.
- Context box on what the task trains and where it reappears (exam, later lectures).
- Practices that are discussions or hands-on (TSP): what was done, the questions asked, your own notes; home
  exercises: the task, the deliverable, the deadline, a plan.

## Seminar meeting write-up (CAI-style)

- What the meeting was for, the rules announced (timeline, grading criteria, dos and don'ts) in your own words,
  Bela's own topic and status, what to prepare next. Charts: the semester strip, the grading breakdown, a timeline.
- Nothing about other participants: no names, no topic assignments, no who-presents-when beyond "round I / II".

## Sources and honesty

- Prefer the PDFs on disk; cite slide numbers from them. Numbers that are not on the slides (release years,
  benchmark figures) get a figcaption saying where they come from ("years added here from the standards' first
  releases; the lecture names the environments, not the years").
- Slides you could not read: do not guess the content. Keep the item uncovered, keep the placeholder, and list the
  missing source in the report.
- Everything from behind the OPAL login except Bela's own status and schedule stays out: no participant names, no
  meeting links, no passwords, no topic lists copied as such, no file links. Lecturer names and public course facts
  are fine.
- Tone: study notes for Bela. No workload warnings, no "you should", no padding.

## Card text (data.js)

- `title`: the official topic in English. `blurb`: 1–3 sentences that say what the session covers, specific enough to
  recognise it ("Number representations (unsigned, Gray, two's complement, fixed point, IEEE 754) and adders from
  the half adder to carry lookahead"). Placeholders say "Not held yet" plus the planned topic.
- `covered: true` only when the write-up function exists and is registered in `WRITEUPS`.
