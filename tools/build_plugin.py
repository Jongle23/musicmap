#!/usr/bin/env python3
"""Build the WordPress plugin's front-end assets from musicmap.html.

musicmap.html stays the single source of truth (it runs standalone and is the base for the
native apps). This script splits it into the files the [musicmap] shortcode serves:

  wordpress-plugin/musicmap/assets/musicmap.css         styles, scoped to .musicmap-root
  wordpress-plugin/musicmap/assets/musicmap.js          the app script
  wordpress-plugin/musicmap/assets/musicmap-markup.html the app markup, wrapped in .musicmap-root

Usage:
  python tools/build_plugin.py          build assets
  python tools/build_plugin.py --zip    build assets and dist/musicmap.zip (upload via Plugins > Add New)
"""
import re
import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'musicmap.html'
PLUGIN = ROOT / 'wordpress-plugin' / 'musicmap'
ASSETS = PLUGIN / 'assets'
DIST = ROOT / 'dist'

BANNER = 'Generated from musicmap.html by tools/build_plugin.py. Edit musicmap.html, not this file.'


def between(text, start, end):
    a = text.index(start) + len(start)
    return text[a:text.index(end, a)]


def scope_css(css):
    """Keep the app's styles inside .musicmap-root so they can't restyle the host page."""
    rules = [
        ('*,*::before,*::after{', '.musicmap-root,.musicmap-root *,.musicmap-root *::before,.musicmap-root *::after{'),
        (':root{', '.musicmap-root{'),
        ('body{background:var(--bg)}', ''),
    ]
    for old, new in rules:
        if css.count(old) != 1:
            raise SystemExit(f'build_plugin: expected exactly one "{old}" in the <style> block')
        css = css.replace(old, new)
    # Any other page-level selector would leak into the WordPress theme
    leaks = re.findall(r'(?m)^\s*(html|body)\s*[{,]', css)
    if leaks:
        raise SystemExit(f'build_plugin: unscoped page-level selectors left: {leaks}')
    return prefix_rules(css)


# Themes style bare elements (Astra: button{background:#e6e6e6}, button:hover{color:#fff},
# input:focus{color:#111}), and button:hover outranks a plain .class rule, so on hover the theme won and
# icons vanished. Every app rule is prefixed with SCOPE, which adds one id's worth of specificity: the
# app's rules beat any theme rule without an id, and keep the same order among themselves.
SCOPE = '.musicmap-root:not(#mm-scope)'


def split_selectors(sel):
    out, depth, cur = [], 0, ''
    for ch in sel:
        if ch in '([':
            depth += 1
        elif ch in ')]':
            depth -= 1
        if ch == ',' and depth == 0:
            out.append(cur)
            cur = ''
        else:
            cur += ch
    out.append(cur)
    return [s.strip() for s in out if s.strip()]


def scope_selector(sel):
    if sel.startswith('.musicmap-root'):
        return SCOPE + sel[len('.musicmap-root'):]
    return f'{SCOPE} {sel}'


def prefix_rules(css):
    css = re.sub(r'/\*[\s\S]*?\*/', '', css)
    # @import must stay first and its URL can hold ';' (font weights): keep those statements as they are
    imports = re.findall(r'@import\s+url\([^)]*\)[^;]*;', css)
    for imp in imports:
        css = css.replace(imp, '', 1)
    out, i, n = list(imports), 0, len(css)
    while i < n:
        brace = css.find('{', i)
        if brace < 0:
            out.append(css[i:])
            break
        head = css[i:brace]
        # the matching close brace (blocks nest inside @media / @supports)
        depth, j = 1, brace + 1
        while depth:
            if css[j] == '{':
                depth += 1
            elif css[j] == '}':
                depth -= 1
            j += 1
        body = css[brace + 1:j - 1]
        h = head.strip()
        if h.startswith(('@media', '@supports')):
            out.append(f'{h}{{{prefix_rules(body)}}}')
        elif h.startswith('@'):
            out.append(f'{h}{{{body}}}')  # @keyframes, @font-face: left as they are
        else:
            out.append(','.join(scope_selector(s) for s in split_selectors(h)) + f'{{{body}}}')
        i = j
    return '\n'.join(x.strip() for x in out if x.strip())


def build():
    html = SRC.read_text(encoding='utf-8')

    css = scope_css(between(html, '<style>', '</style>'))
    if css.lstrip().startswith('@import'):
        # @import must stay the first rule; the banner comment may precede it
        pass

    body = between(html, '<body>', '</body>')
    scripts = re.findall(r'<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)</script>', body)
    if len(scripts) != 1:
        raise SystemExit(f'build_plugin: expected one inline <script> in <body>, found {len(scripts)}')
    js = scripts[0]
    markup = re.sub(r'<script\b[^>]*>[\s\S]*?</script>\s*', '', body).strip()

    ASSETS.mkdir(parents=True, exist_ok=True)
    (ASSETS / 'musicmap.css').write_text(f'/* {BANNER} */\n{css.strip()}\n', encoding='utf-8', newline='\n')
    (ASSETS / 'musicmap.js').write_text(f'/* {BANNER} */\n{js.strip()}\n', encoding='utf-8', newline='\n')
    (ASSETS / 'musicmap-markup.html').write_text(
        f'<!-- {BANNER} -->\n<div class="musicmap-root">\n{markup}\n</div>\n', encoding='utf-8', newline='\n')

    version = re.search(r"const MM_VERSION = '([^']+)'", html).group(1)
    print(f'Built MusicMap {version} assets: css {len(css):,} B, js {len(js):,} B, markup {len(markup):,} B')
    return version


def make_zip():
    DIST.mkdir(exist_ok=True)
    out = DIST / 'musicmap.zip'
    with zipfile.ZipFile(out, 'w', zipfile.ZIP_DEFLATED) as z:
        for f in sorted(PLUGIN.rglob('*')):
            if f.is_file():
                z.write(f, Path('musicmap') / f.relative_to(PLUGIN))
    print(f'Wrote {out}')


if __name__ == '__main__':
    build()
    if '--zip' in sys.argv:
        make_zip()
