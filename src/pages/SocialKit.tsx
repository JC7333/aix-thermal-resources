// ============================================
// PAGE SOCIAL KIT — EXPORT CONTENUS RÉSEAUX
// ============================================
// Page non indexée pour copier les contenus IG/FB
// ============================================

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Copy, Check, Instagram, Video, Layers, ExternalLink, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  posts30, 
  reels8, 
  carrousels12, 
  getAllSlugsWithContent,
  type SocialPost,
  type ReelScript,
  type Carousel
} from '@/content/social';

const SocialKit = () => {
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterSlug, setFilterSlug] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const allSlugs = getAllSlugsWithContent();
  const baseUrl = 'https://coolance.fr';
  const DISCLAIMER = '⚠️ Information éducative — ne remplace pas un avis médical. Urgence 15/112.';
  const MAX_HASHTAGS = 5;

  // Filtrage
  const filteredPosts = posts30.filter(p => {
    if (filterSlug !== 'all' && p.slug !== filterSlug) return false;
    if (filterType === 'anti-decouragement' && p.type !== 'anti-decouragement') return false;
    return true;
  });

  const filteredReels = reels8.filter(r => {
    if (filterSlug !== 'all' && r.slug !== filterSlug) return false;
    if (filterType === 'anti-decouragement' && r.type !== 'anti-decouragement') return false;
    return true;
  });

  const filteredCarousels = carrousels12.filter(c => {
    if (filterSlug !== 'all' && c.slug !== filterSlug) return false;
    if (filterType === 'anti-decouragement' && c.type !== 'anti-decouragement') return false;
    return true;
  });

  // Formatage du texte pour copie
  const formatPostForCopy = (post: SocialPost): string => {
    const hashtags = post.hashtags.slice(0, MAX_HASHTAGS).map(h => `#${h}`).join(' ');
    return `${post.title}

${post.bullets.map(b => `• ${b}`).join('\n')}

👉 Action du jour : ${post.actionDuJour}

${post.cta}

${DISCLAIMER}

${hashtags}`;
  };

  const formatReelForCopy = (reel: ReelScript): string => {
    const hashtags = reel.hashtags.slice(0, MAX_HASHTAGS).map(h => `#${h}`).join(' ');
    return `🎬 SCRIPT REEL (20 sec)

HOOK : "${reel.hook}"

POINTS :
${reel.points.map((p, i) => `${i + 1}. ${p}`).join('\n')}

CTA : ${reel.cta}

LIEN : ${baseUrl}/pathologies/${reel.slug}

${DISCLAIMER}

${hashtags}`;
  };

  const formatCarouselForCopy = (carousel: Carousel): string => {
    const hashtags = carousel.hashtags.slice(0, MAX_HASHTAGS).map(h => `#${h}`).join(' ');
    return `📱 CARROUSEL (${carousel.slides.length} slides)

${carousel.slides.map((s, i) => `SLIDE ${i + 1} : ${s.title}
${s.content}`).join('\n\n')}

LIEN : ${baseUrl}/pathologies/${carousel.slug}

${DISCLAIMER}

${hashtags}`;
  };

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      toast({ title: 'Copié !', description: 'Contenu copié dans le presse-papier.' });
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast({ title: 'Erreur', description: 'Impossible de copier.', variant: 'destructive' });
    }
  };

  const CopyButton = ({ id, text }: { id: string; text: string }) => (
    <Button
      variant="outline"
      size="sm"
      onClick={() => handleCopy(id, text)}
      className="gap-2"
    >
      {copiedId === id ? (
        <><Check className="w-4 h-4 text-primary" /> Copié</>
      ) : (
        <><Copy className="w-4 h-4" /> Copier</>
      )}
    </Button>
  );

  const TypeBadge = ({ type }: { type: 'normal' | 'anti-decouragement' }) => (
    type === 'anti-decouragement' ? (
      <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
        💪 Anti-découragement
      </Badge>
    ) : null
  );

  return (
    <>
      <Helmet>
        <title>Social Kit — Export contenus</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-muted/30 py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Social Kit</h1>
            <p className="text-muted-foreground">
              Contenus IG/FB prêts à copier • {posts30.length} posts • {reels8.length} reels • {carrousels12.length} carrousels
            </p>
          </div>

          {/* Filtres */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Filter className="w-5 h-5 text-primary" />
                Filtres
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="text-sm text-muted-foreground mb-1 block">Pathologie</label>
                <Select value={filterSlug} onValueChange={setFilterSlug}>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les pathologies</SelectItem>
                    {allSlugs.map(slug => (
                      <SelectItem key={slug} value={slug}>{slug}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="text-sm text-muted-foreground mb-1 block">Type</label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    <SelectItem value="anti-decouragement">Anti-découragement uniquement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="posts" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="posts" className="gap-2">
                <Instagram className="w-4 h-4" />
                Posts ({filteredPosts.length})
              </TabsTrigger>
              <TabsTrigger value="reels" className="gap-2">
                <Video className="w-4 h-4" />
                Reels ({filteredReels.length})
              </TabsTrigger>
              <TabsTrigger value="carrousels" className="gap-2">
                <Layers className="w-4 h-4" />
                Carrousels ({filteredCarousels.length})
              </TabsTrigger>
            </TabsList>

            {/* Posts */}
            <TabsContent value="posts" className="space-y-4">
              {filteredPosts.map(post => (
                <Card key={post.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{post.title}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{post.slug}</Badge>
                          <TypeBadge type={post.type} />
                        </div>
                      </div>
                      <CopyButton id={post.id} text={formatPostForCopy(post)} />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-1">
                      {post.bullets.map((b, i) => (
                        <li key={i} className="text-sm text-muted-foreground">• {b}</li>
                      ))}
                    </ul>
                    <p className="text-sm font-medium">👉 {post.actionDuJour}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <ExternalLink className="w-3 h-3" />
                      {baseUrl}/pathologies/{post.slug}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {post.hashtags.slice(0, MAX_HASHTAGS).map(h => (
                        <span key={h} className="text-xs text-primary">#{h}</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Reels */}
            <TabsContent value="reels" className="space-y-4">
              {filteredReels.map(reel => (
                <Card key={reel.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">🎬 {reel.hook}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{reel.slug}</Badge>
                          <TypeBadge type={reel.type} />
                        </div>
                      </div>
                      <CopyButton id={reel.id} text={formatReelForCopy(reel)} />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase">Points (20 sec)</p>
                      <ol className="space-y-1">
                        {reel.points.map((p, i) => (
                          <li key={i} className="text-sm text-muted-foreground">{i + 1}. {p}</li>
                        ))}
                      </ol>
                    </div>
                    <p className="text-sm font-medium">📲 {reel.cta}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <ExternalLink className="w-3 h-3" />
                      {baseUrl}/pathologies/{reel.slug}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {reel.hashtags.slice(0, MAX_HASHTAGS).map(h => (
                        <span key={h} className="text-xs text-primary">#{h}</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Carrousels */}
            <TabsContent value="carrousels" className="space-y-4">
              {filteredCarousels.map(carousel => (
                <Card key={carousel.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">📱 {carousel.slides[0].title}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{carousel.slug}</Badge>
                          <Badge variant="secondary">{carousel.slides.length} slides</Badge>
                          <TypeBadge type={carousel.type} />
                        </div>
                      </div>
                      <CopyButton id={carousel.id} text={formatCarouselForCopy(carousel)} />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid gap-2">
                      {carousel.slides.map((slide, i) => (
                        <div key={i} className="bg-muted/50 rounded-lg p-3">
                          <p className="text-xs font-semibold text-muted-foreground">Slide {i + 1}</p>
                          <p className="text-sm font-medium">{slide.title}</p>
                          <p className="text-xs text-muted-foreground">{slide.content}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <ExternalLink className="w-3 h-3" />
                      {baseUrl}/pathologies/{carousel.slug}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {carousel.hashtags.slice(0, MAX_HASHTAGS).map(h => (
                        <span key={h} className="text-xs text-primary">#{h}</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>

          {/* Footer */}
          <p className="text-center text-xs text-muted-foreground">
            Page non indexée • Accès interne uniquement
          </p>
        </div>
      </div>
    </>
  );
};

export default SocialKit;
