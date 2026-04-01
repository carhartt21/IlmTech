# IlmTech LaTeX Templates — Makefile
# Requires: lualatex (TeX Live or MiKTeX)
# Usage:  make all | make letter | make beamer | make handout | make clean

LATEX = lualatex
FLAGS = -interaction=nonstopmode -halt-on-error

.PHONY: all letter beamer handout clean

all: letter beamer handout

# ── Letter ───────────────────────────────────────────────────
letter: letter/letter-example.pdf

letter/letter-example.pdf: letter/letter-example.tex letter/ilmtech-letter.cls
	cd letter && $(LATEX) $(FLAGS) letter-example.tex
	cd letter && $(LATEX) $(FLAGS) letter-example.tex  # second pass for page refs

# ── Beamer Presentation ─────────────────────────────────────
beamer: beamer/presentation-example.pdf

beamer/presentation-example.pdf: beamer/presentation-example.tex beamer/beamerthemeilmtech.sty
	cd beamer && $(LATEX) $(FLAGS) presentation-example.tex
	cd beamer && $(LATEX) $(FLAGS) presentation-example.tex

# ── Handout ──────────────────────────────────────────────────
handout: beamer/handout-example.pdf

beamer/handout-example.pdf: beamer/handout-example.tex beamer/beamerthemeilmtech.sty
	cd beamer && $(LATEX) $(FLAGS) handout-example.tex
	cd beamer && $(LATEX) $(FLAGS) handout-example.tex

# ── Clean ────────────────────────────────────────────────────
clean:
	rm -f letter/*.pdf letter/*.aux letter/*.log letter/*.out letter/*.nav letter/*.snm letter/*.toc
	rm -f beamer/*.pdf beamer/*.aux beamer/*.log beamer/*.out beamer/*.nav beamer/*.snm beamer/*.toc
