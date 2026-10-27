#!/usr/bin/env python3
"""Create a new course board from the templates (the HPC/DCD pattern): board page, folder with js/css/viz helper,
lecture.html, exercise.html and orga.html, and seed modules[CODE].course in assets/data.js if it has none.

usage: scaffold_board.py CODE --slug SLUG --ns NS --icon ICON [--subtitle TEXT] [--ex Exercise|Tutorial|Practice]
                         [--no-exercises] [--force] [--repo DIR]

  CODE        module code, e.g. CMS-COR-SAP (must exist in assets/data.js)
  --slug      board file name without .html and the folder name, e.g. stochastics  → stochastics.html, stochastics/
  --ns        JavaScript namespace of the course helper, e.g. SAP → window.SAP, files sap.js, sap.css, sap-viz.js
  --icon      one emoji for the board (favicon and title)
  --subtitle  lecturer and chair line under the title, e.g. "Prof. … · Chair of … · TU Dresden"
  --ex        label of the exercise-like sessions (default Exercise)
  --no-exercises  skip exercise.html and the exercises list
  --force     overwrite files that already exist (default: refuse)

The templates live next to this script in ../assets/templates. After scaffolding, fill the course object
(references/data-schema.md), add one lecture/exercise item per session with covered: false, then write up the
items that have taken place (SKILL.md, step 4).
"""
import json
import os
import shutil
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import cms_data as D  # noqa: E402

TPL = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "assets", "templates")


def opt(args, name, default=None, flag=False):
    if name in args:
        i = args.index(name)
        if flag:
            del args[i]; return True
        v = args[i + 1]; del args[i:i + 2]; return v
    return default


def main(argv):
    args = list(argv)
    if not args or args[0].startswith("-"):
        sys.exit(__doc__)
    code = args.pop(0)
    slug, ns, icon = opt(args, "--slug"), opt(args, "--ns"), opt(args, "--icon")
    subtitle = opt(args, "--subtitle", "TU Dresden")
    ex = opt(args, "--ex", "Exercise")
    no_ex = opt(args, "--no-exercises", False, flag=True)
    force = opt(args, "--force", False, flag=True)
    root = D.repo_root(opt(args, "--repo"))
    if not (slug and ns and icon):
        sys.exit("--slug, --ns and --icon are required\n" + __doc__)
    head, data = D.load(root)
    if code not in data["modules"]:
        sys.exit("unknown module code " + code)
    m = data["modules"][code]
    name = m.get("name") or code
    nslc = ns.lower()
    subst = {"__CODE__": code, "__SLUG__": slug, "__NS__": ns, "__NSLC__": nslc, "__ICON__": icon, "__NAME__": name,
             "__SUBTITLE__": subtitle, "__EX__": ex}
    files = {
        "board.html": f"{slug}.html",
        "course.js": f"{slug}/{nslc}.js",
        "course.css": f"{slug}/{nslc}.css",
        "viz.js": f"{slug}/{nslc}-viz.js",
        "lecture.html": f"{slug}/lecture.html",
        "orga.html": f"{slug}/orga.html",
    }
    if not no_ex:
        files["exercise.html"] = f"{slug}/exercise.html"
    existing = [dst for dst in files.values() if os.path.exists(os.path.join(root, dst))]
    if existing and not force:
        sys.exit("refusing to overwrite existing files (use --force): " + ", ".join(existing))
    os.makedirs(os.path.join(root, slug), exist_ok=True)
    for src, dst in files.items():
        text = open(os.path.join(TPL, src), encoding="utf-8").read()
        for k, v in subst.items():
            text = text.replace(k, v)
        with open(os.path.join(root, dst), "w", encoding="utf-8") as f:
            f.write(text)
        print("wrote " + dst)
    if not m.get("course"):
        m["course"] = {"page": f"{slug}.html", "rooms": {}, "keyDates": [], "grading": [], "format": "", "contact": "", "lectures": []}
        if not no_ex:
            m["course"]["exercises"] = []
        D.dump(root, head, data)
        print(f"seeded modules[{code}].course in assets/data.js (page = {slug}.html)")
    elif m["course"].get("page") != f"{slug}.html":
        print(f"note: modules[{code}].course.page is {m['course'].get('page')!r}, not {slug}.html; set it with edit_module.py")
    print("\nNext: fill the course object (references/data-schema.md), one item per session, then write up the held ones.")


if __name__ == "__main__":
    main(sys.argv[1:])
