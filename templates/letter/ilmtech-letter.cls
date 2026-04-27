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

%% ── IlmTech Colors (Corporate Design) ────────────────────
% Primary
\definecolor{ilm-blue}{HTML}{00D4FF}
\definecolor{ilm-dark}{HTML}{0F1A30}
\definecolor{ilm-bg}{HTML}{0B1121}
% Secondary
\definecolor{ilm-orange}{HTML}{F59E0B}
\definecolor{ilm-green}{HTML}{22C55E}
\definecolor{ilm-purple}{HTML}{A855F7}
% Neutrals
\definecolor{ilm-foreground}{HTML}{E8EAF0}
\definecolor{ilm-muted}{HTML}{94A3B8}
\definecolor{ilm-surface}{HTML}{1E293B}
\definecolor{ilm-surface-light}{HTML}{263348}
\definecolor{ilm-primary}{HTML}{1A2744}

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
  urlcolor=ilm-blue!80!black,
  citecolor=ilm-dark,
  pdfauthor={IlmTech — Christoph Gerhardt},
  pdfcreator={IlmTech LaTeX Template},
}

%% ── Sender Defaults ────────────────────────────────────────
\setkomavar{fromname}{IlmTech}
\setkomavar{fromaddress}{Fichtenweg 1\\98693 Ilmenau}
\setkomavar{fromphone}{\textcolor{ilm-foreground}{+49 152 5439 9778}}
\setkomavar{fromemail}{\textcolor{ilm-foreground}{info@ilmtech.de}}
\setkomavar{fromurl}{\textcolor{ilm-foreground}{www.ilmtech.de}}
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
        \textcolor{ilm-blue}{Ilm}\textcolor{white}{Tech}%
      };
  \end{tikzpicture}%
}

%% ── First-page head: accent line ────────────────────────────
\setplength{firstheadvpos}{10mm}
\setplength{firstheadwidth}{\textwidth}

%% ── Address field position (below header banner) ────────────
\setplength{toaddrvpos}{58mm}

%% ── Sender text colors (white on dark banner) ──────────────
\setkomafont{fromname}{\bfseries\color{white}}
\setkomafont{fromaddress}{\small\color{ilm-foreground}}
%% Clear default KOMA labels (Telefon, E-Mail, URL) — use separators instead
\setkomavar*{fromphone}{}
\setkomavar*{fromemail}{}
\setkomavar*{fromurl}{}
\setkomavar{phoneseparator}{\textcolor{ilm-muted}{Tel.\,}}
\setkomavar{emailseparator}{\textcolor{ilm-muted}{E-Mail:\,}}
\setkomavar{urlseparator}{\textcolor{ilm-muted}{Web:\,}}
%% Back address line styling
\setkomafont{backaddress}{\sffamily\scriptsize\color{ilm-muted}}

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

%% ── Accent decoration ───────────────────────────────────────
\AddToHook{shipout/background}{%
  \begin{tikzpicture}[remember picture, overlay]
    % Angled header banner: dark strip with accent blue edge
    \fill[ilm-dark]
      (current page.north west) --
      (current page.north east) --
      ([yshift=-45mm]current page.north east) --
      ([yshift=-52mm]current page.north west) -- cycle;
    % Accent blue angled edge at bottom of banner
    \fill[ilm-blue]
      ([yshift=-45mm]current page.north east) --
      ([yshift=-52mm]current page.north west) --
      ([yshift=-53.5mm]current page.north west) --
      ([yshift=-46.5mm]current page.north east) -- cycle;
    % Subtle footer separator
    \draw[ilm-muted!30, line width=0.3pt]
      ([yshift=18mm, xshift=25mm]current page.south west) --
      ([yshift=18mm, xshift=-25mm]current page.south east);
  \end{tikzpicture}%
}

%% ── Subject line color ──────────────────────────────────────
\setkomafont{subject}{\bfseries\color{ilm-dark}}

%% ── Letter opening/closing styling ─────────────────────────
\renewcommand*{\raggedsignature}{\raggedright}

\endinput
