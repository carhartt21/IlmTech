import type { Locale } from '@/i18n/config';

export type Localized = {
  de: string;
  en: string;
};

export type ProjectSection = {
  title: Localized;
  points: Localized[];
};

export type ProjectWorkflow = {
  title: Localized;
  summary: Localized;
  steps: Localized[];
};

export type ProjectTemplate = {
  slug: string;
  categories: string[];
  title: Localized;
  subtitle: Localized;
  clientProfile: Localized;
  objective: Localized;
  highlights: Localized[];
  architecture: ProjectSection[];
  workflows: ProjectWorkflow[];
  roadmap: ProjectSection[];
  offer: ProjectSection[];
};

export const projectTemplates: ProjectTemplate[] = [
  {
    slug: 'hausverwaltung-betriebsplattform',
    categories: ['real-estate', 'operations', 'energy'],
    title: {
      de: 'Digitale Betriebsplattform fuer Hausverwaltung',
      en: 'Digital operating platform for property management',
    },
    subtitle: {
      de: 'Projektbeschreibung fuer eine integrierte Hausverwaltungsloesung mit ERP, CRM, Automatisierung und IoT.',
      en: 'Project description for an integrated property management solution with ERP, CRM, automation, and IoT.',
    },
    clientProfile: {
      de: 'Hausverwaltung mit wachsendem Bestand und Bedarf an weniger Reibung in Vermietung, Stoerung, Abrechnung und Eigentuermerkommunikation.',
      en: 'Property management company with growing portfolio and a need to reduce friction in leasing, maintenance, billing, and owner communication.',
    },
    objective: {
      de: 'IlmTech fuehrt verstreute Systeme in ein steuerbares Betriebsmodell zusammen und etabliert dabei automatische Kalkulation, Verwaltung und Erstellung der Nebenkostenabrechnung.',
      en: 'IlmTech combines disconnected systems into a controllable operating model and establishes automated utility-cost calculation, management, and statement creation.',
    },
    highlights: [
      {
        de: 'Ein integrierter Betriebsfluss statt isolierter Tools.',
        en: 'One integrated operating flow instead of isolated tools.',
      },
      {
        de: 'Klare Rollen zwischen Verwaltung, Dienstleistern und Technik.',
        en: 'Clear roles across administration, service partners, and technical operations.',
      },
      {
        de: 'Automatisierte Nebenkostenabrechnung als operativer Kernnutzen.',
        en: 'Automated utility-cost statement processing as a core operational benefit.',
      },
    ],
    architecture: [
      {
        title: { de: 'Ebene CRM', en: 'CRM layer' },
        points: [
          {
            de: 'Fuehrt Lead-Prozesse, Eigentuemerbetreuung und Eskalationen.',
            en: 'Leads owner care processes and escalation tracking.',
          },
        ],
      },
      {
        title: { de: 'Ebene Verwaltung', en: 'Operations layer' },
        points: [
          {
            de: 'Objekte, Vertraege, Tickets und Dokumente als operatives Rueckgrat.',
            en: 'Properties, contracts, tickets, and documents as operational backbone.',
          },
        ],
      },
      {
        title: { de: 'Ebene ERP & Automation', en: 'ERP and automation layer' },
        points: [
          {
            de: 'Kostenkontrolle, Freigaben und automatische Prozesssteuerung.',
            en: 'Cost control, approvals, and automated process orchestration.',
          },
        ],
      },
      {
        title: { de: 'Ebene IoT', en: 'IoT layer' },
        points: [
          {
            de: 'Zustandsdaten aus Heizung, Zaehlern, Leckage und Energie.',
            en: 'Operational data from heating, metering, leakage, and energy systems.',
          },
        ],
      },
    ],
    workflows: [
      {
        title: { de: 'Vermietung und Start', en: 'Leasing and onboarding' },
        summary: {
          de: 'Von Anfrage bis Einzug in einem gesteuerten Ablauf.',
          en: 'From inquiry to move-in in one controlled flow.',
        },
        steps: [
          {
            de: 'Anfragen im CRM qualifizieren und in den Prozess uebernehmen.',
            en: 'Qualify incoming requests in CRM and route to process.',
          },
          {
            de: 'Objekt, Einheiten und Einzugsaufgaben zentral vorbereiten.',
            en: 'Prepare units, contracts, and move-in tasks centrally.',
          },
        ],
      },
      {
        title: { de: 'Abrechnung und Zahlung', en: 'Billing and payments' },
        summary: {
          de: 'Miete, Rueckstaende und Nebenkostenabrechnung konsistent steuern.',
          en: 'Manage rent, arrears, and utility statements consistently.',
        },
        steps: [
          {
            de: 'Nebenkosten automatisch kalkulieren und pruefen.',
            en: 'Automatically calculate and verify utility costs.',
          },
          {
            de: 'Nebenkostenabrechnungen erzeugen, bereitstellen und revisionssicher ablegen.',
            en: 'Generate, publish, and archive utility statements in an audit-safe way.',
          },
        ],
      },
    ],
    roadmap: [
      {
        title: { de: '1. Strategieworkshop', en: '1. Strategy workshop' },
        points: [
          {
            de: 'Zielbild, Prioritaeten und Pilotumfang festlegen.',
            en: 'Define target model, priorities, and pilot scope.',
          },
        ],
      },
      {
        title: { de: '2. Pilot', en: '2. Pilot' },
        points: [
          {
            de: 'Kernprozesse und Nebenkostenabrechnung automatisiert umsetzen.',
            en: 'Implement core workflows and utility statement automation.',
          },
        ],
      },
      {
        title: { de: '3. Betrieb und Ausbau', en: '3. Operate and scale' },
        points: [
          {
            de: 'Weitere Objekte, Prozesse und Zusatzleistungen anschliessen.',
            en: 'Onboard more properties, workflows, and service packages.',
          },
        ],
      },
    ],
    offer: [
      {
        title: { de: 'Einstiegsangebot', en: 'Entry package' },
        points: [
          {
            de: 'Beratungs- und Setup-Paket mit messbarem Pilotstart.',
            en: 'Consulting and setup package with measurable pilot kickoff.',
          },
        ],
      },
      {
        title: { de: 'Folgeleistung', en: 'Follow-up engagement' },
        points: [
          {
            de: 'Betreuter Betrieb mit laufender Optimierung und Erweiterung.',
            en: 'Managed operation with continuous optimization and expansion.',
          },
        ],
      },
    ],
  },
  {
    slug: 'kmu-automatisierung-serviceplattform',
    categories: ['sme', 'automation', 'operations'],
    title: {
      de: 'Serviceplattform fuer KMU-Automatisierung',
      en: 'Service platform for SME automation',
    },
    subtitle: {
      de: 'Projektvorlage fuer die Automatisierung wiederkehrender Prozesse in kleinen und mittleren Unternehmen.',
      en: 'Project template for automating recurring workflows in small and medium-sized businesses.',
    },
    clientProfile: {
      de: 'KMU mit manuellen, zeitintensiven Prozessen in Angebot, Ticketing, Berichtswesen und Nachverfolgung.',
      en: 'SME with manual, time-intensive workflows in quoting, ticketing, reporting, and follow-up.',
    },
    objective: {
      de: 'IlmTech baut eine integrierte Plattform aus CRM, ERP und Prozessautomatisierung auf, um Routinevorgaenge messbar zu beschleunigen.',
      en: 'IlmTech builds an integrated CRM, ERP, and workflow automation platform to measurably accelerate routine operations.',
    },
    highlights: [
      {
        de: 'Weniger manuelle Uebergaben zwischen Teams und Tools.',
        en: 'Fewer manual handovers between teams and tools.',
      },
      {
        de: 'Saubere Prozesssteuerung von Anfrage bis Abschluss.',
        en: 'Clean workflow orchestration from inquiry to completion.',
      },
      {
        de: 'Berichte und Kennzahlen automatisch aus denselben Daten.',
        en: 'Reports and metrics generated automatically from one data base.',
      },
    ],
    architecture: [
      {
        title: { de: 'Ebene Vertrieb und CRM', en: 'Sales and CRM layer' },
        points: [
          {
            de: 'Leadannahme, Angebotsstatus und Kundenkommunikation in einem Fluss.',
            en: 'Lead intake, quote status, and client communication in one flow.',
          },
        ],
      },
      {
        title: { de: 'Ebene Auftragsabwicklung', en: 'Operations layer' },
        points: [
          {
            de: 'Ticketing, Aufgabensteuerung und Freigaben mit klaren Verantwortungen.',
            en: 'Ticketing, task orchestration, and approvals with clear ownership.',
          },
        ],
      },
      {
        title: { de: 'Ebene Daten und Berichte', en: 'Data and reporting layer' },
        points: [
          {
            de: 'Automatisierte Kennzahlen, Berichte und Auswertungen fuer Management und Team.',
            en: 'Automated metrics, reports, and analytics for management and teams.',
          },
        ],
      },
    ],
    workflows: [
      {
        title: { de: 'Anfrage bis Angebot', en: 'Inquiry to quote' },
        summary: {
          de: 'Eingehende Anfragen werden automatisch qualifiziert und als Angebot vorbereitet.',
          en: 'Incoming inquiries are automatically qualified and prepared as quotes.',
        },
        steps: [
          {
            de: 'Anfrage erfassen, priorisieren und dem passenden Team zuweisen.',
            en: 'Capture, prioritize, and assign inquiries to the right team.',
          },
          {
            de: 'Angebotserstellung mit Vorlagen und automatischen Erinnerungen.',
            en: 'Quote generation with templates and automatic reminders.',
          },
        ],
      },
      {
        title: { de: 'Auftrag bis Abschluss', en: 'Order to completion' },
        summary: {
          de: 'Aufgaben, Fristen und Rueckmeldungen laufen transparent ueber einen gesteuerten Prozess.',
          en: 'Tasks, deadlines, and feedback run transparently through a controlled process.',
        },
        steps: [
          {
            de: 'Auftragsstatus, Verantwortungen und Fristen automatisch verfolgen.',
            en: 'Track status, ownership, and deadlines automatically.',
          },
          {
            de: 'Abschlussdokumentation und Berichtserzeugung ohne Medienbruch.',
            en: 'Generate completion records and reports without media breaks.',
          },
        ],
      },
    ],
    roadmap: [
      {
        title: { de: '1. Prozessaufnahme', en: '1. Process mapping' },
        points: [
          {
            de: 'Ist-Prozesse, Engpaesse und Prioritaeten gemeinsam festlegen.',
            en: 'Map current workflows, bottlenecks, and priorities.',
          },
        ],
      },
      {
        title: { de: '2. Kernautomatisierung', en: '2. Core automation' },
        points: [
          {
            de: 'Zentrale Vertriebs- und Auftragsprozesse automatisiert umsetzen.',
            en: 'Automate core sales and operations workflows.',
          },
        ],
      },
      {
        title: { de: '3. Ausbau und Skalierung', en: '3. Expansion and scale' },
        points: [
          {
            de: 'Weitere Teams, Prozesse und Kennzahlenmodelle integrieren.',
            en: 'Integrate additional teams, workflows, and metrics models.',
          },
        ],
      },
    ],
    offer: [
      {
        title: { de: 'Startpaket', en: 'Starter package' },
        points: [
          {
            de: 'Schneller Einstieg mit klarer Priorisierung und pilotfaehigem Prozesskern.',
            en: 'Fast onboarding with clear priorities and pilot-ready process core.',
          },
        ],
      },
      {
        title: { de: 'Betriebspaket', en: 'Operations package' },
        points: [
          {
            de: 'Laufende Optimierung, Betreuung und Erweiterung auf weitere Bereiche.',
            en: 'Continuous optimization, support, and expansion into further departments.',
          },
        ],
      },
    ],
  },
  {
    slug: 'insolvenzaufloesung-inventarauktionen',
    categories: ['operations', 'automation', 'auction'],
    title: {
      de: 'Plattform fuer Insolvenzaufloesung und Inventarauktionen',
      en: 'Platform for insolvency liquidation and inventory auctions',
    },
    subtitle: {
      de: 'Beispielprojekt fuer die digitale Steuerung von Aufnahme, Bewertung, Auktion und Verwertung von Insolvenz-Inventar.',
      en: 'Sample project for digital orchestration of intake, valuation, auction, and realization of insolvency inventory.',
    },
    clientProfile: {
      de: 'Dienstleister fuer Insolvenzaufloesung, Verwertung und Auktionen mit hohem Koordinationsaufwand zwischen Glaeubigern, Standorten und Interessenten.',
      en: 'Service provider for insolvency liquidation, realization, and auctions with high coordination needs across creditors, sites, and bidders.',
    },
    objective: {
      de: 'IlmTech baut eine durchgaengige Betriebsplattform, die Inventarerfassung, Bewertung, Auktionsabwicklung und Dokumentation in einem nachvollziehbaren Prozess verbindet.',
      en: 'IlmTech builds an end-to-end operating platform that unifies inventory intake, valuation, auction execution, and documentation in one traceable process.',
    },
    highlights: [
      {
        de: 'Schnellere Verwertung durch standardisierte Aufnahme und digitale Freigaben.',
        en: 'Faster realization through standardized intake and digital approvals.',
      },
      {
        de: 'Transparente Auktionssteuerung mit klaren Rollen und Fristen.',
        en: 'Transparent auction orchestration with clear ownership and deadlines.',
      },
      {
        de: 'Revisionssichere Dokumentation fuer Insolvenzakte und Nachweisfuehrung.',
        en: 'Audit-safe documentation for insolvency files and evidence records.',
      },
    ],
    architecture: [
      {
        title: { de: 'Ebene Fallsteuerung', en: 'Case management layer' },
        points: [
          {
            de: 'Faelle, Standorte, Glaeubigerkommunikation und Fristen zentral steuern.',
            en: 'Manage cases, sites, creditor communication, and deadlines centrally.',
          },
        ],
      },
      {
        title: { de: 'Ebene Inventar und Bewertung', en: 'Inventory and valuation layer' },
        points: [
          {
            de: 'Inventar mit Zustand, Marktwert, Fotos und Nachweisen strukturiert erfassen.',
            en: 'Capture inventory with condition, market value, photos, and evidence in a structured model.',
          },
        ],
      },
      {
        title: { de: 'Ebene Auktion und Abwicklung', en: 'Auction and execution layer' },
        points: [
          {
            de: 'Losbildung, Bieterkommunikation, Zuschlag und Zahlungsprozess digital abbilden.',
            en: 'Digitally manage lot creation, bidder communication, award, and payment flow.',
          },
        ],
      },
    ],
    workflows: [
      {
        title: { de: 'Fallstart und Inventarerfassung', en: 'Case start and inventory intake' },
        summary: {
          de: 'Vom neuen Insolvenzfall bis zur freigegebenen Inventarliste mit klaren Verantwortungen.',
          en: 'From new insolvency case to approved inventory list with clear ownership.',
        },
        steps: [
          {
            de: 'Fall anlegen, Fristen setzen und Beteiligte strukturieren.',
            en: 'Create case, define deadlines, and structure stakeholders.',
          },
          {
            de: 'Inventar vor Ort digital erfassen, bewerten und zur Freigabe vorlegen.',
            en: 'Digitally capture and value on-site inventory, then submit for approval.',
          },
        ],
      },
      {
        title: { de: 'Auktion bis Verwertung', en: 'Auction to realization' },
        summary: {
          de: 'Losbildung, Bietphase, Zuschlag und Dokumentation in einem gefuehrten Ablauf.',
          en: 'Lot creation, bidding, award, and documentation in one guided process.',
        },
        steps: [
          {
            de: 'Auktionslose erzeugen, Termine kommunizieren und Bieteranfragen steuern.',
            en: 'Create auction lots, communicate timelines, and manage bidder inquiries.',
          },
          {
            de: 'Zuschlag, Zahlung, Abholung und Abschlussnachweise revisionssicher dokumentieren.',
            en: 'Document award, payment, pickup, and completion evidence in an audit-safe trail.',
          },
        ],
      },
    ],
    roadmap: [
      {
        title: { de: '1. Fall- und Prozessdesign', en: '1. Case and process design' },
        points: [
          {
            de: 'Rollen, Freigaben, Fristen und Nachweise gemeinsam definieren.',
            en: 'Define roles, approvals, deadlines, and evidence model together.',
          },
        ],
      },
      {
        title: { de: '2. Pilot mit Echtfall', en: '2. Pilot with live case' },
        points: [
          {
            de: 'Einen Insolvenzfall inklusive Auktion Ende-zu-Ende digital umsetzen.',
            en: 'Run one insolvency case including auction end-to-end digitally.',
          },
        ],
      },
      {
        title: { de: '3. Standardisierung und Skalierung', en: '3. Standardize and scale' },
        points: [
          {
            de: 'Vorlagen, Berichte und SLA-Modelle fuer weitere Faelle ausrollen.',
            en: 'Roll out templates, reports, and SLA models across additional cases.',
          },
        ],
      },
    ],
    offer: [
      {
        title: { de: 'Pilotpaket Insolvenzfall', en: 'Insolvency pilot package' },
        points: [
          {
            de: 'Setup fuer Fallsteuerung, Inventarerfassung und Auktionsprozess mit messbarem Pilotziel.',
            en: 'Setup for case steering, inventory intake, and auction process with measurable pilot outcome.',
          },
        ],
      },
      {
        title: { de: 'Betriebspaket Verwertung', en: 'Realization operations package' },
        points: [
          {
            de: 'Laufende Betreuung, KPI-Tracking und Optimierung ueber mehrere Standorte.',
            en: 'Ongoing support, KPI tracking, and optimization across multiple sites.',
          },
        ],
      },
    ],
  },
];

export const projectCategories = [
  { id: 'real-estate', label: { de: 'Immobilien', en: 'Real estate' } },
  { id: 'sme', label: { de: 'KMU', en: 'SME' } },
  { id: 'automation', label: { de: 'Automatisierung', en: 'Automation' } },
  { id: 'operations', label: { de: 'Betrieb', en: 'Operations' } },
  { id: 'auction', label: { de: 'Auktion', en: 'Auction' } },
  { id: 'energy', label: { de: 'Energie', en: 'Energy' } },
] as const;

export function getProjectTemplates(locale: Locale) {
  return projectTemplates.map((project) => ({
    slug: project.slug,
    categories: project.categories,
    title: project.title[locale],
    subtitle: project.subtitle[locale],
    clientProfile: project.clientProfile[locale],
  }));
}

export function getProjectBySlug(slug: string) {
  return projectTemplates.find((project) => project.slug === slug);
}

export function t(value: Localized, locale: Locale) {
  return value[locale];
}
