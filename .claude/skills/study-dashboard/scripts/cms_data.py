#!/usr/bin/env python3
"""Shared helpers of the study-dashboard scripts.

- repo_root(): find the repository (the folder that holds assets/data.js) from the current directory upwards.
- load(root) / dump(root, head, data): read assets/data.js (header comment + `window.CMS = {...};`) as JSON and
  write it back byte-for-byte in the project's format (json.dumps(indent=1, ensure_ascii=False) + ";\n").
- occurrences(session, term): every date a session takes place, the same rules as CMSUtil.occurrences in
  assets/site.js (weekly from/to on `day`, `skip`, explicit `dates`, one-off `extra`, holidays and breaks).
- board_paths(course): the files of a course board derived from course.page.
"""
import datetime as dt
import json
import os
import re
import sys

MARK = "window.CMS = "
DETAIL_PAGE = {"lectures": "lecture.html", "exercises": "exercise.html", "meetings": "session.html", "papers": None}
SINGULAR = {"lectures": "lecture", "exercises": "exercise", "meetings": "meeting", "papers": "paper"}
FORBIDDEN_FILES = ["research-project.html", "research-topic-semrepo.html", "research-topic.html", "project.md"]


def repo_root(start=None):
    d = os.path.abspath(start or os.getcwd())
    while True:
        if os.path.isfile(os.path.join(d, "assets", "data.js")):
            return d
        parent = os.path.dirname(d)
        if parent == d:
            sys.exit("assets/data.js not found above " + (start or os.getcwd()) + " (run inside the cms-study-planner checkout or pass --repo)")
        d = parent


def data_path(root):
    return os.path.join(root, "assets", "data.js")


def load(root):
    src = open(data_path(root), encoding="utf-8").read()
    i = src.index(MARK)
    head = src[: i + len(MARK)]
    body = src[i + len(MARK):].rstrip()
    if body.endswith(";"):
        body = body[:-1]
    return head, json.loads(body)


def render(head, data):
    return head + json.dumps(data, indent=1, ensure_ascii=False) + ";\n"


def dump(root, head, data):
    text = render(head, data)
    json.loads(text[len(head):].rstrip().rstrip(";"))  # must still parse
    with open(data_path(root), "w", encoding="utf-8") as f:
        f.write(text)


def today_iso(override=None):
    return override or dt.date.today().isoformat()


def add_days(iso, n):
    return (dt.date.fromisoformat(iso) + dt.timedelta(days=n)).isoformat()


def weekday_js(iso):
    """JavaScript getDay(): Sunday = 0, Monday = 1 … Saturday = 6."""
    return (dt.date.fromisoformat(iso).weekday() + 1) % 7


def lecture_free(iso, term):
    term = term or {}
    if any(h.get("date") == iso for h in term.get("holidays", [])):
        return True
    return any(p.get("kind") == "break" and p["from"] <= iso <= p["to"] for p in term.get("periods", []))


def occurrences(s, term):
    dates = []
    if s.get("dates"):
        dates.extend(s["dates"])
    elif s.get("from") and s.get("to") and s.get("day"):
        d = s["from"]
        while weekday_js(d) != s["day"]:
            d = add_days(d, 1)
        while d <= s["to"]:
            if d not in (s.get("skip") or []) and (s.get("duringBreaks") or not lecture_free(d, term)):
                dates.append(d)
            d = add_days(d, 7)
    labels = s.get("labels") or {}
    base = {k: v for k, v in s.items() if k not in ("dates", "extra", "labels", "skip")}
    out = [dict(base, date=d, label=labels.get(d, "")) for d in dates]
    for x in s.get("extra") or []:
        o = dict(base, label="")
        o.update(x)
        o["day"] = weekday_js(x["date"])
        out.append(o)
    return sorted(out, key=lambda o: (o["date"], o.get("start") or ""))


def board_paths(course):
    page = course.get("page")
    if not page:
        return None
    folder = page[:-5] if page.endswith(".html") else page
    if folder.endswith("-board"):
        folder = folder[: -len("-board")]
    return {"page": page, "folder": folder}


def parse_writeups(path):
    """Keys of `const WRITEUPS = { 1: lecture1, "h1": exerciseH1 }` in a detail page, as strings; None if no map."""
    if not os.path.isfile(path):
        return None
    src = open(path, encoding="utf-8").read()
    m = re.search(r"const\s+WRITEUPS\s*=\s*\{(.*?)\}\s*;", src, re.S)
    if not m:
        return None
    return {k for _, k in re.findall(r"""(["']?)([\w-]+)\1\s*:""", m.group(1))}


def resolve_codes(data, args):
    """Module codes from the arguments: explicit codes, or every enrolled module for "all" / no arguments."""
    codes = [a for a in args if not a.startswith("-")]
    if not codes or codes == ["all"] or codes == ["enrolled"]:
        return list(data.get("enrolled", []))
    bad = [c for c in codes if c not in data["modules"]]
    if bad:
        sys.exit("unknown module code(s): " + ", ".join(bad) + "\nknown: " + ", ".join(sorted(data["modules"])))
    return codes
