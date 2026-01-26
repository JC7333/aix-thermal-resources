import { Clock, RefreshCw } from 'lucide-react';
import { Exercise } from '@/data/pathologies';

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
}

export const ExerciseCard = ({ exercise, index }: ExerciseCardProps) => {
  return (
    <article className="card-medical">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center text-2xl shrink-0">
          {exercise.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className="font-serif text-lg font-bold text-foreground">
              {index + 1}. {exercise.title}
            </h4>
          </div>
          <p className="text-muted-foreground text-sm mb-3">
            {exercise.description}
          </p>
          
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary" />
              {exercise.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <RefreshCw className="w-4 h-4 text-secondary" />
              {exercise.frequency}
            </span>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <h5 className="font-medium text-sm text-foreground mb-2">Consignes :</h5>
            <ol className="space-y-1.5">
              {exercise.steps.map((step, stepIndex) => (
                <li key={stepIndex} className="text-sm text-muted-foreground flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {stepIndex + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </article>
  );
};
