interface PageHeroProps {
  title: string;
  subtitle?: string;
  image: string;
  compact?: boolean;
}

export const PageHero = ({ title, subtitle, image, compact = false }: PageHeroProps) => {
  return (
    <section
      className={`relative bg-cover bg-center flex items-end ${compact ? 'min-h-[28vh] lg:min-h-[32vh]' : 'min-h-[38vh] lg:min-h-[45vh]'}`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-8 lg:pb-12 w-full">
        <h1
          className={`font-serif font-bold text-white leading-tight ${compact ? 'text-3xl lg:text-4xl' : 'text-3xl md:text-4xl lg:text-5xl'}`}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/80 text-lg lg:text-xl mt-2 max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};
