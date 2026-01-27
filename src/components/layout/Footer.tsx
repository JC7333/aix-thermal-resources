import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-trust-navy text-white/90 mt-auto">
      <div className="container mx-auto px-4 py-10 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <p className="font-serif text-2xl font-bold text-white">COOLANCE</p>
              <p className="text-sm text-white/70 mt-1">par le Dr Audric Bugnard</p>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Des plans simples, imprimables, pour reprendre la main sur votre santé au quotidien.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-6">
              <a 
                href="https://instagram.com/coolance.sante" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Suivre sur Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com/coolance.sante" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Suivre sur Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <Link 
                to="/contact"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Nous contacter"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/parcours" className="text-white/80 hover:text-white transition-colors">
                  Parcours guidé
                </Link>
              </li>
              <li>
                <Link to="/reponses-rapides" className="text-white/80 hover:text-white transition-colors">
                  Réponses rapides
                </Link>
              </li>
              <li>
                <Link to="/telechargements" className="text-white/80 hover:text-white transition-colors">
                  Téléchargements PDF
                </Link>
              </li>
              <li>
                <Link to="/pathologies" className="text-white/80 hover:text-white transition-colors">
                  Pathologies
                </Link>
              </li>
              <li>
                <Link to="/parents" className="text-white/80 hover:text-white transition-colors">
                  Espace Parents
                </Link>
              </li>
              <li>
                <Link to="/social" className="text-white/80 hover:text-white transition-colors">
                  Nous suivre
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Informations</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/qui-suis-je" className="text-white/80 hover:text-white transition-colors">
                  Qui suis-je ?
                </Link>
              </li>
              <li>
                <Link to="/sources-methodologie" className="text-white/80 hover:text-white transition-colors">
                  Sources & Méthodologie
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/mentions-legales" className="text-white/80 hover:text-white transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link to="/confidentialite" className="text-white/80 hover:text-white transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
            <p>© 2024 COOLANCE — par le Dr Audric Bugnard. Tous droits réservés.</p>
            <p className="text-center md:text-right">
              Informations générales — Ne remplace pas un avis médical
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
