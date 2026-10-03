"""Tile study frames into one 2-column image so a single Read shows a whole scroll.

usage: python contact-sheet.py <shots-dir> <slug> <frame> [<frame> ...]
  e.g. python contact-sheet.py C:/proj/shots filmbot 00 01m 02 03 05 06 08 10
Reads <shots-dir>/<slug>-<frame>.jpg, writes <shots-dir>/<slug>-sheet.jpg.
Each tile is 720x450 with its frame name in a magenta corner tag. Needs Pillow.
"""
import os
import sys

from PIL import Image, ImageDraw

if len(sys.argv) < 4:
    sys.exit(__doc__)
d, slug, frames = sys.argv[1], sys.argv[2], sys.argv[3:]
W, H, COLS = 720, 450, 2
rows = (len(frames) + COLS - 1) // COLS
sheet = Image.new('RGB', (W * COLS, H * rows), 'white')
draw = ImageDraw.Draw(sheet)
missing = []
for i, f in enumerate(frames):
    p = os.path.join(d, f'{slug}-{f}.jpg')
    if not os.path.exists(p):
        missing.append(f)
        continue
    x, y = (i % COLS) * W, (i // COLS) * H
    sheet.paste(Image.open(p).resize((W, H)), (x, y))
    draw.rectangle([x, y, x + 34, y + 16], fill='magenta')
    draw.text((x + 3, y + 2), f, fill='white')
out = os.path.join(d, f'{slug}-sheet.jpg')
sheet.save(out, quality=70)
print(out, '(missing: ' + ', '.join(missing) + ')' if missing else '')
