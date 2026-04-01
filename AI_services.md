<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# I want to expand the service spectrum of the company towards AI and agentic systems. E.g., integrating tools like OpenClaw into home environments or SME, and offer things like workflow optimization and AI transformation consulting

This is an excellent and strategically timely expansion. OpenClaw is an open-source, locally-running AI agent that acts across messaging apps, email, calendars, and — critically — Home Assistant, making it a perfect bridge between IlmTech's existing smart home stack and an AI services practice. Meanwhile, 36% of German companies now use AI and a further 47% are actively planning adoption, which means the SME consulting market is ripe and underpenetrated at the local/regional level.[^1][^2][^3]

Here is the full expanded service spectrum and strategic framework:

***

## How the Expansion Fits IlmTech's DNA

The expansion works because IlmTech already has three key assets that most AI consultants lack:

- **Trust and physical access** to client environments (home and office)
- **Local-first, privacy-first philosophy** — already aligned with what privacy-conscious SMEs demand
- **Technical infrastructure** (Home Assistant, self-hosted servers, remote maintenance) that can host agentic AI with zero cloud dependency[^4][^1]

The move from *smart home installer* to *local AI integration partner* is a natural progression, not a pivot.

***

## New Service Pillars

### Pillar 1: Agentic Home AI (Residential)

**What it is:** Layering OpenClaw + a local LLM (via Ollama) on top of an existing Home Assistant installation to give the home an AI agent — not just automation rules, but a reasoning system that understands goals, context, and intent.[^5][^2]

**Architecture:**

```
┌──────────────────────────────────────────────────────┐
│              Edge Node (Mini-PC / NUC)                │
│                                                      │
│  ┌─────────────┐    ┌──────────────────────────────┐ │
│  │ Home        │◄───│ OpenClaw Runtime              │ │
│  │ Assistant   │    │  • Agent Orchestrator         │ │
│  │ (HAOS)      │    │  • Skill Loader               │ │
│  └─────────────┘    │  • Policy Engine              │ │
│         ▲           │  • Context Graph              │ │
│         │           └──────────────┬───────────────┘ │
│    Device Layer               ┌────▼─────┐           │
│  Zigbee/Z-Wave               │  Ollama  │           │
│  PV / Wallbox                │  (Local  │           │
│  Heating / Cams              │   LLM)   │           │
│  Sensors                     └──────────┘           │
└──────────────────────────────────────────────────────┘
          │
          ▼ Chat Interface
   Telegram / WhatsApp / Signal
   (all traffic stays local via tunnel)
```

**What the customer gets:**

- Natural language control: *"Turn on the heating, I'll be home in 20 minutes and it's raining"*
- Proactive suggestions: *"Your PV surplus is 4.2kW and your car is not fully charged. Shall I start the wallbox?"*
- Scheduled autonomous tasks: Morning briefing, energy report, security summary
- Email/calendar integration via OpenClaw skills (inbox clearing, meeting scheduling)[^2][^1]
- Privacy-first: all processing runs on the home server via Ollama — no data leaves the building[^6][^7]

**Key differentiator vs. Alexa/Google/Siri:** The agent reasons, plans multi-step actions, has persistent memory, and runs entirely locally.[^5][^2]

**Pricing:**


| Package | What's included | Price |
| :-- | :-- | :-- |
| AI Starter | OpenClaw + Ollama install, 1 messaging channel, 5 skills | €600–900 |
| AI Home Agent | Full setup, 3 channels, 15 skills, Energy + Home integration | €1.200–1.800 |
| AI Home Pro | Full stack + Frigate vision AI + monthly tuning | €2.500–3.500 |
| AI Support | Monthly maintenance, model updates, new skills | €80–120/month |


***

### Pillar 2: AI Workflow Automation for SMEs

**What it is:** Helping local businesses (Handwerk, Büros, Praxen, kleine Produktionsbetriebe) identify and automate repetitive workflows using a combination of **n8n** (open-source workflow orchestration) + **OpenClaw** + **local or hybrid LLMs**.[^8][^9]

**Why n8n:**

- Open-source, self-hosted — aligns perfectly with IlmTech's local-first philosophy[^8]
- Visual, node-based workflow builder → clients can eventually maintain themselves[^10]
- Integrates natively with OpenClaw, Ollama, Make, Zapier, all major business tools[^8]
- GDPR-compliant when self-hosted → critical for German SMEs[^10]

**Target SME segments in Thüringen:**


| Segment | Pain Point | AI Solution |
| :-- | :-- | :-- |
| **Handwerksbetriebe** | Angebote, Rechnungen, Kundenkommunikation manuell | n8n: Auto-Angebotsgenerierung, Rechnungsversand, Erinnerungen |
| **Arztpraxen / Therapeuten** | Terminverwaltung, Patientenkommunikation | Local AI: Terminbestätigung, Vorab-Fragebogen, Recall |
| **Einzelhandel / Gastronomie** | Bestellwesen, Dienstplanung, Social Media | n8n: Bestellautomation, KI-Social-Posts, Bewertungsmanagement |
| **Immobilien / Hausverwaltung** | Mieterkorrespondenz, Schadensmeldungen | OpenClaw: Ticket-Triage, Auto-Response, Handwerker-Koordination |
| **Steuerberater / Kanzleien** | Dokumentenverarbeitung, Mandantenkommunikation | Local LLM: Dokumenten-Extraktion, Fristenmanagement |

**Standard Workflow Automation Packages:**

```
PACKAGE A: "Quick Win" (€1.500 – 2.500)
  Discovery: 2h Workflow-Analyse
  Deliverable: 1 voll automatisierter Core-Prozess
  Beispiel: Kundenanfrage → Angebot → Rechnung → CRM
  
PACKAGE B: "Process Suite" (€3.500 – 6.000)
  Discovery: 4h tiefere Analyse, 3 Abteilungen
  Deliverable: 3-5 automatisierte Prozesse
  Beispiel: Vertrieb + Support + Rechnungswesen
  
PACKAGE C: "AI Transformation" (€8.000 – 15.000+)
  Discovery: Vollständige Prozessanalyse
  Deliverable: 8-12 Automationen + AI Agents
  Schulung: 2-Tages-Team-Training
  Support: 6 Monate included
  
RETAINER: "AI Operations" (€300 – 800/Monat)
  Monitoring aller n8n-Workflows
  Neue Automationen on demand
  LLM-Modell-Updates
  Quarterly AI Audit
```


***

### Pillar 3: Local AI Infrastructure (Privacy-First)

**What it is:** Aufbau einer vollständigen, lokalen AI-Infrastruktur für Unternehmen die:

- Keine Daten in die Cloud schicken wollen/dürfen (GDPR, Anwälte, Ärzte, HR)
- Interne Dokumente, Wissen oder Prozesse mit KI erschließen wollen
- Unabhängig von OpenAI-/Anthropic-Kosten sein wollen[^11][^12]

**Technologie-Stack:**

```
LOCAL AI STACK (Self-hosted):

┌─────────────────────────────────────────┐
│          INFERENCE LAYER                │
│  Ollama (LLM Runtime)                   │
│  • Llama 4 / Qwen3 / DeepSeek-R1       │
│  • Mistral / Gemma                      │
│  • Modell-Wahl je nach Use Case         │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│          ORCHESTRATION LAYER            │
│  n8n (Workflow Automation)              │
│  OpenClaw (Agentic Layer)               │
│  LangChain / LlamaIndex (RAG)           │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│          DATA / KNOWLEDGE LAYER         │
│  Qdrant / ChromaDB (Vector Store)       │
│  Internal Docs, PDFs, E-Mails, Wiki     │
│  → RAG: AI "kennt" das Unternehmen     │
└─────────────────────────────────────────┘
```

**Konkrete Use Cases:**

- **Interne Wissensdatenbank:** AI beantwortet Mitarbeiterfragen aus internen Dokumenten (kein Datenleck)
- **E-Mail-Assistent:** OpenClaw liest, priorisiert, entwirft Antworten auf Firmenmailbox — lokal[^1]
- **Dokumentenanalyse:** Verträge, Rechnungen, Berichte automatisch kategorisieren und extrahieren
- **Meeting-Protokolle:** Whisper (local Speech-to-Text) + LLM → automatische Zusammenfassungen
- **Custom Chatbot:** Kundenservice-Bot der nur mit internem Wissen antwortet, keine halluzinierten Infos

***

### Pillar 4: AI Transformation Consulting

**Was es ist:** Strategische Beratung für Unternehmer und Geschäftsführer die verstehen wollen, **wo** und **wie** KI ihren Betrieb transformieren kann — ohne zu implementieren.[^13][^14]

In Deutschland nutzen nur 25% der KMUs aktiv KI — der Beratungsbedarf übersteigt bei weitem das Angebot an lokalen, praxisnahen Beratern.[^15]

**Consulting-Format:**

```
SCHRITT 1: AI Readiness Assessment (€500 – 900)
  ├─ 3h Workshop mit Führungsebene
  ├─ Prozess-Mapping aller Abteilungen
  ├─ Daten-Audit: Welche Daten liegen wo?
  └─ Output: Priorisierte Use-Case-Liste + Empfehlung

SCHRITT 2: AI Strategy Workshop (€1.200 – 2.000)
  ├─ 1 Tag mit Management-Team
  ├─ ROI-Kalkulation je Use Case
  ├─ Make vs. Buy Entscheidung
  ├─ Datenschutz-/DSGVO-Check
  └─ Output: AI Roadmap (6–18 Monate)

SCHRITT 3: Proof of Concept (€2.000 – 4.000)
  ├─ Implementierung 1 Use Case (schnell)
  ├─ Messbare KPIs
  ├─ Team-Schulung
  └─ Output: Validierter Use Case als Skalierungsbasis

SCHRITT 4: Skalierung / Managed AI (laufend)
  └─ Technische Umsetzung durch IlmTech (Pillar 2/3)
```

**Wichtig:** Consulting und Implementierung bleiben bei IlmTech — kein Outsourcing. Du beräts und baust. Das ist das einzige Modell, das langfristig skaliert.

***

## Positioning \& Messaging

Der entscheidende Unterschied zu großen Beratungshäusern (McKinsey, Capgemini, Accenture):


| IlmTech | Große Beratungshäuser |
| :-- | :-- |
| Lokal, persönlich, immer erreichbar | Remote, anonyme Teams |
| Implementiert selbst, übernimmt Verantwortung | Gibt Empfehlungen, geht dann |
| Privacy-first, local AI | Verkauft Azure/AWS/GCP |
| KMU-tauglich (€1.500–15.000) | Enterprise-only (€50.000+) |
| Home + Business aus einer Hand | Nur Business |
| Open-Source-Stack, keine Vendor-Locks | Proprietäre Plattformen |

**Tagline für das erweiterte Angebot:**
> *„Intelligente Systeme. Lokal. Privat. Von Menschen für Menschen."*

***

## Überarbeitete Unternehmensstruktur

Mit dieser Erweiterung wandelt sich IlmTech von einem *Smart-Home-Installer* zu einer **lokalen AI \& Automation Company**:

```
ILMTECH
├── 🏠 Smart Home & Energy        (Kern-Business, PV, Wallbox, HA)
│   └─ Weiterhin mit PV- und Rolladen-Partner
│
├── 🤖 AI Home Integration        (OpenClaw + Ollama + HA)
│   └─ Upsell für bestehende Kunden
│
├── ⚙️  SME Workflow Automation    (n8n + OpenClaw + AI)
│   └─ Neues Kundensegment: Lokale Businesses
│
└── 🧠 AI Transformation Consulting
    └─ Strategie + Umsetzung für KMUs
```


***

## Empfohlener Einstieg

**Monat 1–3:** Eigene Infrastruktur aufbauen

- OpenClaw + Ollama auf dem eigenen Home-Assistant-Server deployen
- n8n-Instanz selbst hosten und eigene Workflows automatisieren
- Dadurch wirst du zum erfahrenen Anwender bevor du berätst

**Monat 3–6:** Erste AI-Kunden

- 2–3 Smart-Home-Bestandskunden als AI-Piloten gewinnen (zum halben Preis)
- Case Studies aufbauen (keine Privatfotos nötig — Workflow-Diagramme und Metriken reichen)

**Monat 6–12:** SME-Markt erschließen

- Über IHK Erfurt / Suhl Netzwerk zugehen (viele KMUs suchen lokale AI-Berater)[^16]
- Vortrag bei lokalen Unternehmerveranstaltungen
- Kooperation mit Steuerberatern / Unternehmensberatern in der Region

Soll ich als nächstes das **technische Setup-Playbook für OpenClaw + Ollama + Home Assistant** ausarbeiten oder lieber die **Pricing-Strategie und Angebotsvorlagen** für das SME-Segment?
<span style="display:none">[^17][^18][^19][^20][^21][^22][^23][^24][^25][^26][^27][^28][^29][^30]</span>

<div align="center">⁂</div>

[^1]: https://www.acronis.com/en/tru/posts/openclaw-agentic-ai-in-the-wild-architecture-adoption-and-emerging-security-risks/

[^2]: https://www.dan-malone.com/blog/openclaw-home-assistant

[^3]: https://www.dreher-consulting.com/en/insights/digital-transformation-trends-2026

[^4]: https://www.home-assistant.io/blog/2025/09/11/ai-in-home-assistant/

[^5]: https://www.linkedin.com/posts/svkrishna_openclaw-and-the-autonomous-home-from-voice-activity-7428462553476931584-Qx1w

[^6]: https://o-mega.ai/articles/open-source-personal-ai-build-your-own-agent-2026

[^7]: https://skywork.ai/skypage/en/openclaw-llm-ollama-setup/2037436168368111616

[^8]: https://n8n.expert/workflows/ai-integration-consulting-small-firms/

[^9]: https://www.aoe.com/en/services/automation-ai/n8n

[^10]: https://www.aoe.com/en/specific-services/ai-workflow-automation

[^11]: https://www.youtube.com/watch?v=XtYFND7r_Bo

[^12]: https://www.reddit.com/r/PromptEngineering/comments/1rwrfel/best_ai_agent_setup_to_run_locally_with_ollama_in/

[^13]: https://roover.de/en/ai-first-organization-in-the-sme-sector-2/

[^14]: https://nordagi.de/en/ai-implementation-for-smes-what-matters-in-2026/

[^15]: https://nachrichten.idw-online.de/2026/02/19/smes-in-germany-are-becoming-more-digital-and-ai-friendly

[^16]: https://www.fz-juelich.de/en/forschungszentrum-juelich-hannovermesse/research-projects/ki-services

[^17]: https://openclaw.ai

[^18]: https://www.youtube.com/watch?v=gb8AqybawSo\&vl=de

[^19]: https://milvus.io/blog/openclaw-formerly-clawdbot-moltbot-explained-a-complete-guide-to-the-autonomous-ai-agent.md

[^20]: https://www.sidekit.ai/insights/ai-trends-2026-the-definitive-guide-for-smes-startups-and-enterprise-leaders

[^21]: https://developers.home-assistant.io/docs/core/llm/

[^22]: https://www.mywave.ai/blog/implementing-agentic-ai

[^23]: https://www.reddit.com/r/Rag/comments/1rlydlg/testing_openclaw_a_selfhosted_ai_agent_that/

[^24]: https://distrya.com/blog/ai-agentic-workflows-for-smes-2026-report

[^25]: https://skywork.ai/skypage/en/home-assistant-ai-skywork/2033809364125970432

[^26]: https://www.raspberrypi.com/news/turn-your-raspberry-pi-into-an-ai-agent-with-openclaw/

[^27]: https://www.repliix.com/blog/agentic-ai-2026-complete-guide-autonomous-business-workflows

[^28]: https://www.data-unplugged.de/en/blog/ai-trends-2026

[^29]: https://www.evoketechnologies.com/blog/uncategorized/cost-optimized-ai-cloud-transformation-german-enterprises/

[^30]: https://www.linkedin.com/pulse/germany-ai-consulting-services-market-dynamics-upa6f

