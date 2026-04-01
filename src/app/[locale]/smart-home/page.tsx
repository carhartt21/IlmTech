import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import SectionHeading from '@/components/SectionHeading';
import CTAButton from '@/components/CTAButton';
import EnergyDashboard from '@/components/EnergyDashboard';
import {
  SunIcon, PlugIcon, ChartIcon, HouseIcon, LockIcon, ThermometerIcon,
  WrenchIcon, LayoutIcon, CpuIcon, DropletIcon,
  UnlockIcon, LinkIcon, SmartphoneIcon, RefreshIcon, GlobeIcon,
} from '@/components/Icons';
import { locales, getDictionary, type Locale } from '@/i18n/config';
import type { ReactNode } from 'react';

const serviceIcons: ReactNode[] = [
  <SunIcon key="sun" size={28} />,
  <PlugIcon key="plug" size={28} />,
  <ChartIcon key="chart" size={28} />,
  <HouseIcon key="house" size={28} />,
  <LockIcon key="lock" size={28} />,
  <WrenchIcon key="wrench" size={28} />,
  <ThermometerIcon key="thermo" size={28} />,
  <LayoutIcon key="layout" size={28} />,
  <CpuIcon key="cpu" size={28} />,
  <DropletIcon key="droplet" size={28} />,
];

const serviceImages = [
  '/images/smart-house-solar.jpg',
  '/images/wallbox-solar.jpg',
  '/images/tablet-control.jpg',
  '/images/smart-living-connected.jpg',
  '/images/security-camera.jpg',
  '/images/team-planning.jpg',
  '/images/smart-living-connected.jpg',
  '/images/dashboard.jpeg',
  '/images/smart-home-network.jpg',
  '/images/garden_1.jpeg',
];

const platformIcons: ReactNode[] = [
  <UnlockIcon key="unlock" size={28} />,
  <LinkIcon key="link" size={28} />,
  <HouseIcon key="house2" size={28} />,
  <SmartphoneIcon key="phone" size={28} />,
  <RefreshIcon key="refresh" size={28} />,
  <GlobeIcon key="globe" size={28} />,
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const dict = await getDictionary(locale as Locale);
  return { title: dict.smartHomePage.meta.title, description: dict.smartHomePage.meta.description };
}

export default async function SmartHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const t = dict.smartHomePage;
  const servicesDetail = dict.servicesPage;
  const tech = dict.home.technologies;
  const tp = dict.technologiesPage;
  const platform = dict.servicesPage.platform;

  const tags = [
    ['Zigbee', 'Z-Wave', 'Matter', 'Thread', 'Bluetooth', 'WiFi', 'KNX', 'Modbus', '1-Wire'],
    ['Home Assistant', 'Raspberry Pi', 'Docker', 'Linux', 'MQTT', 'Node-RED', 'ESPHome', 'Tasmota'],
    ['Lovelace', 'HACS', 'Custom Cards', 'Blueprints', 'Templates', 'Jinja2', 'REST API', 'WebSocket'],
    ['OCPP', 'evcc', 'SMA', 'Fronius', 'Victron', 'BMS', 'Shelly', 'SmartMeter'],
    ['Tuya', 'Philips Hue', 'Shelly', 'Sonoff', 'Aqara', 'IKEA', 'Xiaomi', 'TP-Link', 'Ubiquiti'],
    ['Python', 'JavaScript', 'YAML', 'Git', 'Grafana', 'InfluxDB'],
  ];

  const aiTags = [
    ['Ollama', 'OpenClaw', 'LangChain', 'LlamaIndex', 'Whisper'],
    ['n8n', 'Qdrant', 'ChromaDB', 'RAG', 'Vector Search'],
    ['Llama 4', 'Qwen3', 'DeepSeek-R1', 'Mistral', 'Gemma'],
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-blue/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl font-bold text-white">{t.hero.title}</h1>
              <p className="mt-4 text-lg text-text-muted max-w-xl mx-auto lg:mx-0">{t.hero.subtitle}</p>
              <p className="mt-6 text-text-muted max-w-xl mx-auto lg:mx-0">{t.intro}</p>
              <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
                <CTAButton href={`/${locale}/kontakt`}>{dict.nav.cta}</CTAButton>
              </div>
            </div>
            <div>
              <EnergyDashboard />
            </div>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={servicesDetail.hero.title} subtitle={servicesDetail.hero.subtitle} />
          <div className="space-y-16">
            {servicesDetail.services.map((s, i) => (
              <div
                key={i}
                className="grid lg:grid-cols-2 gap-10 items-center"
              >
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-3 mb-4">
                    {serviceIcons[i]}
                    <h2 className="text-2xl font-bold text-white">{s.title}</h2>
                  </div>
                  <p className="text-text-muted leading-relaxed">{s.description}</p>
                  <ul className="mt-6 space-y-2">
                    {s.features.map((f, fi) => (
                      <li key={fi} className="flex items-center gap-2 text-sm text-text-muted">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-blue flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`relative rounded-2xl overflow-hidden border border-white/5 min-h-[280px] ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <Image
                    src={serviceImages[i]}
                    alt={s.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 to-transparent" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 sm:py-28 bg-primary-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={tech.title} subtitle={tech.subtitle} />

          <h2 className="text-2xl font-bold text-white mb-8">{tp.smartHomeHeading}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tech.categories.map((cat, i) => (
              <div key={i}>
                <h3 className="text-sm font-semibold text-white mb-3">{cat.heading}</h3>
                <div className="flex flex-wrap gap-2">
                  {tags[i].map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-white mb-8 mt-16">{tp.aiHeading}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tp.aiCategories.map((cat, i) => (
              <div key={i}>
                <h3 className="text-sm font-semibold text-white mb-3">{cat.heading}</h3>
                <div className="flex flex-wrap gap-2">
                  {aiTags[i].map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={platform.title} subtitle={platform.subtitle} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {platform.items.map((item, i) => (
              <div key={i} className="p-6 rounded-xl bg-surface/30 border border-white/5">
                <div className="mb-4">{platformIcons[i]}</div>
                <h3 className="mt-3 text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-primary-dark/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">{t.cta.title}</h2>
          <p className="mt-4 text-lg text-text-muted">{t.cta.subtitle}</p>
          <div className="mt-8">
            <CTAButton href={`/${locale}/kontakt`}>{t.cta.button}</CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
