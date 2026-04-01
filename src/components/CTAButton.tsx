import Link from 'next/link';

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function CTAButton({ href, children, variant = 'primary', className = '', onMouseEnter, onMouseLeave }: CTAButtonProps) {
  const base = 'inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200';
  const variants = {
    primary: 'bg-accent-blue text-primary-dark hover:bg-accent-blue/90 shadow-lg shadow-accent-blue/20',
    secondary: 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20',
  };

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {children}
    </Link>
  );
}
