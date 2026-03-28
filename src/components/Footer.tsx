import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-primary-dark border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Logo />
            <p className="mt-4 text-sm text-text-muted max-w-xs">
              Herstellerunabhängige Smart-Home-Lösungen auf Basis von Home Assistant. Lokale Steuerung, sicher und zukunftsfähig.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Navigation</h4>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Startseite' },
                { href: '/leistungen', label: 'Leistungen' },
                { href: '/ueber-uns', label: 'Über uns' },
                { href: '/kontakt', label: 'Kontakt' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-muted hover:text-accent-blue transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Kontakt</h4>
            <div className="space-y-2 text-sm text-text-muted">
              <p>IlmTech – Smart Home Solutions</p>
              <p>Ilmenau, Thüringen</p>
              <Link href="/kontakt" className="inline-block mt-3 text-accent-blue hover:underline">
                Kontaktformular →
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} IlmTech. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-4 text-xs text-text-muted">
            <Link href="/impressum" className="hover:text-accent-blue transition-colors">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-accent-blue transition-colors">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
