interface IconProps {
  className?: string;
  size?: number;
}

const defaultProps = { className: 'text-accent-blue', size: 24 };

function wrap(props: IconProps, d: string | string[]) {
  const { className = defaultProps.className, size = defaultProps.size } = props;
  const paths = Array.isArray(d) ? d : [d];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths.map((p, i) => (
        <path key={i} d={p} />
      ))}
    </svg>
  );
}

// Sun / PV
export function SunIcon(props: IconProps = {}) {
  return wrap(props, [
    'M12 2v2',
    'M12 20v2',
    'M4.93 4.93l1.41 1.41',
    'M17.66 17.66l1.41 1.41',
    'M2 12h2',
    'M20 12h2',
    'M6.34 17.66l-1.41 1.41',
    'M19.07 4.93l-1.41 1.41',
    'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
  ]);
}

// Plug / Wallbox
export function PlugIcon(props: IconProps = {}) {
  return wrap(props, [
    'M8 2v4',
    'M16 2v4',
    'M6 6h12a2 2 0 0 1 2 2v2a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6V8a2 2 0 0 1 2-2z',
    'M10 16v4a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2v-4',
  ]);
}

// Chart / Energiemanagement
export function ChartIcon(props: IconProps = {}) {
  return wrap(props, [
    'M3 3v18h18',
    'M7 16l4-4 4 2 5-6',
  ]);
}

// House / Comfort
export function HouseIcon(props: IconProps = {}) {
  return wrap(props, [
    'M3 10.5L12 3l9 7.5',
    'M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10',
  ]);
}

// Shield / Security
export function ShieldIcon(props: IconProps = {}) {
  return wrap(props, [
    'M12 2l8 4v6c0 5.25-3.5 9.74-8 11-4.5-1.26-8-5.75-8-11V6l8-4z',
    'M9 12l2 2 4-4',
  ]);
}

// Wrench / Install/Support
export function WrenchIcon(props: IconProps = {}) {
  return wrap(props, [
    'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
  ]);
}

// Bolt / Energy
export function BoltIcon(props: IconProps = {}) {
  return wrap(props, [
    'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  ]);
}

// Lightbulb / Light
export function LightbulbIcon(props: IconProps = {}) {
  return wrap(props, [
    'M9 18h6',
    'M10 22h4',
    'M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z',
  ]);
}

// Thermometer / Heating
export function ThermometerIcon(props: IconProps = {}) {
  return wrap(props, [
    'M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z',
  ]);
}

// Lock
export function LockIcon(props: IconProps = {}) {
  return wrap(props, [
    'M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z',
    'M7 11V7a5 5 0 0 1 10 0v4',
  ]);
}

// Unlock / Open
export function UnlockIcon(props: IconProps = {}) {
  return wrap(props, [
    'M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z',
    'M8 11V7a4 4 0 0 1 8 0',
  ]);
}

// Link / Integration
export function LinkIcon(props: IconProps = {}) {
  return wrap(props, [
    'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71',
    'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
  ]);
}

// Map Pin / Local
export function MapPinIcon(props: IconProps = {}) {
  return wrap(props, [
    'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z',
    'M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  ]);
}

// Refresh / Update
export function RefreshIcon(props: IconProps = {}) {
  return wrap(props, [
    'M1 4v6h6',
    'M23 20v-6h-6',
    'M20.49 9A9 9 0 0 0 5.64 5.64L1 10',
    'M3.51 15A9 9 0 0 0 18.36 18.36L23 14',
  ]);
}

// Globe
export function GlobeIcon(props: IconProps = {}) {
  return wrap(props, [
    'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z',
    'M2 12h20',
    'M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z',
  ]);
}

// Smartphone / App
export function SmartphoneIcon(props: IconProps = {}) {
  return wrap(props, [
    'M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z',
    'M12 18h.01',
  ]);
}

// Users / Partnership
export function HandshakeIcon(props: IconProps = {}) {
  return wrap(props, [
    'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2',
    'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0-8z',
    'M23 21v-2a4 4 0 0 0-3-3.87',
    'M16 3.13a4 4 0 0 1 0 7.75',
  ]);
}

// Window / Shutter
export function WindowIcon(props: IconProps = {}) {
  return wrap(props, [
    'M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z',
    'M12 3v18',
    'M2 9h20',
  ]);
}

// Battery
export function BatteryIcon(props: IconProps = {}) {
  return wrap(props, [
    'M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z',
    'M10 0v2',
    'M14 0v2',
    'M7 13h10',
    'M7 9h10',
    'M7 17h6',
  ]);
}

// Car / EV
export function CarIcon(props: IconProps = {}) {
  return wrap(props, [
    'M5.5 17H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 .4-.8l3.2-2.4A2 2 0 0 1 5.8 9h8.4a2 2 0 0 1 1.2.4l3.2 2.4a1 1 0 0 1 .4.8v3a1 1 0 0 1-1 1h-3.5',
    'M5.5 17a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0z',
    'M13.5 17a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0z',
  ]);
}

// Factory / Grid
export function GridPowerIcon(props: IconProps = {}) {
  return wrap(props, [
    'M2 20h20',
    'M5 20V8l4-6h6l4 6v12',
    'M9 20v-6h6v6',
    'M9 10h6',
  ]);
}

// Check circle
export function CheckCircleIcon(props: IconProps = {}) {
  return wrap(props, [
    'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z',
    'M9 12l2 2 4-4',
  ]);
}

// Info / Tip
export function InfoIcon(props: IconProps = {}) {
  return wrap(props, [
    'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z',
    'M12 16v-4',
    'M12 8h.01',
  ]);
}

// Camera / Video
export function CameraIcon(props: IconProps = {}) {
  return wrap(props, [
    'M23 7l-7 5 7 5V7z',
    'M1 5h15a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H1V5z',
  ]);
}

// CPU / Chip / ESPHome
export function CpuIcon(props: IconProps = {}) {
  return wrap(props, [
    'M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
    'M9 9h6v6H9z',
    'M9 1v3', 'M15 1v3', 'M9 20v3', 'M15 20v3',
    'M20 9h3', 'M20 14h3', 'M1 9h3', 'M1 14h3',
  ]);
}

// Layout / Dashboard
export function LayoutIcon(props: IconProps = {}) {
  return wrap(props, [
    'M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z',
    'M2 9h20',
    'M9 21V9',
  ]);
}

// Droplet / Water sensor
export function DropletIcon(props: IconProps = {}) {
  return wrap(props, [
    'M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z',
  ]);
}

// Sprinkler / Garden irrigation
export function SprinklerIcon(props: IconProps = {}) {
  const { size = 24, className = '' } = { ...props };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22v-8" />
      <path d="M8 22h8" />
      <path d="M12 14c-4 0-7-2-7-5" />
      <path d="M12 14c4 0 7-2 7-5" />
      <path d="M5 9c-1.5-2 0-5 0-5" />
      <path d="M19 9c1.5-2 0-5 0-5" />
      <path d="M12 9V4" />
      <circle cx="12" cy="3" r="1" />
    </svg>
  );
}

// Mowing robot / Lawn mower
export function MowerIcon(props: IconProps = {}) {
  const { size = 24, className = '' } = { ...props };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="4" y="10" width="16" height="8" rx="3" />
      <circle cx="8" cy="18" r="2" />
      <circle cx="16" cy="18" r="2" />
      <path d="M10 10V7c0-1.1.9-2 2-2s2 .9 2 2v3" />
      <path d="M7 10l-2-4" />
      <path d="M17 10l2-4" />
    </svg>
  );
}

// Leaf / Garden & Outdoor
export function LeafIcon(props: IconProps = {}) {
  return wrap(props, [
    'M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.5 10-10 10Z',
    'M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12',
  ]);
}

// Brain / AI
export function BrainIcon(props: IconProps = {}) {
  return wrap(props, [
    'M12 2a6 6 0 0 0-6 6c0 1.66.68 3.16 1.76 4.24L12 16l4.24-3.76A6 6 0 0 0 12 2z',
    'M12 16v6',
    'M8 22h8',
    'M9 8h.01',
    'M15 8h.01',
    'M10 11h4',
  ]);
}

// Workflow / Process
export function WorkflowIcon(props: IconProps = {}) {
  return wrap(props, [
    'M3 6h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z',
    'M10 14h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1z',
    'M17 6h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z',
    'M5 10v2a2 2 0 0 0 2 2h2',
    'M19 10v2a2 2 0 0 1-2 2h-2',
  ]);
}

// Server / Infrastructure
export function ServerIcon(props: IconProps = {}) {
  return wrap(props, [
    'M2 4h20a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z',
    'M2 14h20a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z',
    'M6 7h.01',
    'M6 17h.01',
  ]);
}

// Compass / Consulting
export function CompassIcon(props: IconProps = {}) {
  return wrap(props, [
    'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z',
    'M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z',
  ]);
}

// MessageCircle / Chat
export function MessageCircleIcon(props: IconProps = {}) {
  return wrap(props, [
    'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z',
  ]);
}

// ChevronDown
export function ChevronDownIcon(props: IconProps = {}) {
  return wrap(props, ['M6 9l6 6 6-6']);
}
