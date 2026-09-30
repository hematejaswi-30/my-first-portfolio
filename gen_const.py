def letter_h(ox, oy):
    return [
        (ox, oy, ox, oy+40), (ox, oy+20, ox+30, oy+20), (ox+30, oy, ox+30, oy+40)
    ]
def letter_e(ox, oy):
    return [
        (ox+30, oy, ox, oy), (ox, oy, ox, oy+40), (ox, oy+40, ox+30, oy+40), (ox, oy+20, ox+25, oy+20)
    ]
def letter_m(ox, oy):
    return [
        (ox, oy+40, ox, oy), (ox, oy, ox+15, oy+20), (ox+15, oy+20, ox+30, oy), (ox+30, oy, ox+30, oy+40)
    ]
def letter_a(ox, oy):
    return [
        (ox, oy+40, ox+15, oy), (ox+15, oy, ox+30, oy+40), (ox+7, oy+20, ox+23, oy+20)
    ]
def letter_t(ox, oy):
    return [
        (ox, oy, ox+30, oy), (ox+15, oy, ox+15, oy+40)
    ]
def letter_j(ox, oy):
    return [
        (ox+30, oy, ox+30, oy+30), (ox+30, oy+30, ox+15, oy+40), (ox+15, oy+40, ox, oy+30)
    ]
def letter_s(ox, oy):
    return [
        (ox+30, oy, ox, oy), (ox, oy, ox, oy+20), (ox, oy+20, ox+30, oy+20), (ox+30, oy+20, ox+30, oy+40), (ox+30, oy+40, ox, oy+40)
    ]
def letter_w(ox, oy):
    return [
        (ox, oy, ox, oy+40), (ox, oy+40, ox+15, oy+20), (ox+15, oy+20, ox+30, oy+40), (ox+30, oy+40, ox+30, oy)
    ]
def letter_i(ox, oy):
    return [
        (ox+15, oy, ox+15, oy+40)
    ]

# HEMA TEJASWI
# H E M A
spacing = 50
letters_hema = [letter_h, letter_e, letter_m, letter_a]
letters_tejaswi = [letter_t, letter_e, letter_j, letter_a, letter_s, letter_w, letter_i]

lines = []
dots = set()

def process_word(funcs, start_x, start_y):
    ox = start_x
    for func in funcs:
        pts = func(ox, start_y)
        for line in pts:
            lines.append(line)
            dots.add((line[0], line[1]))
            dots.add((line[2], line[3]))
        ox += spacing

# Center HEMA (4 letters = 150 width). Start at x=125, y=50
process_word(letters_hema, 135, 30)

# Center TEJASWI (7 letters = 300 width). Start at x=60, y=100
process_word(letters_tejaswi, 60, 90)

svg_lines = ""
for i, (x1, y1, x2, y2) in enumerate(lines):
    svg_lines += f'<path class="c-line" d="M{x1},{y1} L{x2},{y2}" style="animation-delay: {0.5 + i*0.05}s;" />\n'

svg_dots = ""
for i, (x, y) in enumerate(dots):
    svg_dots += f'<circle cx="{x}" cy="{y}" r="2" class="c-star" style="animation-delay: {i*0.03}s;" />\n'

out = f"""
<svg viewBox="0 0 400 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  {svg_dots}
  {svg_lines}
</svg>
"""
with open('constellation.html', 'w') as f:
    f.write(out)
