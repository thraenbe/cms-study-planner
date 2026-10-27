#!/usr/bin/env python3
"""Static checks of one or more course boards before committing (the checklist, automated where it can be).

usage: check_board.py [CODE ...| all] [--today YYYY-MM-DD] [--no-node] [--repo DIR]

Checks (ERROR fails the run, WARN is printed):
  data.js parses · the board page, folder, orga.html and the detail pages of every list exist · every card kind
  carries a done box and the board calls CMSUtil.wireDone() · sub-pages use <base href="../"> and load
  assets/site.css, assets/data.js, assets/site.js · every covered item has a WRITEUPS entry (and vice versa) ·
  covered items are not in the future · no meeting links, OPAL file links or password-like strings in the board
  files or the module's data (privacy) · the forbidden files are neither tracked nor staged · JavaScript of the
  board folder and the inline scripts of its pages pass `node --check` · the current branch is not main.
Exit status 1 if any ERROR.
"""
import os
import re
import subprocess
import sys
import tempfile

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import cms_data as D  # noqa: E402

PRIVACY = [
    (r"bigbluebutton|bbb\.tu-dresden|/bbb/|bbb\.", "BigBlueButton / meeting link"),
    (r"meet\.google\.com|zoom\.us/j|teams\.microsoft\.com/l/meetup|webex\.com/meet", "video-meeting link"),
    (r"opal/auth/RepositoryEntry/\d+/CourseNode", "OPAL link into course-internal content (link the course entry only)"),
    (r"bildungsportal\.sachsen\.de/opal/[^\s\"'<>]*\.(pdf|zip|pptx|docx)", "OPAL file link"),
    (r"[Pp]assw(or[dt]|d)\s*[:=]", "password-like string"),
    (r"(TAN|2FA|one-time code)\s*[:=]\s*\d", "2FA-code-like string"),
]


def opt(args, name, default=None):
    if name in args:
        i = args.index(name); v = args[i + 1]; del args[i:i + 2]; return v
    return default


class Report:
    def __init__(self):
        self.errors = 0

    def ok(self, msg): print("  OK    " + msg)
    def warn(self, msg): print("  WARN  " + msg)
    def err(self, msg): self.errors += 1; print("  ERROR " + msg)


def node_check(path, src, rep, label):
    with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False, encoding="utf-8") as f:
        f.write(src); tmp = f.name
    try:
        r = subprocess.run(["node", "--check", tmp], capture_output=True, text=True)
        if r.returncode:
            rep.err(f"{label}: syntax error\n" + r.stderr.replace(tmp, label).strip())
        else:
            rep.ok(f"{label}: syntax OK")
    finally:
        os.unlink(tmp)


def check_course(root, data, code, today, use_node, rep):
    m = data["modules"].get(code) or {}
    c = m.get("course")
    print(f"\n== {code} · {m.get('name')}")
    if not c or not c.get("page"):
        rep.warn("no course board (modules[CODE].course.page missing): nothing to check")
        return
    p = D.board_paths(c)
    page, folder = os.path.join(root, p["page"]), os.path.join(root, p["folder"])
    if not os.path.isfile(page):
        rep.err(f"board page {p['page']} missing"); return
    if not os.path.isdir(folder):
        rep.err(f"board folder {p['folder']}/ missing"); return
    board = open(page, encoding="utf-8").read()
    if "doneBox(" not in board:
        rep.err(f"{p['page']}: no CMSUtil.doneBox on the cards")
    if "wireDone(" not in board:
        rep.err(f"{p['page']}: CMSUtil.wireDone() is not called after rendering")
    for lst, detail in D.DETAIL_PAGE.items():
        items = c.get(lst) or []
        if not items:
            continue
        kind = D.SINGULAR[lst]
        if f":{kind}:" in board or "${kind}" in board or f":${{{kind[:3]}" in board:
            rep.ok(f"{p['page']}: {lst} cards carry a done box id of kind {kind}")
        else:
            rep.err(f"{p['page']}: no done box with id kind '{kind}' for the {lst} cards (expected `${{CODE}}:{kind}:${{x.n}}`)")
        if not detail:
            continue
        dpath = os.path.join(folder, detail)
        if not os.path.isfile(dpath):
            rep.err(f"{p['folder']}/{detail} missing although course.{lst} has items"); continue
        writeups = D.parse_writeups(dpath)
        if writeups is None:
            rep.err(f"{p['folder']}/{detail}: no `const WRITEUPS = {{...}};` map"); continue
        for it in items:
            n, label = str(it.get("n")), f"{kind} {it.get('n')}"
            if it.get("covered") and n not in writeups:
                rep.err(f"{label}: covered in data.js but WRITEUPS[{n}] missing in {detail}")
            if not it.get("covered") and n in writeups:
                rep.warn(f"{label}: WRITEUPS[{n}] exists but covered is not true (the card stays dimmed)")
            published = it.get("published") or it.get("sheet")
            if it.get("covered") and it.get("date") and it["date"] > today and not (published and published <= today):
                rep.warn(f"{label}: covered but dated {it['date']} (future) without a published/sheet date")
        rep.ok(f"{p['folder']}/{detail}: WRITEUPS = {{{', '.join(sorted(writeups))}}}")
    if not os.path.isfile(os.path.join(folder, "orga.html")):
        rep.err(f"{p['folder']}/orga.html missing")
    # Sub-pages: base href and the shared assets.
    for fn in sorted(os.listdir(folder)):
        fp = os.path.join(folder, fn)
        if fn.endswith(".html"):
            src = open(fp, encoding="utf-8").read()
            for need in ['<base href="../">', "assets/site.css", "assets/data.js", "assets/site.js"]:
                if need not in src:
                    rep.err(f"{p['folder']}/{fn}: missing {need}")
            if use_node:
                for k, body in enumerate(re.findall(r"<script(?![^>]*\bsrc=)[^>]*>(.*?)</script>", src, re.S)):
                    node_check(fp, body, rep, f"{p['folder']}/{fn} <script> #{k + 1}")
        elif fn.endswith(".js") and use_node:
            node_check(fp, open(fp, encoding="utf-8").read(), rep, f"{p['folder']}/{fn}")
    if use_node:
        for k, body in enumerate(re.findall(r"<script(?![^>]*\bsrc=)[^>]*>(.*?)</script>", board, re.S)):
            node_check(page, body, rep, f"{p['page']} <script> #{k + 1}")
    # Privacy: board files plus this module's data.
    texts = [(p["page"], board)] + [(f"{p['folder']}/{fn}", open(os.path.join(folder, fn), encoding="utf-8").read())
                                     for fn in os.listdir(folder) if fn.endswith((".html", ".js", ".css"))]
    import json
    texts.append((f"data.js modules[{code}]", json.dumps(m, ensure_ascii=False)))
    hits = 0
    for name, text in texts:
        for pat, what in PRIVACY:
            for mm in re.finditer(pat, text):
                hits += 1
                rep.err(f"{name}: {what}: …{text[max(0, mm.start() - 30):mm.end() + 30].replace(chr(10), ' ')}…")
    if not hits:
        rep.ok("privacy patterns: none found")


def main(argv):
    args = list(argv)
    today = D.today_iso(opt(args, "--today"))
    root = D.repo_root(opt(args, "--repo"))
    use_node = "--no-node" not in args and subprocess.run(["which", "node"], capture_output=True).returncode == 0
    args = [a for a in args if a != "--no-node"]
    rep = Report()
    print(f"study-dashboard · check_board as of {today} · {root}")
    try:
        head, data = D.load(root)
        rep.ok("assets/data.js parses")
    except Exception as e:  # noqa: BLE001
        rep.err("assets/data.js does not parse: " + str(e)); sys.exit(1)
    if D.render(head, data) != open(D.data_path(root), encoding="utf-8").read():
        rep.warn("assets/data.js is not in json.dumps(indent=1, ensure_ascii=False) form (re-save it with edit_module.py before committing)")
    branch = subprocess.run(["git", "-C", root, "rev-parse", "--abbrev-ref", "HEAD"], capture_output=True, text=True).stdout.strip()
    if branch == "main":
        rep.warn("on branch main: commit on a work branch instead")
    else:
        rep.ok(f"branch {branch}")
    tracked = subprocess.run(["git", "-C", root, "ls-files", "--"] + D.FORBIDDEN_FILES, capture_output=True, text=True).stdout.split()
    staged = subprocess.run(["git", "-C", root, "diff", "--cached", "--name-only"], capture_output=True, text=True).stdout.split()
    for f in sorted(set(tracked) | (set(staged) & set(D.FORBIDDEN_FILES))):
        rep.err(f"{f} is tracked or staged: it must stay out of git")
    codes = D.resolve_codes(data, args)
    if not [a for a in args if not a.startswith("-")]:
        codes = [k for k, mm in data["modules"].items() if (mm.get("course") or {}).get("page")]
    for code in codes:
        check_course(root, data, code, today, use_node, rep)
    print(f"\n{rep.errors} error(s)." if rep.errors else "\nAll checks passed.")
    sys.exit(1 if rep.errors else 0)


if __name__ == "__main__":
    main(sys.argv[1:])
