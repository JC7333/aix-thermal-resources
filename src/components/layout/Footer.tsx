import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-trust-navy text-white/90 mt-auto">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white font-serif text-lg font-bold">
                AB
              </div>
              <div>
                <p className="font-serif text-lg font-bold">Dr Audric Bugnard</p>
                <p className="text-sm text-white/70">Médecin Thermaliste</p>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Accompagnement personnalisé pour les pathologies chroniques. 
              Ressources pédagogiques pour mieux vivre avec votre pathologie au quotidien.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-white/80">
                  15 rue du Lac<br />
                  73100 Aix-les-Bains
                </span>
              </li>
              <li>
                <a href="tel:+33479000000" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                  <Phone className="w-5 h-5 text-secondary shrink-0" />
                  04 79 00 00 00
                </a>
              </li>
              <li>
                <a href="mailto:contact@dr-bugnard.fr" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                  <Mail className="w-5 h-5 text-secondary shrink-0" />
                  contact@dr-bugnard.fr
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Horaires</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-secondary shrink-0" />
                <span>Lun-Ven : 9h-12h / 14h-18h</span>
              </li>
              <li className="pl-8">Samedi : 9h-12h</li>
              <li className="pl-8 text-white/60">Fermé le dimanche</li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Liens utiles</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/parcours" className="text-white/80 hover:text-white transition-colors">
                  Parcours guidé
                </Link>
              </li>
              <li>
                <Link to="/ressources" className="text-white/80 hover:text-white transition-colors">
                  Bibliothèque de ressources
                </Link>
              </li>
              <li>
                <Link to="/pathologies" className="text-white/80 hover:text-white transition-colors">
                  Toutes les pathologies
                </Link>
              </li>
              <li>
                <Link to="/programmes" className="text-white/80 hover:text-white transition-colors">
                  Programmes d'exercices
                </Link>
              </li>
              <li>
                <Link to="/parents" className="text-white/80 hover:text-white transition-colors">
                  Espace Parents
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-white/80 hover:text-white transition-colors">
                  Questions fréquentes
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
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
            <p>© 2024 Dr Audric Bugnard - Médecin Thermaliste Aix-les-Bains. Tous droits réservés.</p>
            <p className="text-center md:text-right">
              Site à caractère informatif — Ne remplace pas une consultation médicale
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
