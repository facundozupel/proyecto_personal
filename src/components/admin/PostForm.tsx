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
      setError('El título es obligatorio');
      return;
    }

    if (!formData.description.trim()) {
      setError('La descripción es obligatoria');
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
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-2">
          Título *
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="Ej: Cómo optimizar tu SEO local en 2025"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-2">
          Descripción *
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="Descripción corta del post (aparece en listados y meta tags)"
          required
        />
        <p className="mt-1 text-sm text-neutral-500">
          {formData.description.length} / 160 caracteres (óptimo para SEO)
        </p>
      </div>

      {/* Author + Read Time (row) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-neutral-700 mb-2">
            Autor
          </label>
          <input
            type="text"
            id="author"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label htmlFor="readTime" className="block text-sm font-medium text-neutral-700 mb-2">
            Tiempo de lectura
          </label>
          <input
            type="text"
            id="readTime"
            value={formData.readTime}
            onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Ej: 5 minutos"
          />
        </div>
      </div>

      {/* Tags */}
      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-neutral-700 mb-2">
          Tags
        </label>
        <input
          type="text"
          id="tags"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="seo, marketing, local (separados por comas)"
        />
        <p className="mt-1 text-sm text-neutral-500">Separa los tags con comas</p>
      </div>

      {/* Content (Markdown Editor) */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">Contenido *</label>
        <MarkdownEditor
          value={formData.content}
          onChange={(content) => setFormData({ ...formData, content })}
        />
        <p className="mt-2 text-sm text-neutral-500">
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
          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
        />
        <label htmlFor="draft" className="ml-2 block text-sm text-neutral-700">
          Guardar como borrador (no se publicará)
        </label>
      </div>

      {/* Submit buttons */}
      <div className="flex gap-4 pt-4 border-t border-neutral-200">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Guardando...' : submitLabel}
        </button>
        <a
          href="/admin"
          className="px-6 py-3 border border-neutral-300 text-neutral-700 rounded-lg font-semibold hover:bg-neutral-50 transition-colors"
        >
          Cancelar
        </a>
      </div>
    </form>
  );
}
