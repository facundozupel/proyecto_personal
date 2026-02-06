import { useState } from 'react';
import { MarkdownEditor } from './MarkdownEditor';

interface PostData {
  title: string;
  description: string;
  content: string;
  author: string;
  readTime: string;
  tags: string;
  draft: boolean;
}

interface Props {
  initialData?: Partial<PostData>;
  onSubmit?: (data: PostData) => Promise<void>;
  submitLabel?: string;
}

export function PostForm({ initialData, onSubmit, submitLabel = 'Crear Post' }: Props) {
  const [formData, setFormData] = useState<PostData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    content: initialData?.content || '',
    author: initialData?.author || 'Facundo Zupel',
    readTime: initialData?.readTime || '',
    tags: initialData?.tags || '',
    draft: initialData?.draft ?? false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (!formData.title.trim()) {
      setError('El titulo es obligatorio');
      return;
    }

    if (!formData.description.trim()) {
      setError('La descripcion es obligatoria');
      return;
    }

    if (!formData.content.trim()) {
      setError('El contenido es obligatorio');
      return;
    }

    setIsSubmitting(true);

    try {
      // Use provided onSubmit or fallback to global handler
      const submitHandler = onSubmit || (window as any).handlePostSubmit;

      if (!submitHandler) {
        throw new Error('No submit handler configured');
      }

      await submitHandler(formData);
    } catch (err: any) {
      setError(err.message || 'Error al guardar el post');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-white/70 mb-2">
          Titulo *
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 bg-white/[0.04] border border-white/[0.1] rounded-lg text-white placeholder-white/30 focus:ring-2 focus:ring-[#0070F3]/20 focus:border-[#0070F3] outline-none transition-all"
          placeholder="Ej: Como optimizar tu SEO local en 2025"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-white/70 mb-2">
          Descripcion *
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="w-full px-4 py-2 bg-white/[0.04] border border-white/[0.1] rounded-lg text-white placeholder-white/30 focus:ring-2 focus:ring-[#0070F3]/20 focus:border-[#0070F3] outline-none transition-all"
          placeholder="Descripcion corta del post (aparece en listados y meta tags)"
          required
        />
        <p className="mt-1 text-sm text-white/30">
          {formData.description.length} / 160 caracteres (optimo para SEO)
        </p>
      </div>

      {/* Author + Read Time (row) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-white/70 mb-2">
            Autor
          </label>
          <input
            type="text"
            id="author"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="w-full px-4 py-2 bg-white/[0.04] border border-white/[0.1] rounded-lg text-white placeholder-white/30 focus:ring-2 focus:ring-[#0070F3]/20 focus:border-[#0070F3] outline-none transition-all"
          />
        </div>

        <div>
          <label htmlFor="readTime" className="block text-sm font-medium text-white/70 mb-2">
            Tiempo de lectura
          </label>
          <input
            type="text"
            id="readTime"
            value={formData.readTime}
            onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
            className="w-full px-4 py-2 bg-white/[0.04] border border-white/[0.1] rounded-lg text-white placeholder-white/30 focus:ring-2 focus:ring-[#0070F3]/20 focus:border-[#0070F3] outline-none transition-all"
            placeholder="Ej: 5 minutos"
          />
        </div>
      </div>

      {/* Tags */}
      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-white/70 mb-2">
          Tags
        </label>
        <input
          type="text"
          id="tags"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          className="w-full px-4 py-2 bg-white/[0.04] border border-white/[0.1] rounded-lg text-white placeholder-white/30 focus:ring-2 focus:ring-[#0070F3]/20 focus:border-[#0070F3] outline-none transition-all"
          placeholder="seo, marketing, local (separados por comas)"
        />
        <p className="mt-1 text-sm text-white/30">Separa los tags con comas</p>
      </div>

      {/* Content (Markdown Editor) */}
      <div>
        <label className="block text-sm font-medium text-white/70 mb-2">Contenido *</label>
        <MarkdownEditor
          value={formData.content}
          onChange={(content) => setFormData({ ...formData, content })}
        />
        <p className="mt-2 text-sm text-white/30">
          Usa Markdown para formato. Presiona los botones de la toolbar para insertar elementos.
        </p>
      </div>

      {/* Draft checkbox */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="draft"
          checked={formData.draft}
          onChange={(e) => setFormData({ ...formData, draft: e.target.checked })}
          className="h-4 w-4 text-[#0070F3] focus:ring-[#0070F3] border-white/[0.1] rounded bg-white/[0.04]"
        />
        <label htmlFor="draft" className="ml-2 block text-sm text-white/70">
          Guardar como borrador (no se publicara)
        </label>
      </div>

      {/* Submit buttons */}
      <div className="flex gap-4 pt-4 border-t border-white/[0.08]">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-[#0070F3] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#005AC8] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Guardando...' : submitLabel}
        </button>
        <a
          href="/admin"
          className="px-6 py-3 border border-white/[0.2] text-white/70 rounded-lg font-semibold hover:bg-white/[0.05] hover:border-white/[0.3] transition-all duration-200"
        >
          Cancelar
        </a>
      </div>
    </form>
  );
}
