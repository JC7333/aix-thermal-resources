import { useState } from 'react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const ParcoursQuiz = ({ questions }: { questions: QuizQuestion[] }) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Quiz rapide</h2>
      {questions.map((q, qi) => (
        <div key={qi} className="p-4 rounded-xl border bg-muted/10 space-y-3">
          <p className="text-base font-semibold">{q.question}</p>
          <div className="grid gap-2">
            {q.options.map((opt, oi) => (
              <button
                key={oi}
                onClick={() => {
                  setAnswers((prev) => ({ ...prev, [qi]: oi }));
                  setRevealed((prev) => ({ ...prev, [qi]: true }));
                }}
                disabled={revealed[qi]}
                className={`w-full text-left p-4 rounded-xl border-2 text-base transition-all
                  ${revealed[qi]
                    ? oi === q.correctIndex
                      ? 'border-green-400 bg-green-50 text-green-800'
                      : answers[qi] === oi
                        ? 'border-red-300 bg-red-50 text-red-800'
                        : 'border-muted bg-muted/20 text-muted-foreground'
                    : 'border-muted hover:border-primary/30'
                  }`}
              >
                {opt}
              </button>
            ))}
          </div>
          {revealed[qi] && (
            <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">{q.explanation}</p>
          )}
        </div>
      ))}
    </section>
  );
};
