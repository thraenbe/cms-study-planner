#!/usr/bin/env python3
"""Edit one module of assets/data.js and nothing else (the JSON round-trip several sessions rely on).

usage: edit_module.py CODE [--show [PATH]] [--set PATH=JSON ...] [--upsert LISTPATH JSON ...]
                      [--delete PATH ...] [--patch FILE|-] [--dry-run] [--repo DIR]

PATH is relative to modules[CODE], dotted, with list indices in brackets: course.lectures[2].covered
  --show [PATH]            print modules[CODE] (or the value at PATH) as JSON and exit
  --set PATH=JSON          set a value (JSON-parsed; a bare word is taken as a string): course.exercises[0].covered=true
  --upsert LISTPATH JSON   JSON object with an "n": replace the list item with the same n, or append it
  --delete PATH            remove a key or list item
  --patch FILE|-           JSON object deep-merged into modules[CODE] (dicts merge recursively; lists and scalars replace)
  --dry-run                print the resulting modules[CODE] without writing

The file is parsed after `window.CMS = `, only modules[CODE] is changed, and it is written back with
json.dumps(indent=1, ensure_ascii=False) + ";\\n" behind the unchanged header comment. Before writing, every other
module and every other top-level key is compared with the original parse; any difference aborts. Afterwards the file
is re-parsed and `git diff --stat assets/data.js` is printed so you can see that only one region moved.
"""
import copy
import json
import os
import re
import subprocess
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import cms_data as D  # noqa: E402


def split_path(path):
    parts = []
    for seg in path.split("."):
        if not seg:
            continue
        m = re.match(r"^([^\[\]]*)((?:\[\d+\])*)$", seg)
        if not m:
            sys.exit("bad path segment: " + seg)
        if m.group(1):
            parts.append(m.group(1))
        parts.extend(int(i) for i in re.findall(r"\[(\d+)\]", m.group(2)))
    return parts


def walk(obj, parts, create=False):
    for p in parts:
        if isinstance(p, int):
            obj = obj[p]
        else:
            if create and p not in obj:
                obj[p] = {}
            obj = obj[p]
    return obj


def parse_value(s):
    try:
        return json.loads(s)
    except json.JSONDecodeError:
        return s


def deep_merge(dst, src):
    for k, v in src.items():
        if isinstance(v, dict) and isinstance(dst.get(k), dict):
            deep_merge(dst[k], v)
        else:
            dst[k] = v


def main(argv):
    args = list(argv)
    if not args or args[0].startswith("-"):
        sys.exit(__doc__)
    code = args.pop(0)
    repo = None
    if "--repo" in args:
        i = args.index("--repo"); repo = args[i + 1]; del args[i:i + 2]
    root = D.repo_root(repo)
    head, data = D.load(root)
    if code not in data["modules"]:
        sys.exit("unknown module code " + code)
    original = copy.deepcopy(data)
    mod = data["modules"][code]

    if "--show" in args:
        i = args.index("--show")
        path = args[i + 1] if i + 1 < len(args) and not args[i + 1].startswith("-") else ""
        print(json.dumps(walk(mod, split_path(path)) if path else mod, indent=1, ensure_ascii=False))
        return

    dry = "--dry-run" in args
    i = 0
    while i < len(args):
        a = args[i]
        if a == "--set":
            path, _, val = args[i + 1].partition("=")
            parts = split_path(path)
            walk(mod, parts[:-1], create=True)[parts[-1]] = parse_value(val)
            i += 2
        elif a == "--upsert":
            lst = walk(mod, split_path(args[i + 1]), create=True)
            item = json.loads(args[i + 2])
            if not isinstance(lst, list) or not isinstance(item, dict) or "n" not in item:
                sys.exit("--upsert needs a list path and a JSON object with an \"n\"")
            for k, old in enumerate(lst):
                if str(old.get("n")) == str(item["n"]):
                    lst[k] = item
                    break
            else:
                lst.append(item)
            i += 3
        elif a == "--delete":
            parts = split_path(args[i + 1])
            parent = walk(mod, parts[:-1])
            del parent[parts[-1]]
            i += 2
        elif a == "--patch":
            src = sys.stdin.read() if args[i + 1] == "-" else open(args[i + 1], encoding="utf-8").read()
            deep_merge(mod, json.loads(src))
            i += 2
        elif a == "--dry-run":
            i += 1
        else:
            sys.exit("unknown argument " + a)

    # Guard: nothing but modules[CODE] may differ from the original parse.
    for k in set(original) | set(data):
        if k == "modules":
            continue
        if original.get(k) != data.get(k):
            sys.exit(f"refusing to write: top-level key {k!r} changed")
    for k in set(original["modules"]) | set(data["modules"]):
        if k != code and original["modules"].get(k) != data["modules"].get(k):
            sys.exit(f"refusing to write: module {k} changed")
    if dry:
        print(json.dumps(mod, indent=1, ensure_ascii=False))
        return
    D.dump(root, head, data)
    D.load(root)  # re-parse
    print(subprocess.run(["git", "-C", root, "diff", "--stat", "assets/data.js"], capture_output=True, text=True).stdout.strip() or "assets/data.js unchanged")


if __name__ == "__main__":
    main(sys.argv[1:])
