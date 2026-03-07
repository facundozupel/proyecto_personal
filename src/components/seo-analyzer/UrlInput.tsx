import { useState } from 'react';

interface UrlInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export function UrlInput({ onSubmit, isLoading }: UrlInputProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-black/25"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Pega la URL de tu sitio web..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-black/[0.1] rounded-xl text-[#1a1a1a] placeholder-black/30 focus:border-[#BF551A] focus:ring-2 focus:ring-[#BF551A]/20 outline-none transition-all text-base"
            disabled={isLoading}
            autoFocus
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !url.trim()}
          className="px-8 py-4 bg-[#BF551A] text-white font-semibold rounded-xl hover:bg-[#A04716] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {isLoading ? 'Analizando...' : 'Analizar'}
        </button>
      </div>
      <p className="text-black/25 text-xs mt-3 text-center">
        Ejemplo: tusitio.com o https://tusitio.com/pagina-especifica
      </p>
    </form>
  );
}
