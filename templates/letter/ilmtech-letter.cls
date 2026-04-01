%% ilmtech-letter.cls — IlmTech Corporate Letter Class
%% Based on KOMA-Script scrlttr2
\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{ilmtech-letter}[2025/03/31 IlmTech Corporate Letter]

\LoadClass[
  fontsize=11pt,
  parskip=half,
  fromalign=right,
  fromphone,
  fromemail,
  fromurl,
  fromlogo,
  firsthead=on,
  enlargefirstpage,
  backaddress=plain,
  addrfield=true,
  refline=narrow,
]{scrlttr2}

%% ── Packages ────────────────────────────────────────────────
\RequirePackage[utf8]{inputenc}
\RequirePackage[T1]{fontenc}
\RequirePackage[ngerman]{babel}
\RequirePackage{graphicx}
\RequirePackage{xcolor}
\RequirePackage{geometry}
\RequirePackage{microtype}
\RequirePackage{inter}          % Inter font (matching website)
\RequirePackage{hyperref}
\RequirePackage{scrlayer-scrpage}
\RequirePackage{lastpage}
\RequirePackage{tikz}

%% ── IlmTech Colors ─────────────────────────────────────────
\definecolor{ilm-blue}{HTML}{00D4FF}
\definecolor{ilm-dark}{HTML}{0F1A30}
\definecolor{ilm-bg}{HTML}{0B1121}
\definecolor{ilm-muted}{HTML}{94A3B8}
\definecolor{ilm-surface}{HTML}{1E293B}
\definecolor{ilm-orange}{HTML}{F59E0B}
\definecolor{ilm-green}{HTML}{22C55E}

%% ── Page Geometry ───────────────────────────────────────────
\geometry{
  a4paper,
  left=25mm,
  right=25mm,
  top=30mm,
  bottom=30mm,
}

%% ── Hyperref Setup ──────────────────────────────────────────
\hypersetup{
  colorlinks=true,
  linkcolor=ilm-dark,
  urlcolor=ilm-blue,
  citecolor=ilm-dark,
  pdfauthor={IlmTech — Christoph Gerhardt},
  pdfcreator={IlmTech LaTeX Template},
}

%% ── Sender Defaults ────────────────────────────────────────
\setkomavar{fromname}{IlmTech}
\setkomavar{fromaddress}{Fichtenweg 1\\98693 Ilmenau\\Deutschland}
\setkomavar{fromphone}{+49 152 5439 9778}
\setkomavar{fromemail}{info@ilmtech.de}
\setkomavar{fromurl}{www.ilmtech.de}
\setkomavar{backaddressseparator}{ · }
\setkomavar{backaddress}{IlmTech · Fichtenweg 1 · 98693 Ilmenau}
\setkomavar{place}{Ilmenau}
\setkomavar{signature}{Christoph Gerhardt\\IlmTech}

%% ── Logo ────────────────────────────────────────────────────
% Expects logo file at ../logo/IlmTech_original.pdf (relative)
% Override \ilmtechlogopath if placed elsewhere
\newcommand{\ilmtechlogopath}{../logo.pdf}
\setkomavar{fromlogo}{%
  \begin{tikzpicture}[baseline=(logo.south)]
    \node[inner sep=0pt] (logo) {%
      \includegraphics[height=14mm]{\ilmtechlogopath}%
    };
    \node[anchor=west, inner sep=0pt, font=\fontsize{16}{19}\selectfont\bfseries]
      at ([xshift=5pt]logo.east) {%
        \textcolor{ilm-blue}{Ilm}\textcolor{ilm-dark}{Tech}%
      };
  \end{tikzpicture}%
}

%% ── First-page head: accent line ────────────────────────────
\@setplength{firstheadvpos}{16mm}
\@setplength{firstheadwidth}{\textwidth}

%% ── Footer ──────────────────────────────────────────────────
\pagestyle{scrheadings}
\clearpairofpagestyles

\ifoot{%
  \footnotesize\textcolor{ilm-muted}{%
    IlmTech · Christoph Gerhardt · Fichtenweg 1 · 98693 Ilmenau%
  }%
}
\cfoot{}
\ofoot{%
  \footnotesize\textcolor{ilm-muted}{%
    Seite \thepage\ von \pageref{LastPage}%
  }%
}

%% ── Accent decoration (thin blue line below header) ─────────
\AddToHook{shipout/foreground}{%
  \begin{tikzpicture}[remember picture, overlay]
    \draw[ilm-blue, line width=0.6pt]
      ([yshift=-27mm, xshift=25mm]current page.north west) --
      ([yshift=-27mm, xshift=-25mm]current page.north east);
  \end{tikzpicture}%
}

%% ── Letter opening/closing styling ─────────────────────────
\renewcommand*{\raggedsignature}{\raggedright}

\endinput
