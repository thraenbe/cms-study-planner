#!/usr/bin/env python3
"""What the study board still owes for a course: the work list of a /study-dashboard run.

usage: whats_new.py [CODE ...| all] [--today YYYY-MM-DD] [--json] [--repo DIR]

For every module code (default: every enrolled module) it reads modules[CODE].course in assets/data.js and the
board files and reports, per list (lectures, exercises, meetings, papers):

  NEW          an item that has taken place (date <= today) or whose sheet is published (published/sheet <= today)
               but is not covered yet: it needs a write-up function in the detail page, covered: true, and real
               title/blurb on the card.
  INCONSISTENT covered: true without a WRITEUPS entry for it (or the reverse), or covered in the future.
  SESSION      a session date from CMS.sessions (same rules as the dashboard calendar) that is already over but
               matches no card date: probably a held session without a card. A hint to check, not a certainty.
  BOARD        the module has no course board yet (no course object / page): scaffold it first.
  placeholders future items, counted only; they stay as they are.

Exit status 0 always; the JSON (--json) is what an automation reads: {"today": …, "courses": {CODE: {...}}}.
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import cms_data as D  # noqa: E402


def opt(args, name, default=None):
    if name in args:
        i = args.index(name)
        v = args[i + 1]
        del args[i:i + 2]
        return v
    return default


def item_key(item):
    return str(item.get("n"))


def analyse(root, data, code, today):
    m = data["modules"].get(code) or {}
    c = m.get("course")
    out = {"name": m.get("name"), "board": None, "new": [], "inconsistent": [], "sessions": [], "placeholders": 0, "notes": []}
    if not c or not c.get("page"):
        out["notes"].append("BOARD no course board yet: scaffold it (scripts/scaffold_board.py) and fill modules[CODE].course")
        return out
    paths = D.board_paths(c)
    out["board"] = paths
    if not os.path.isfile(os.path.join(root, paths["page"])):
        out["notes"].append(f"BOARD course.page {paths['page']} does not exist")
    card_dates = set()
    for lst, detail in D.DETAIL_PAGE.items():
        items = c.get(lst) or []
        if not items:
            continue
        writeups = D.parse_writeups(os.path.join(root, paths["folder"], detail)) if detail else None
        if detail and writeups is None and any(i.get("covered") for i in items):
            out["inconsistent"].append(f"{lst}: {paths['folder']}/{detail} has no WRITEUPS map (or is missing) although items are covered")
        for it in items:
            n, date = item_key(it), it.get("date")
            if date:
                card_dates.add(date)
            if lst == "papers":
                continue
            published = it.get("published") or it.get("sheet")
            held = bool(date) and date <= today
            due = held or (bool(published) and published <= today)
            covered = bool(it.get("covered"))
            has_page = writeups is not None and n in writeups
            label = f"{D.SINGULAR[lst]} {n}" + (f" ({it['title']})" if it.get("title") else "")
            if due and not covered:
                why = "held " + date if held else "sheet published " + published
                out["new"].append({"list": lst, "n": it.get("n"), "title": it.get("title"), "date": date, "why": why,
                                   "page": f"{paths['folder']}/{detail}?n={n}" if detail else None, "has_page": has_page})
            elif covered and detail and writeups is not None and not has_page:
                out["inconsistent"].append(f"{label}: covered: true but no WRITEUPS[{n}] in {paths['folder']}/{detail}")
            elif not covered and has_page:
                out["inconsistent"].append(f"{label}: WRITEUPS[{n}] exists but covered is not true in data.js")
            if covered and date and date > today and not (published and published <= today):
                out["inconsistent"].append(f"{label}: covered: true but dated in the future ({date}) and no published/sheet date")
            if not date and not covered and lst != "papers":
                out["notes"].append(f"{label}: no date; decide by hand whether it is due")
            if date and date > today:
                out["placeholders"] += 1
    term = data.get("term") or {}
    for s in data.get("sessions", []):
        if s.get("code") != code:
            continue
        for o in D.occurrences(s, term):
            if o["date"] <= today and o["date"] not in card_dates:
                out["sessions"].append(f"{o['date']} {s.get('kind')}{' ' + s['group'] if s.get('group') else ''}{' · ' + o['label'] if o.get('label') else ''}: no card with this date")
    return out


def main(argv):
    args = list(argv)
    today = D.today_iso(opt(args, "--today"))
    root = D.repo_root(opt(args, "--repo"))
    as_json = "--json" in args
    args = [a for a in args if a != "--json"]
    head, data = D.load(root)
    codes = D.resolve_codes(data, args)
    report = {"today": today, "repo": root, "courses": {code: analyse(root, data, code, today) for code in codes}}
    if as_json:
        print(json.dumps(report, indent=1, ensure_ascii=False))
        return
    print(f"study-dashboard · what's new as of {today} · {root}")
    total = 0
    for code, r in report["courses"].items():
        n_new = len(r["new"])
        total += n_new
        print(f"\n== {code} · {r['name']} · board: {r['board']['page'] if r['board'] else '—'}")
        for it in r["new"]:
            page = f" → {it['page']}" if it["page"] else ""
            flag = " (page function exists, only data.js needs covered: true?)" if it["has_page"] else ""
            print(f"  NEW   {D.SINGULAR[it['list']]} {it['n']}" + (f" – {it['title']}" if it["title"] else "") + f" · {it['why']}{page}{flag}")
        for s in r["inconsistent"]:
            print("  FIX   " + s)
        for s in r["sessions"]:
            print("  CHECK " + s)
        for s in r["notes"]:
            print("  NOTE  " + s)
        if not (r["new"] or r["inconsistent"] or r["sessions"] or r["notes"]):
            print(f"  nothing new · {r['placeholders']} future placeholder(s) stay as they are")
        elif r["placeholders"]:
            print(f"  {r['placeholders']} future placeholder(s) stay as they are")
    print(f"\n{total} item(s) to write up across {len(codes)} course(s)." if total else f"\nNothing new across {len(codes)} course(s).")


if __name__ == "__main__":
    main(sys.argv[1:])
