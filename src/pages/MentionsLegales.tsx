import { Layout } from "@/components/layout/Layout";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { usePageTitle } from '@/hooks/usePageTitle';

const MentionsLegales = () => {
  usePageTitle('Mentions légales');
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <Breadcrumb items={[{ label: "Mentions légales" }]} />

        <div className="max-w-3xl">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8">
            Mentions légales
          </h1>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                Éditeur du site
              </h2>
              <p className="text-foreground mb-2">
                <strong>ÉTUVE</strong>
                <br />
                Site d'information en santé
                <br />
                par le Dr Audric Bugnard
              </p>
              <p className="text-foreground">Email : contact@etuve.fr</p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                Hébergement
              </h2>
              <p className="text-foreground">
                Ce site est hébergé par :<br />
                <strong>Lovable</strong>
                <br />
                [Adresse de l'hébergeur]
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                Responsable de la publication
              </h2>
              <p className="text-foreground">
                Dr Audric Bugnard
                <br />
                Inscrit au Conseil National de l'Ordre des Médecins
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                Propriété intellectuelle
              </h2>
              <p className="text-muted-foreground">
                L'ensemble du contenu de ce site (textes, images, illustrations,
                fiches PDF) est protégé par le droit d'auteur. Toute
                reproduction, même partielle, est interdite sans autorisation
                préalable écrite.
              </p>
              <p className="text-muted-foreground mt-2">
                Les fiches PDF téléchargeables sont destinées à un usage
                personnel et éducatif. Leur diffusion commerciale est
                strictement interdite.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                Caractère informatif
              </h2>
              <p className="text-muted-foreground">
                Ce site a un objectif purement informatif et éducatif,
                conformément aux règles déontologiques de la profession médicale
                concernant l'information du public.
              </p>
              <p className="text-muted-foreground mt-2">
                Les informations fournies ne constituent pas des conseils
                médicaux personnalisés et ne sauraient remplacer une
                consultation médicale. Aucune promesse de guérison n'est faite.
              </p>
              <p className="text-muted-foreground mt-2">
                En cas de symptômes ou de questions sur votre santé, consultez
                votre médecin traitant.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                Liens externes
              </h2>
              <p className="text-muted-foreground">
                Ce site peut contenir des liens vers des sites externes
                (Doctolib, etc.). Nous ne sommes pas responsables du contenu de
                ces sites.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                Cookies
              </h2>
              <p className="text-muted-foreground">
                Ce site utilise uniquement des cookies techniques essentiels à
                son fonctionnement (préférences d'affichage). Aucun cookie
                publicitaire ou de suivi n'est utilisé.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                Données collectées
              </h2>
              <p className="text-foreground mb-4">
                Étuve ne collecte aucune donnée personnelle identifiable.
                Aucun compte utilisateur n'est nécessaire pour utiliser le site.
              </p>
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                Questionnaires anonymes
              </h3>
              <p className="text-foreground mb-4">
                Les questionnaires de suivi (douleur, fonction, utilité du
                contenu) sont stockés localement sur votre appareil
                (localStorage). Ces données ne sont pas transmises à un serveur.
                Elles sont anonymes : aucun nom, prénom, adresse, ou identifiant
                n'est collecté. Vous pouvez les supprimer à tout moment en
                vidant les données de votre navigateur.
              </p>
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                Analytics
              </h3>
              <p className="text-foreground mb-4">
                Ce site utilise Plausible.io pour mesurer la fréquentation de
                manière anonyme. Plausible ne dépose aucun cookie, ne collecte
                aucune donnée personnelle, et est conforme au RGPD. Les serveurs
                sont hébergés dans l'Union Européenne. En savoir plus :{" "}
                <a
                  href="https://plausible.io/data-policy"
                  className="text-primary underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  plausible.io/data-policy
                </a>
              </p>
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                Intelligence artificielle
              </h3>
              <p className="text-foreground">
                Les voix des podcasts Étuve sont générées par intelligence
                artificielle (ElevenLabs). Les scripts sont intégralement
                rédigés et validés par le Dr Audric Bugnard, médecin. Aucune IA
                ne produit de contenu médical sans validation humaine préalable.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MentionsLegales;
