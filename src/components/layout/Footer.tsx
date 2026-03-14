import { useNavigate } from 'react-router-dom';
import { Instagram, Facebook, Mail } from 'lucide-react';

const ScrollTopLink = ({
  to,
  children,
  className,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const navigate = useNavigate();
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'instant' });
    navigate(to);
  };
  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

const linkClass = 'text-white/70 hover:text-white transition-colors';

const columns = [
  {
    title: 'Programme',
    links: [
      { name: 'Le Programme', href: '/le-programme' },
      { name: 'Mon parcours', href: '/parcours' },
      { name: 'Téléchargements', href: '/telechargements' },
      { name: 'Blog', href: '/blog' },
      { name: 'Réponses rapides', href: '/reponses-rapides' },
      { name: 'Espace Parents', href: '/parents' },
    ],
  },
  {
    title: 'Pathologies',
    links: [
      { name: 'Arthrose du genou', href: '/pathologies/v2/gonarthrose' },
      { name: 'Lombalgie chronique', href: '/pathologies/v2/lombalgie-chronique' },
      { name: 'Hanche', href: '/pathologies/v2/coxarthrose' },
      { name: 'BPCO', href: '/pathologies/v2/bpco' },
      { name: 'Toutes les pathologies', href: '/pathologies' },
    ],
  },
  {
    title: 'Informations',
    links: [
      { name: 'Qui suis-je', href: '/qui-suis-je' },
      { name: 'Professionnels', href: '/professionnels' },
      { name: 'Sources & Méthodologie', href: '/sources-methodologie' },
      { name: 'Contact', href: '/contact' },
      { name: 'Mentions légales', href: '/mentions-legales' },
      { name: 'Confidentialité', href: '/confidentialite' },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="bg-trust-navy text-white/90 mt-auto print:hidden">
      <div className="max-w-6xl mx-auto px-6 py-14 lg:py-18">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <ScrollTopLink to="/" className="inline-block">
              <span className="font-serif text-2xl font-bold text-white">ÉTUVE</span>
            </ScrollTopLink>
            <p className="text-sm text-white/60 mt-3 leading-relaxed">
              Programme d'éducation thérapeutique pour patients en cure thermale.
            </p>
            <p className="text-sm text-white/50 mt-1">
              Dr Audric Bugnard — Médecin thermaliste
            </p>

            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://instagram.com/etuve.sante"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com/etuve.sante"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@etuve.fr"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-white mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <ScrollTopLink to={link.href} className={`text-sm ${linkClass}`}>
                      {link.name}
                    </ScrollTopLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} ÉTUVE — Aix-les-Bains. Information éducative — ne remplace pas un avis médical.
          </p>
          <p className="text-xs text-white/50">
            Urgence : 15 / 112
          </p>
        </div>
      </div>
    </footer>
  );
};
