import { Eye, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAccessibility } from '@/contexts/AccessibilityContext';

export const SeniorModeToggle = () => {
  const { seniorMode, toggleSeniorMode } = useAccessibility();

  return (
    <Button
      variant={seniorMode ? 'default' : 'outline'}
      size="lg"
      onClick={toggleSeniorMode}
      className={`gap-2 font-semibold ${seniorMode ? 'bg-primary text-primary-foreground' : ''}`}
      aria-label={seniorMode ? 'Désactiver le mode Senior' : 'Activer le mode Senior'}
    >
      {seniorMode ? <Eye className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
      {seniorMode ? 'Mode Senior activé' : 'Mode Senior'}
    </Button>
  );
};
