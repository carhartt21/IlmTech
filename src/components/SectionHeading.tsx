interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionHeading({ title, subtitle, center = true }: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      <h2 className="text-3xl sm:text-4xl font-bold text-white">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-text-muted max-w-2xl mx-auto text-lg">{subtitle}</p>
      )}
    </div>
  );
}
