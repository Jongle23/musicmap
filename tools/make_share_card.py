#!/usr/bin/env python3
"""Draws MusicMap's link-preview card: wordpress-plugin/musicmap/assets/musicmap-share-card.png

1200x630 is the size Facebook, iMessage, Discord and others expect. Needs Pillow (pip install pillow)
and the Segoe UI fonts that ship with Windows (point F at another folder on other systems).
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 1200, 630
ROOT = Path(__file__).resolve().parent.parent / 'wordpress-plugin' / 'musicmap' / 'assets'
F = Path(r'C:\Windows\Fonts')

# background: the app's ocean gradient, deepening to night blue
bg = Image.new('RGB', (W, H))
px = bg.load()
c1, c2, c3 = (0, 119, 182), (0, 92, 150), (22, 33, 62)
for y in range(H):
    for x in range(W):
        t = (x / W) * 0.55 + (y / H) * 0.45
        if t < 0.5:
            k = t / 0.5; c = tuple(int(c1[i] + (c2[i] - c1[i]) * k) for i in range(3))
        else:
            k = (t - 0.5) / 0.5; c = tuple(int(c2[i] + (c3[i] - c2[i]) * k) for i in range(3))
        px[x, y] = c
d = ImageDraw.Draw(bg, 'RGBA')
# faint map grid + a few "roads"
for x in range(0, W, 60): d.line([(x, 0), (x, H)], fill=(255, 255, 255, 14))
for y in range(0, H, 60): d.line([(0, y), (W, y)], fill=(255, 255, 255, 14))
d.line([(0, 470), (380, 400), (700, 520), (1200, 430)], fill=(255, 255, 255, 30), width=6)
d.line([(820, 0), (760, 250), (900, 630)], fill=(255, 255, 255, 24), width=5)
# listening pins
for (x, y, r) in [(1010, 120, 10), (1110, 250, 7), (1060, 560, 8)]:
    d.ellipse([x - r * 3, y - r * 3, x + r * 3, y + r * 3], fill=(255, 255, 255, 18))
    d.ellipse([x - r, y - r, x + r, y + r], fill=(255, 255, 255, 170))

# logo with rounded corners and a soft shadow
logo = Image.open(ROOT / 'musicmap-logo-512.png').convert('RGBA').resize((300, 300), Image.LANCZOS)
glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
ImageDraw.Draw(glow).rounded_rectangle([70, 155, 390, 475], 70, fill=(0, 0, 0, 120))
blur = glow.filter(ImageFilter.GaussianBlur(24))
bg.paste(blur, (0, 0), blur)
mask = Image.new('L', logo.size, 0)
ImageDraw.Draw(mask).rounded_rectangle([0, 0, 299, 299], 46, fill=255)
logo.putalpha(Image.composite(logo.split()[3], Image.new('L', logo.size, 0), mask))
bg.paste(logo, (80, 165), logo)

d = ImageDraw.Draw(bg, 'RGBA')
title = ImageFont.truetype(str(F / 'segoeuib.ttf'), 92)
tag = ImageFont.truetype(str(F / 'segoeuib.ttf'), 40)
sub = ImageFont.truetype(str(F / 'segoeui.ttf'), 30)
foot = ImageFont.truetype(str(F / 'segoeuib.ttf'), 26)
note = ImageFont.truetype(str(F / 'seguisym.ttf'), 28)  # Segoe UI has no music note
X = 440
d.text((X, 170), 'MusicMap', font=title, fill=(255, 255, 255))
d.text((X, 290), 'Wander your world in music', font=tag, fill=(214, 240, 255))
d.text((X, 352), 'Biome soundtracks · local radio ·', font=sub, fill=(200, 225, 240))
d.text((X, 392), 'the songs made around you', font=sub, fill=(200, 225, 240))
d.rounded_rectangle([X, 470, X + 270, 516], 23, fill=(255, 255, 255, 38), outline=(255, 255, 255, 90), width=2)
d.text((X + 22, 474), '♪', font=note, fill=(255, 255, 255))
d.text((X + 52, 476), 'Tap to listen', font=foot, fill=(255, 255, 255))
bg.save(ROOT / 'musicmap-share-card.png', optimize=True)
print('saved', ROOT / 'musicmap-share-card.png')
