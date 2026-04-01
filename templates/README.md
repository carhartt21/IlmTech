# IlmTech LaTeX Templates

Corporate-design-konforme LaTeX-Vorlagen für Briefe und Präsentationen.

## Voraussetzungen

- **TeX Live** (≥ 2023) oder MiKTeX mit LuaLaTeX
- Pakete: `koma-script`, `tikz`, `graphicx`, `xcolor`, `hyperref`, `fontspec`, `microtype`, `pgfpages`
- Optional: **Inter** Schriftart (wird automatisch erkannt)

```bash
# Ubuntu / Debian
sudo apt install texlive-full

# macOS (Homebrew)
brew install --cask mactex
```

## Struktur

```
templates/
├── Makefile
├── letter/
│   ├── ilmtech-letter.cls      ← Brief-Klasse (KOMA-Script)
│   └── letter-example.tex      ← Beispielbrief
├── beamer/
│   ├── beamerthemeilmtech.sty  ← Beamer-Theme
│   ├── presentation-example.tex← Beispiel-Präsentation (16:9)
│   └── handout-example.tex     ← Handout (2-up auf A4)
└── logo/                       ← (Symlink / relativer Pfad)
```

## Bauen

```bash
cd templates

# Alles bauen
make all

# Einzeln
make letter
make beamer
make handout

# Aufräumen
make clean
```

## Farben (Corporate Design)

| Name           | Hex       | Verwendung              |
|----------------|-----------|-------------------------|
| Accent Blue    | `#00D4FF` | Primärfarbe, Akzente    |
| Primary Dark   | `#0F1A30` | Dunkler Hintergrund     |
| Background     | `#0B1121` | Folienhintergrund       |
| Surface        | `#1E293B` | Blöcke, Karten          |
| Text Muted     | `#94A3B8` | Sekundärtext            |
| Accent Orange  | `#F59E0B` | Warnungen, Alerts       |
| Accent Green   | `#22C55E` | Beispiele, Erfolg       |

## Anpassung

### Logo-Pfad ändern

```latex
% In Brief:
\renewcommand{\ilmtechlogopath}{/absoluter/pfad/IlmTech_original.pdf}

% In Beamer:
\renewcommand{\ilmtechlogopath}{/absoluter/pfad/IlmTech_original.pdf}
```

### Handout-Modus

Für Handouts die Beamer-Klasse mit `handout`-Option laden:

```latex
\documentclass[aspectratio=169, handout]{beamer}
\usepackage{pgfpages}
\pgfpagesuselayout{2 on 1}[a4paper, border shrink=5mm]
```
