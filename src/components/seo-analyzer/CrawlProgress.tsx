import { useState, useEffect } from 'react';

interface CrawlProgressProps {
  stage: 'crawling' | 'analyzing';
}

const stages = [
  { key: 'crawling', label: 'Rastreando tu sitio...', icon: '1' },
  { key: 'extracting', label: 'Extrayendo datos SEO...', icon: '2' },
  { key: 'analyzing', label: 'Analizando con IA...', icon: '3' },
];

export function CrawlProgress({ stage }: CrawlProgressProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (stage === 'crawling') {
      setCurrentStep(0);
      const t1 = setTimeout(() => setCurrentStep(1), 3000);
      return () => clearTimeout(t1);
    } else if (stage === 'analyzing') {
      setCurrentStep(2);
    }
  }, [stage]);

  return (
    <div className="w-full max-w-md mx-auto py-12">
      <div className="space-y-6">
        {stages.map((s, i) => {
          const isActive = i === currentStep;
          const isDone = i < currentStep;
          return (
            <div key={s.key} className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                  isDone
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : isActive
                      ? 'bg-[#0070F3]/20 text-[#0070F3] border border-[#0070F3]/30 animate-pulse'
                      : 'bg-white/[0.04] text-white/20 border border-white/[0.06]'
                }`}
              >
                {isDone ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  s.icon
                )}
              </div>
              <span
                className={`text-sm transition-colors duration-300 ${
                  isDone
                    ? 'text-green-400/70'
                    : isActive
                      ? 'text-white'
                      : 'text-white/20'
                }`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-8">
        <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#0070F3] rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${((currentStep + 1) / stages.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
