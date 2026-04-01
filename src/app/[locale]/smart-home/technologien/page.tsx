import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import SectionHeading from '@/components/SectionHeading';
import CTAButton from '@/components/CTAButton';
import {
  UnlockIcon, LinkIcon, HouseIcon, SmartphoneIcon, RefreshIcon, GlobeIcon,
} from '@/components/Icons';
import { locales, getDictionary, type Locale } from '@/i18n/config';
import type { ReactNode } from 'react';

const platformIcons: ReactNode[] = [
  <UnlockIcon key="unlock" size={28} />,
  <LinkIcon key="link" size={28} />,
  <HouseIcon key="house" size={28} />,
  <SmartphoneIcon key="phone" size={28} />,
  <RefreshIcon key="refresh" size={28} />,
  <GlobeIcon key="globe" size={28} />,
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const dict = await getDictionary(locale as Locale);
  return { title: dict.technologiesPage.meta.title, description: dict.technologiesPage.meta.description };
}

export default async function Technologien({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const tech = dict.home.technologies;
  const platform = dict.servicesPage.platform;
  const tp = dict.technologiesPage;

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
      <section className="relative py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-blue/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">{tech.title}</h1>
          <p className="mt-4 text-lg text-text-muted max-w-2xl mx-auto">{tech.subtitle}</p>
        </div>
      </section>

      {/* Smart Home Technologies */}
      <section className="pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      <section className="py-20 sm:py-28 bg-primary-dark/50">
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
      <section className="py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">{dict.smartHomePage.cta.title}</h2>
          <p className="mt-4 text-lg text-text-muted">{dict.smartHomePage.cta.subtitle}</p>
          <div className="mt-8">
            <CTAButton href={`/${locale}/kontakt`}>{dict.smartHomePage.cta.button}</CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
