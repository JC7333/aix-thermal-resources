import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/shared/Breadcrumb';

const Confidentialite = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <Breadcrumb items={[{ label: 'Politique de confidentialité' }]} />

        <div className="max-w-3xl">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8">
            Politique de confidentialité
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground mb-8">
              Dernière mise à jour : Janvier 2024
            </p>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                Responsable du traitement
              </h2>
              <p className="text-muted-foreground">
                Le responsable du traitement des données est le Dr Martin, 
                15 rue du Lac, 73100 Aix-les-Bains.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                Données collectées
              </h2>
              <p className="text-muted-foreground mb-4">
                Ce site ne collecte <strong>aucune donnée de santé</strong>. 
                Les seules données collectées sont :
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Via le formulaire de contact : nom, email, objet et message</li>
                <li>Préférences d'affichage (mode lecture facile) stockées localement sur votre navigateur</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                Finalités du traitement
              </h2>
              <p className="text-muted-foreground">
                Les données du formulaire de contact sont utilisées uniquement pour répondre 
                à votre demande. Elles ne sont jamais utilisées à des fins commerciales 
                ou transmises à des tiers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                Durée de conservation
              </h2>
              <p className="text-muted-foreground">
                Les données du formulaire de contact sont conservées pendant 12 mois 
                maximum après le traitement de votre demande, puis supprimées.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                Vos droits
              </h2>
              <p className="text-muted-foreground mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Droit d'accès à vos données</li>
                <li>Droit de rectification</li>
                <li>Droit à l'effacement</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit à la portabilité</li>
                <li>Droit d'opposition</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Pour exercer ces droits, contactez-nous à : contact@dr-martin-thermaliste.fr
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                Cookies
              </h2>
              <p className="text-muted-foreground">
                Ce site utilise uniquement des cookies techniques essentiels :
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
                <li>
                  <strong>easyReading</strong> : stocke votre préférence d'affichage 
                  (mode lecture facile activé ou non). Données stockées localement 
                  sur votre navigateur, sans transmission à un serveur.
                </li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Aucun cookie publicitaire, de tracking ou de profilage n'est utilisé.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                Sécurité
              </h2>
              <p className="text-muted-foreground">
                Nous mettons en œuvre des mesures de sécurité appropriées pour protéger 
                vos données contre tout accès non autorisé. Le site utilise une connexion 
                sécurisée (HTTPS).
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                Contact & Réclamations
              </h2>
              <p className="text-muted-foreground mb-4">
                Pour toute question relative à cette politique ou à vos données personnelles :
              </p>
              <p className="text-foreground mb-4">
                Email : contact@dr-martin-thermaliste.fr<br />
                Téléphone : 04 79 00 00 00
              </p>
              <p className="text-muted-foreground">
                Vous pouvez également introduire une réclamation auprès de la CNIL 
                (Commission Nationale de l'Informatique et des Libertés) : 
                <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                  www.cnil.fr
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Confidentialite;
