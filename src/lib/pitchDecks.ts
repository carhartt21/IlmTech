export interface PitchDeck {
  id: string;
  industry: string;
  title: string;
  positioning: string;
  challenge: string[];
  targetModel: string[];
  pilotPath: string[];
  offer: string[];
  businessImpact: string[];
  starter?: string;
}

export interface PitchTemplate {
  title: string;
  subtitle: string;
  blocks: string[];
  notes: string[];
}

export interface PitchSectionContent {
  heading: string;
  intro: string;
  template: PitchTemplate;
  decks: PitchDeck[];
}

export function getPitchContent(locale: string): PitchSectionContent {
  if (locale === 'en') {
    return {
      heading: 'Industry Pitch Decks',
      intro:
        'A reusable one-page sales blueprint for client conversations. The first deck is based on the existing property management pitch and serves as the source template for additional industries.',
      template: {
        title: 'Reusable pitch template',
        subtitle: 'Use this structure for every vertical to keep sales conversations focused and comparable.',
        blocks: [
          'Problem-first opening: current friction and lost margin',
          'Target model: 4-6 integrated layers, not isolated tools',
          'Pilot path: 3 phases from workshop to managed operation',
          'Offer close: small entry package plus scale-up path',
        ],
        notes: [
          'Keep each pitch to one page and one buying decision.',
          'Anchor each deck in 3-4 concrete, understandable processes.',
          'Sell measurable business effect before technical details.',
        ],
      },
      decks: [
        {
          id: 'property-management',
          industry: 'Property Management',
          title: 'Digital operations platform for property portfolios',
          positioning:
            'Based on the existing one-page deck: connect CRM, management platform, ERP, automation, IoT and portals into one operating model.',
          starter: 'Source deck: pitch/property-management-system-dashboard.html',
          challenge: [
            'Scattered tools, spreadsheets and chat threads',
            'Reactive maintenance and weak prioritization',
            'Owner, tenant and supplier communication not synchronized',
          ],
          targetModel: [
            'CRM for lead and owner lifecycle',
            'Management platform for contracts, tickets and billing',
            'ERP for costs, approvals and profitability',
            'Automation for triggers and process handovers',
            'IoT for meter, heating, leakage, PV and wallbox signals',
            'Portals for tenants, owners and service partners',
          ],
          pilotPath: [
            'Renting and move-in process',
            'Fault and repair workflow',
            'Billing and payment process',
            'Energy and ESG process including utility statements',
          ],
          offer: [
            'Strategy workshop with target operating model',
            'Pilot implementation for a scoped property cluster',
            'Transition to managed operations and expansion',
          ],
          businessImpact: [
            'Less operational friction across teams',
            'Faster, cleaner utility statement cycle',
            'Higher owner transparency and trust',
          ],
        },
        {
          id: 'insolvency-auctions',
          industry: 'Insolvency Resolution & Auctions',
          title: 'Case-to-auction orchestration platform',
          positioning:
            'Unify creditor communication, asset intake, valuation, auction execution and settlement in one controlled process chain.',
          challenge: [
            'Case data split across email, files and accounting systems',
            'Manual handoffs between legal, valuation and auction operations',
            'Weak visibility on deadlines, proceeds and commissions',
          ],
          targetModel: [
            'Case CRM for parties and legal milestones',
            'Asset operations workspace for intake and documentation',
            'Auction workflow with approvals and publishing',
            'Settlement and commission accounting in ERP',
            'Automated alerts for deadline-critical actions',
          ],
          pilotPath: [
            'Case onboarding and document collection',
            'Asset classification and valuation track',
            'Auction publication to winner communication',
            'Settlement, payout and reporting close',
          ],
          offer: [
            'Workshop for legal and operational process mapping',
            'Pilot for one asset class and one auction format',
            'Rollout to full case portfolio with reporting cockpit',
          ],
          businessImpact: [
            'Shorter cycle from case intake to liquidation',
            'Lower process risk around legal deadlines',
            'Better transparency for courts and creditors',
          ],
        },
        {
          id: 'medical-practices',
          industry: 'Medical Practices',
          title: 'Practice flow and patient journey automation',
          positioning:
            'Connect patient intake, triage, appointment, follow-up and billing preparation while preserving privacy and role boundaries.',
          challenge: [
            'Front desk overload and frequent phone interruptions',
            'Inconsistent process for forms, recalls and reminders',
            'Admin burden reduces treatment focus',
          ],
          targetModel: [
            'Patient contact hub with structured requests',
            'Workflow engine for triage and appointment logic',
            'Task board for clinical and administrative handoffs',
            'Automated reminders and missing-data checks',
            'Reporting view for throughput and no-show patterns',
          ],
          pilotPath: [
            'Digital intake and form completion process',
            'Appointment confirmation and reminder automation',
            'Post-visit follow-up and task closure loop',
            'Billing pre-check and claim preparation workflow',
          ],
          offer: [
            'Privacy-first process workshop and scope definition',
            'Pilot for one specialty team and one visit type',
            'Scale-up with governance and KPI review routines',
          ],
          businessImpact: [
            'Fewer avoidable no-shows and manual callbacks',
            'Faster administrative turnaround',
            'More time for patient-facing work',
          ],
        },
        {
          id: 'law-firms',
          industry: 'Law Firms',
          title: 'Matter operations and deadline intelligence',
          positioning:
            'Move from fragmented matter handling to a controlled, deadline-safe operating model across mandates.',
          challenge: [
            'Matter updates spread over inboxes and local documents',
            'Deadline tracking depends on manual discipline',
            'Knowledge reuse is limited and inconsistent',
          ],
          targetModel: [
            'Matter lifecycle CRM for intake to closure',
            'Document pipeline with classification and handoff rules',
            'Deadline engine with escalation logic',
            'Time and activity visibility for each mandate',
            'Client communication templates with status automation',
          ],
          pilotPath: [
            'New mandate intake and conflict checks',
            'Document triage and filing process',
            'Deadline and hearing coordination workflow',
            'Client status reporting and billing prep',
          ],
          offer: [
            'Workshop to define deadline-critical control points',
            'Pilot for one mandate type and one legal team',
            'Managed expansion to full firm operating model',
          ],
          businessImpact: [
            'Lower risk of missed procedural deadlines',
            'More predictable matter throughput',
            'Higher client confidence through clear updates',
          ],
        },
        {
          id: 'craft-businesses',
          industry: 'Craft & Trade Businesses',
          title: 'Quote-to-job-to-invoice production flow',
          positioning:
            'Link sales requests, planning, field execution and invoicing so small teams can run like a coordinated operation.',
          challenge: [
            'Quotes, schedules and material orders are disconnected',
            'Technician updates arrive late and incomplete',
            'Invoice readiness is delayed by missing data',
          ],
          targetModel: [
            'Lead and quote pipeline with status control',
            'Job planning board with technician assignment',
            'Mobile execution updates and checklist capture',
            'Material and supplier trigger automation',
            'Invoice preparation with completed-work validation',
          ],
          pilotPath: [
            'Lead intake and quote qualification process',
            'Work order planning and technician dispatch',
            'On-site completion evidence capture',
            'Invoice release and payment follow-up',
          ],
          offer: [
            'Operations workshop with bottleneck mapping',
            'Pilot for one service line and one team',
            'Scale-up with KPI dashboard and routine review',
          ],
          businessImpact: [
            'Shorter quote-to-cash cycle',
            'Fewer scheduling conflicts and rework loops',
            'Higher margin through cleaner operational control',
          ],
        },
        {
          id: 'hotels',
          industry: 'Hotels',
          title: 'Guest journey and operations control deck',
          positioning:
            'Coordinate reservation, arrival, housekeeping, maintenance and guest communication through one operating fabric.',
          challenge: [
            'Guest requests and tasks are split across channels',
            'Housekeeping and maintenance updates are delayed',
            'Managers lack real-time view on service quality and cost',
          ],
          targetModel: [
            'Guest communication hub with categorized requests',
            'Operations board for room, service and incident tasks',
            'Automated dispatch rules for housekeeping and maintenance',
            'Energy and room-state signals feeding priority logic',
            'Management cockpit for service level and response times',
          ],
          pilotPath: [
            'Pre-arrival messaging and request capture',
            'Check-in to room readiness coordination',
            'Incident handling and maintenance escalation',
            'Checkout follow-up and review request automation',
          ],
          offer: [
            'Hospitality workflow workshop and service blueprint',
            'Pilot on one floor or one property wing',
            'Rollout with SLA monitoring and team enablement',
          ],
          businessImpact: [
            'Improved guest response speed and consistency',
            'Lower operational friction between teams',
            'Better occupancy economics through cleaner execution',
          ],
        },
      ],
    };
  }

  return {
    heading: 'Pitch-Decks fuer Zielbranchen',
    intro:
      'Eine wiederverwendbare One-Page-Verkaufsstruktur fuer Kundengespraeche. Das erste Deck basiert direkt auf dem bestehenden Hausverwaltungs-Pitch und dient als Vorlage fuer weitere Branchen.',
    template: {
      title: 'Wiederverwendbare Pitch-Vorlage',
      subtitle: 'Diese Struktur wird fuer jede Branche genutzt, damit Verkaufsgespraeche klar und vergleichbar bleiben.',
      blocks: [
        'Problem-Einstieg: operative Reibung und verlorene Marge',
        'Zielmodell: 4-6 integrierte Ebenen statt Inselloesungen',
        'Pilotpfad: 3 Phasen von Workshop bis Betriebsmodell',
        'Angebotsschluss: kleines Einstiegsprojekt plus Ausbaupfad',
      ],
      notes: [
        'Jedes Deck bleibt auf einer Seite und auf eine Kaufentscheidung fokussiert.',
        'Jedes Deck verankert die Story in 3-4 sofort verstaendlichen Prozessen.',
        'Zuerst messbarer Geschaeftseffekt, danach technische Tiefe.',
      ],
    },
    decks: [
      {
        id: 'hausverwaltung',
        industry: 'Hausverwaltung',
        title: 'Digitale Betriebsplattform fuer den Immobilienbestand',
        positioning:
          'Basierend auf dem bestehenden One-Page-Pitch: CRM, Verwaltungsplattform, ERP, Automation, IoT und Portale werden zu einem fuehrbaren Betriebsmodell verbunden.',
        starter: 'Ausgangsdeck: pitch/property-management-system-dashboard.html',
        challenge: [
          'Getrennte Tools, Tabellen und Chatverlaeufe',
          'Stoerungen und Wartung laufen reaktiv statt priorisiert',
          'Eigentuemer-, Mieter- und Dienstleisterkommunikation ist nicht synchron',
        ],
        targetModel: [
          'CRM fuer Lead- und Eigentuemerentwicklung',
          'Verwaltungsplattform fuer Vertraege, Tickets und Abrechnung',
          'ERP fuer Kosten, Freigaben und Profitabilitaet',
          'Automation fuer Trigger und Prozessuebergaben',
          'IoT fuer Zaehler-, Heizungs-, Leckage-, PV- und Wallboxdaten',
          'Portale fuer Mieter, Eigentuemer und Partner',
        ],
        pilotPath: [
          'Vermietung und Einzug',
          'Stoerung und Reparatur',
          'Abrechnung und Zahlung',
          'Energie und ESG inkl. Nebenkostenabrechnung',
        ],
        offer: [
          'Strategieworkshop mit Zielbetriebsmodell',
          'Pilot-Umsetzung fuer einen klar abgegrenzten Objektbereich',
          'Uebergang in laufenden Betrieb und Ausbau',
        ],
        businessImpact: [
          'Weniger operative Reibung zwischen Teams',
          'Schnellerer, nachvollziehbarer Nebenkostenprozess',
          'Mehr Transparenz und Vertrauen bei Eigentuemern',
        ],
      },
      {
        id: 'insolvenz-auktionswesen',
        industry: 'Insolvenzaufloesung und Auktionen',
        title: 'Case-to-Auction Orchestrierung',
        positioning:
          'Glaeubigerkommunikation, Asset-Aufnahme, Bewertung, Auktionsabwicklung und Settlement werden in einer gefuehrten Prozesskette gebuendelt.',
        challenge: [
          'Falldaten liegen verteilt ueber E-Mail, Dateien und Buchhaltung',
          'Manuelle Uebergaben zwischen Recht, Bewertung und Operations',
          'Schwache Transparenz bei Fristen, Erloesen und Provisionen',
        ],
        targetModel: [
          'Case-CRM fuer Parteien und juristische Meilensteine',
          'Asset-Workspace fuer Aufnahme und Dokumentation',
          'Auktions-Workflow mit Freigaben und Publikation',
          'Settlement und Provisionslogik im ERP',
          'Automatische Fristen- und Eskalationsmeldungen',
        ],
        pilotPath: [
          'Case-Onboarding und Dokumentensammlung',
          'Asset-Klassifizierung und Bewertung',
          'Auktionspublikation bis Gewinnerkommunikation',
          'Settlement, Auszahlung und Reporting-Abschluss',
        ],
        offer: [
          'Workshop fuer juristisches und operatives Prozessdesign',
          'Pilot fuer eine Asset-Klasse und ein Auktionsformat',
          'Rollout auf das gesamte Fallportfolio',
        ],
        businessImpact: [
          'Kuerzere Durchlaufzeit von Fallaufnahme bis Liquidation',
          'Weniger Prozessrisiko bei rechtlichen Fristen',
          'Bessere Nachvollziehbarkeit fuer Gericht und Glaeubiger',
        ],
      },
      {
        id: 'medizinische-praxen',
        industry: 'Medizinische Praxen',
        title: 'Praxisablauf und Patientenreise automatisieren',
        positioning:
          'Patientenaufnahme, Triage, Termin, Nachgang und Abrechnungsvorbereitung werden verbunden, ohne Rollen oder Datenschutz zu verwischen.',
        challenge: [
          'Frontdesk-Ueberlastung durch Telefonunterbrechungen',
          'Uneinheitliche Prozesse bei Formularen und Erinnerungen',
          'Administrative Last reduziert Behandlungsfokus',
        ],
        targetModel: [
          'Kontakt-Hub mit strukturierten Patientenanliegen',
          'Workflow-Engine fuer Triage- und Terminlogik',
          'Aufgabenboard fuer medizinische und administrative Uebergaben',
          'Automatisierte Erinnerungen und Datenvollstaendigkeits-Checks',
          'Reporting fuer Durchsatz und No-Show-Muster',
        ],
        pilotPath: [
          'Digitale Aufnahme und Formularprozess',
          'Terminbestaetigung und Erinnerung',
          'Nachsorge und Aufgabenabschluss',
          'Abrechnungsvorpruefung und Uebergabe',
        ],
        offer: [
          'Datenschutzfokussierter Prozess-Workshop und Scope',
          'Pilot fuer ein Fachteam und einen Besuchstyp',
          'Ausbau mit Governance und KPI-Routinen',
        ],
        businessImpact: [
          'Weniger vermeidbare No-Shows und Rueckrufaufwand',
          'Schnellere administrative Durchlaeufe',
          'Mehr Zeit fuer Patientenarbeit',
        ],
      },
      {
        id: 'anwaltskanzleien',
        industry: 'Anwaltskanzleien',
        title: 'Mandatsbetrieb und Fristenintelligenz',
        positioning:
          'Von fragmentierter Mandatsbearbeitung zu einem fristsicheren, fuehrbaren Betriebsmodell ueber alle Mandate.',
        challenge: [
          'Mandatsstatus verteilt ueber Postfaecher und lokale Dateien',
          'Fristenkontrolle beruht stark auf manueller Disziplin',
          'Wissenswiederverwendung ist uneinheitlich',
        ],
        targetModel: [
          'Mandats-CRM von Intake bis Abschluss',
          'Dokumenten-Pipeline mit Klassifikation und Regeln',
          'Fristen-Engine mit Eskalationslogik',
          'Zeit- und Aktivitaetstransparenz je Mandat',
          'Vorlagenbasierte Mandantenkommunikation mit Statusautomation',
        ],
        pilotPath: [
          'Neumandat-Intake und Konfliktpruefung',
          'Dokumententriage und Aktenablage',
          'Fristen- und Terminsteuerung',
          'Statusreporting und Abrechnungsvorbereitung',
        ],
        offer: [
          'Workshop fuer fristenkritische Kontrollpunkte',
          'Pilot fuer einen Mandatstyp und ein Team',
          'Schrittweiser Ausbau auf Kanzlei-Betriebsmodell',
        ],
        businessImpact: [
          'Niedrigeres Risiko verpasster Fristen',
          'Planbarere Mandatsdurchlaeufe',
          'Hoehere Mandantenzufriedenheit durch klare Updates',
        ],
      },
      {
        id: 'handwerksbetriebe',
        industry: 'Handwerksbetriebe',
        title: 'Vom Angebot zum Auftrag bis zur Rechnung',
        positioning:
          'Anfragen, Planung, Feldeinsatz und Rechnungsstellung werden verbunden, damit kleine Teams wie ein gesteuerter Betrieb arbeiten.',
        challenge: [
          'Angebote, Terminplanung und Materialfluss sind entkoppelt',
          'Rueckmeldungen von der Baustelle kommen spaet oder unvollstaendig',
          'Rechnungsfreigaben verzoegern sich durch fehlende Daten',
        ],
        targetModel: [
          'Lead- und Angebots-Pipeline mit Statusfuehrung',
          'Einsatzplanung mit Team- und Technikerzuordnung',
          'Mobile Rueckmeldungen mit Checklisten',
          'Automatische Material- und Lieferanten-Trigger',
          'Rechnungsvorbereitung mit Leistungsnachweis',
        ],
        pilotPath: [
          'Anfrageaufnahme und Angebotsqualifizierung',
          'Auftragsplanung und Disposition',
          'Vor-Ort-Leistungsnachweis',
          'Rechnungsfreigabe und Zahlungslauf',
        ],
        offer: [
          'Operations-Workshop mit Engpassanalyse',
          'Pilot fuer eine Service-Linie und ein Team',
          'Ausbau mit KPI-Cockpit und Regelroutinen',
        ],
        businessImpact: [
          'Kuerzerer Angebots-zu-Cash-Zyklus',
          'Weniger Termin- und Nacharbeitskonflikte',
          'Bessere Marge durch saubere Betriebssteuerung',
        ],
      },
      {
        id: 'hotels',
        industry: 'Hotels',
        title: 'Gaestereise und Hotelbetrieb vernetzt steuern',
        positioning:
          'Reservierung, Anreise, Housekeeping, Instandhaltung und Gastkommunikation laufen ueber ein gemeinsames Betriebsgewebe.',
        challenge: [
          'Gaesteanfragen und Aufgaben liegen in mehreren Kanaelen',
          'Housekeeping- und Technikstatus kommen verspaetet',
          'Leitungsteams haben wenig Echtzeit-Sicht auf Servicequalitaet',
        ],
        targetModel: [
          'Gaeste-Hub mit kategorisierten Serviceanfragen',
          'Betriebsboard fuer Zimmer-, Service- und Incident-Aufgaben',
          'Automatische Dispositionsregeln fuer Housekeeping und Technik',
          'Energie- und Zimmerstatus als Prioritaetsdaten',
          'Management-Cockpit fuer SLA und Reaktionszeiten',
        ],
        pilotPath: [
          'Pre-Arrival-Nachrichten und Anfrageaufnahme',
          'Check-in bis Zimmerfreigabe-Steuerung',
          'Incident-Handling und Eskalation',
          'Checkout-Follow-up und Bewertungsanfrage',
        ],
        offer: [
          'Hospitality-Workshop mit Service-Blueprint',
          'Pilot auf einer Etage oder einem Gebaeudeteil',
          'Rollout mit SLA-Monitoring und Team-Enabling',
        ],
        businessImpact: [
          'Schnellere, konsistente Gastreaktionen',
          'Weniger operative Reibung zwischen Teams',
          'Bessere Auslastungsoekonomie durch klare Prozesse',
        ],
      },
    ],
  };
}

export function getPitchDeckById(locale: string, id: string) {
  const content = getPitchContent(locale);
  return content.decks.find((deck) => deck.id === id);
}
