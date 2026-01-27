import { useAccessibility } from '@/contexts/AccessibilityContext';

/**
 * Hook pour obtenir les classes CSS adaptatives en fonction du Mode Senior
 * Centralise la logique de styling accessible pour une expérience cohérente
 */
export const useSeniorMode = () => {
  const { seniorMode } = useAccessibility();

  return {
    seniorMode,
    
    // Titres
    titleClass: seniorMode 
      ? 'font-serif text-4xl lg:text-5xl font-bold text-foreground mb-6' 
      : 'font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4',
    
    // Sous-titres
    subtitleClass: seniorMode
      ? 'text-2xl lg:text-3xl font-serif font-bold'
      : 'text-xl md:text-2xl font-serif font-bold',
    
    // Texte principal
    textClass: seniorMode 
      ? 'text-xl text-muted-foreground leading-relaxed' 
      : 'text-lg text-muted-foreground',
    
    // Texte secondaire
    smallTextClass: seniorMode
      ? 'text-lg text-muted-foreground'
      : 'text-sm text-muted-foreground',
    
    // Boutons
    buttonSize: (seniorMode ? 'lg' : 'default') as 'lg' | 'default' | 'sm',
    
    // Padding des cartes
    cardPadding: seniorMode ? 'p-6 lg:p-8' : 'p-4 lg:p-6',
    
    // Grille responsive
    gridCols: seniorMode 
      ? 'grid md:grid-cols-1 lg:grid-cols-2 gap-8' 
      : 'grid md:grid-cols-2 lg:grid-cols-3 gap-6',
    
    // Grille 2 colonnes
    gridCols2: seniorMode
      ? 'grid md:grid-cols-1 lg:grid-cols-2 gap-6'
      : 'grid md:grid-cols-2 gap-4 lg:gap-6',
    
    // Icônes
    iconSize: seniorMode ? 'w-6 h-6' : 'w-5 h-5',
    iconSizeLg: seniorMode ? 'w-8 h-8' : 'w-6 h-6',
    
    // Espacements
    sectionSpacing: seniorMode ? 'mb-12 lg:mb-16' : 'mb-8 lg:mb-12',
    
    // Badge
    badgeClass: seniorMode ? 'text-sm px-3 py-1.5' : 'text-xs px-2 py-1',
    
    // Input
    inputClass: seniorMode 
      ? 'h-14 text-xl rounded-xl' 
      : 'h-11 text-base rounded-lg',
    
    // Cards avec bordure renforcée en mode Senior
    cardClass: seniorMode 
      ? 'card-medical border-2' 
      : 'card-medical',
  };
};

export default useSeniorMode;
