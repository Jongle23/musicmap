#!/usr/bin/env python3
"""Set MusicMap's version everywhere it appears.

    python tools/bump_version.py 1.6.1     # set an exact version
    python tools/bump_version.py patch     # 1.6 -> 1.6.1, 1.6.1 -> 1.6.2 (small updates and fixes)
    python tools/bump_version.py minor     # 1.6.2 -> 1.7 (new features)

Every change that ships gets a new version (at least +0.0.1). After bumping, add a
CHANGELOG.md section for it and rebuild the plugin: python tools/build_plugin.py --zip
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
V = r"\d+\.\d+(?:\.\d+)?"

# (file, pattern with one version group, how many matches are expected)
SPOTS = [
    ("musicmap.html", rf"(<title>MusicMap v)({V})(</title>)", 1),
    ("musicmap.html", rf"(const MM_VERSION = ')({V})(';)", 1),
    ("musicmap.html", rf'(id="footerVersion">Version )({V})(<)', 1),
    ("musicmap-api.php", rf"( \* MusicMap Share API — v)({V})()", 1),
    ("musicmap-api.php", rf"(\$MM_API_VERSION = ')({V})(';)", 1),
    ("README.md", rf"(^# 🎵 MusicMap v)({V})()", 1),
    ("README.md", rf'("version":")({V})(")', 1),
    ("wordpress-plugin/musicmap/musicmap.php", rf"( \* Version:\s+)({V})()", 1),
    ("wordpress-plugin/musicmap/musicmap.php", rf"(define\( 'MUSICMAP_VERSION', ')({V})(' \);)", 1),
]


def current():
    m = re.search(rf"const MM_VERSION = '({V})';", (ROOT / "musicmap.html").read_text(encoding="utf-8"))
    if not m:
        sys.exit("Could not find MM_VERSION in musicmap.html")
    return m.group(1)


def next_version(cur, arg):
    parts = [int(p) for p in cur.split(".")] + [0] * (3 - len(cur.split(".")))
    if arg == "patch":
        parts[2] += 1
    elif arg == "minor":
        parts = [parts[0], parts[1] + 1, 0]
    elif arg == "major":
        parts = [parts[0] + 1, 0, 0]
    elif re.fullmatch(V, arg):
        return arg
    else:
        sys.exit("Usage: bump_version.py <patch|minor|major|X.Y[.Z]>")
    return f"{parts[0]}.{parts[1]}" + (f".{parts[2]}" if parts[2] else "")


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    cur = current()
    new = next_version(cur, sys.argv[1])
    if new == cur:
        sys.exit(f"Already at {cur}")
    texts = {}
    for rel, pat, expect in SPOTS:
        path = ROOT / rel
        text = texts.get(rel) or path.read_text(encoding="utf-8")
        text, n = re.subn(pat, lambda m: m.group(1) + new + m.group(3), text, flags=re.M)
        if n != expect:
            sys.exit(f"{rel}: expected {expect} match(es) for {pat!r}, found {n}; nothing was written")
        texts[rel] = text
    for rel, text in texts.items():
        (ROOT / rel).write_text(text, encoding="utf-8", newline="\n")
    print(f"MusicMap {cur} -> {new} in {len(texts)} files")
    if f"## v{new}" not in (ROOT / "CHANGELOG.md").read_text(encoding="utf-8"):
        print(f"Next: add a '## v{new}' section to CHANGELOG.md, then python tools/build_plugin.py --zip")


if __name__ == "__main__":
    main()
