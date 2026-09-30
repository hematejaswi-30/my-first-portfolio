import os

svg_template = """<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1a1a1a" />
      <stop offset="100%" stop-color="#2a2a2a" />
    </linearGradient>
  </defs>
  <rect width="600" height="400" fill="url(#grad)"/>
  
  <!-- Elegant Gold Borders -->
  <rect x="20" y="20" width="560" height="360" fill="none" stroke="#C9A96E" stroke-width="2" stroke-opacity="0.5"/>
  <rect x="26" y="26" width="548" height="348" fill="none" stroke="#C9A96E" stroke-width="1" stroke-opacity="0.3"/>
  
  <!-- Center Decoration -->
  <path d="M 300 80 L 330 110 L 300 140 L 270 110 Z" fill="none" stroke="#C9A96E" stroke-width="3"/>
  <circle cx="300" cy="110" r="8" fill="#C9A96E"/>

  <!-- Text -->
  <text x="300" y="220" font-family="'Playfair Display', Georgia, serif" font-size="36" font-weight="bold" fill="#F2EDE6" text-anchor="middle" letter-spacing="2">{company}</text>
  
  <text x="300" y="270" font-family="'Inter', Arial, sans-serif" font-size="18" fill="#C9A96E" text-anchor="middle" letter-spacing="4">CERTIFICATE OF ACHIEVEMENT</text>
  
  <text x="300" y="315" font-family="'Inter', Arial, sans-serif" font-size="22" font-weight="500" fill="#aaa" text-anchor="middle">{title}</text>
</svg>"""

certs = [
    ("codess-cafe.svg", "CODESS.CAFE", "Mentorship Program"),
    ("oracle-cloud.svg", "ORACLE", "OCI AI Foundations"),
    ("claude-101.svg", "ANTHROPIC", "Claude 101"),
    ("claude-code.svg", "ANTHROPIC", "Claude Code in Action"),
    ("infyntrek.svg", "INFYNTREK SYSTEMES", "Internship Completion")
]

out_dir = r"C:\Users\Hema Tejaswi\OneDrive\Desktop\Git Floder\my first profolio\assets\images\certificates"
os.makedirs(out_dir, exist_ok=True)

for filename, company, title in certs:
    path = os.path.join(out_dir, filename)
    with open(path, "w", encoding="utf-8") as f:
        f.write(svg_template.format(company=company, title=title))

print("Created 5 elegant SVG certificate images.")
