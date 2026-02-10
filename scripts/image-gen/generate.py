#!/usr/bin/env python3
"""
Generador de imagenes con Google Gemini (Nano Banana).
Genera y edita imagenes desde CLI para el sitio facundogrowth.com.

Uso basico:
    python generate.py --prompt "descripcion de la imagen"
    python generate.py --prompt "editar fondo" --edit ruta/imagen.webp
"""

import argparse
import os
import re
import sys
import time
from io import BytesIO
from pathlib import Path

from dotenv import load_dotenv
from google import genai
from google.genai import types
from PIL import Image

# --- Constantes ---

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
DEFAULT_OUTPUT_DIR = PROJECT_ROOT / "public" / "assets"

MODELS = {
    "flash": "gemini-2.5-flash-image",
    "pro": "gemini-3-pro-image-preview",
}

VALID_RATIOS = ["1:1", "16:9", "9:16", "3:2", "2:3", "4:3", "3:4"]

FORMAT_MIME = {
    "webp": "WEBP",
    "png": "PNG",
    "jpg": "JPEG",
}


# --- Utilidades ---


def slugify(text: str, max_len: int = 50) -> str:
    """Convierte texto a slug para nombre de archivo."""
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_]+", "-", text)
    text = re.sub(r"-+", "-", text).strip("-")
    return text[:max_len]


def log(msg: str, quiet: bool = False) -> None:
    """Imprime un mensaje con prefijo visual. No imprime si quiet=True."""
    if not quiet:
        print(f"  {msg}")


def log_step(step: str, quiet: bool = False) -> None:
    """Imprime un encabezado de paso."""
    if not quiet:
        print(f"\n--- {step}")


def log_kv(key: str, value: str, quiet: bool = False) -> None:
    """Imprime un par clave-valor alineado."""
    if not quiet:
        print(f"  {key:<18} {value}")


def load_api_key(quiet: bool = False) -> str:
    """Carga GEMINI_API_KEY desde .env. Sale con error claro si falta."""
    env_path = PROJECT_ROOT / ".env"
    load_dotenv(env_path)

    api_key = os.environ.get("GEMINI_API_KEY", "").strip()
    if not api_key:
        print(
            "\n=== ERROR: GEMINI_API_KEY no encontrada ===\n"
            "\n"
            "Para obtener tu API key:\n"
            "  1. Ve a https://aistudio.google.com/apikey\n"
            "  2. Crea o copia tu API key\n"
            "  3. Agregala al archivo .env en la raiz del proyecto:\n"
            f"     {env_path}\n"
            "\n"
            "     GEMINI_API_KEY=tu_api_key_aqui\n",
            file=sys.stderr,
        )
        sys.exit(1)

    log(f"API key cargada desde {env_path}", quiet)
    return api_key


# --- Generacion ---


def generate_image(
    client: genai.Client,
    prompt: str,
    model: str,
    aspect_ratio: str,
    image_size: str | None = None,
) -> types.GenerateContentResponse:
    """Genera una imagen nueva con Gemini."""
    config_kwargs = {
        "response_modalities": ["TEXT", "IMAGE"],
    }

    # Construir ImageConfig
    image_config_kwargs = {}
    if aspect_ratio:
        image_config_kwargs["aspect_ratio"] = aspect_ratio
    if image_size and "pro" in model:
        image_config_kwargs["image_size"] = image_size

    if image_config_kwargs:
        config_kwargs["image_config"] = types.ImageConfig(**image_config_kwargs)

    config = types.GenerateContentConfig(**config_kwargs)

    response = client.models.generate_content(
        model=model,
        contents=prompt,
        config=config,
    )

    return response


def edit_image(
    client: genai.Client,
    prompt: str,
    image_path: str,
    model: str,
    aspect_ratio: str,
    image_size: str | None = None,
) -> types.GenerateContentResponse:
    """Edita una imagen existente con Gemini."""
    # Abrir la imagen con PIL
    img_path = Path(image_path)
    if not img_path.is_absolute():
        img_path = PROJECT_ROOT / img_path

    if not img_path.exists():
        print(f"ERROR: Imagen no encontrada: {img_path}", file=sys.stderr)
        sys.exit(2)

    img = Image.open(img_path)

    config_kwargs = {
        "response_modalities": ["TEXT", "IMAGE"],
    }

    image_config_kwargs = {}
    if aspect_ratio:
        image_config_kwargs["aspect_ratio"] = aspect_ratio
    if image_size and "pro" in model:
        image_config_kwargs["image_size"] = image_size

    if image_config_kwargs:
        config_kwargs["image_config"] = types.ImageConfig(**image_config_kwargs)

    config = types.GenerateContentConfig(**config_kwargs)

    response = client.models.generate_content(
        model=model,
        contents=[prompt, img],
        config=config,
    )

    return response


def save_image(
    response: types.GenerateContentResponse,
    output_path: Path,
    fmt: str,
    quiet: bool,
) -> None:
    """Guarda la imagen generada en disco."""
    log_step("Procesando respuesta de Gemini", quiet)

    # Buscar la parte de imagen en la respuesta
    image_part = None
    text_parts = []

    if response.candidates:
        for part in response.candidates[0].content.parts:
            if part.inline_data and part.inline_data.mime_type.startswith("image/"):
                image_part = part
            elif part.text:
                text_parts.append(part.text)

    if image_part is None:
        print("\n=== ERROR: No se genero imagen ===", file=sys.stderr)
        print("  Causa probable: filtros de seguridad del modelo", file=sys.stderr)
        if text_parts:
            print(f"  Respuesta del modelo: {' '.join(text_parts)}", file=sys.stderr)
        else:
            print("  El modelo no devolvio texto ni imagen.", file=sys.stderr)
        sys.exit(3)

    log(f"Imagen recibida ({image_part.inline_data.mime_type})", quiet)

    # Crear directorios si no existen
    created_dir = not output_path.parent.exists()
    output_path.parent.mkdir(parents=True, exist_ok=True)
    if created_dir:
        log(f"Directorio creado: {output_path.parent}", quiet)

    # Guardar imagen
    log_step("Guardando imagen", quiet)
    img = Image.open(BytesIO(image_part.inline_data.data))
    pil_format = FORMAT_MIME.get(fmt, "WEBP")
    save_kwargs = {}
    if pil_format == "WEBP":
        save_kwargs["quality"] = 85
    elif pil_format == "JPEG":
        save_kwargs["quality"] = 90

    img.save(output_path, format=pil_format, **save_kwargs)
    file_size_kb = output_path.stat().st_size / 1024

    # Calcular ruta relativa para Astro
    try:
        rel_path = output_path.relative_to(PROJECT_ROOT / "public")
        astro_path = f"/{rel_path}"
    except ValueError:
        astro_path = None

    if quiet:
        # Modo quiet: solo la ruta absoluta
        print(output_path)
    else:
        log_kv("Archivo", str(output_path))
        log_kv("Formato", f"{fmt.upper()} ({pil_format})")
        log_kv("Dimensiones", f"{img.size[0]}x{img.size[1]} px")
        log_kv("Peso", f"{file_size_kb:.1f} KB")
        if astro_path:
            log_kv("Ruta Astro", astro_path)
            log_kv("Markdown", f"![alt]({astro_path})")
        if text_parts:
            log_kv("Modelo dijo", " ".join(text_parts))


# --- Main ---


def main():
    parser = argparse.ArgumentParser(
        description="Genera imagenes con Google Gemini para facundogrowth.com",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=(
            "Ejemplos:\n"
            '  %(prog)s -p "Hero banner azul degradado profesional"\n'
            '  %(prog)s -p "Infografia SEO" -o public/assets/blog/seo/hero.webp\n'
            '  %(prog)s -p "Cambiar fondo a blanco" -e public/assets/img.webp\n'
            '  %(prog)s -p "Logo minimalista" -m pro --image-size 4K -a 1:1\n'
        ),
    )

    parser.add_argument(
        "--prompt", "-p", required=True, help="Prompt de generacion/edicion"
    )
    parser.add_argument(
        "--model",
        "-m",
        default="flash",
        choices=["flash", "pro"],
        help="Modelo: flash (rapido) o pro (alta calidad). Default: flash",
    )
    parser.add_argument(
        "--output", "-o", default=None, help="Ruta completa del archivo de salida"
    )
    parser.add_argument(
        "--output-dir",
        "-d",
        default=None,
        help=f"Directorio de salida. Default: {DEFAULT_OUTPUT_DIR}",
    )
    parser.add_argument(
        "--filename",
        "-f",
        default=None,
        help="Nombre del archivo sin extension. Default: slug del prompt",
    )
    parser.add_argument(
        "--aspect-ratio",
        "-a",
        default="16:9",
        help=f"Aspect ratio. Opciones: {', '.join(VALID_RATIOS)}. Default: 16:9",
    )
    parser.add_argument(
        "--image-size",
        "-s",
        default=None,
        choices=["1K", "2K", "4K"],
        help="Tamano de imagen (solo modelo pro): 1K, 2K, 4K",
    )
    parser.add_argument(
        "--edit",
        "-e",
        default=None,
        help="Ruta a imagen existente para editar",
    )
    parser.add_argument(
        "--format",
        default="webp",
        choices=["webp", "png", "jpg"],
        help="Formato de salida. Default: webp",
    )
    parser.add_argument(
        "--quiet",
        "-q",
        action="store_true",
        help="Solo imprime la ruta del archivo generado",
    )

    args = parser.parse_args()
    q = args.quiet

    # --- Banner ---
    if not q:
        mode_label = "EDICION" if args.edit else "GENERACION"
        print(f"\n{'=' * 50}")
        print(f"  IMAGE GEN - {mode_label}")
        print(f"{'=' * 50}")

    # --- Validaciones ---
    if args.aspect_ratio not in VALID_RATIOS:
        parser.error(
            f"Aspect ratio invalido: {args.aspect_ratio}. "
            f"Opciones: {', '.join(VALID_RATIOS)}"
        )

    if args.image_size and args.model != "pro":
        print(
            f"\n  WARNING: --image-size solo funciona con modelo pro. "
            f"Ignorando '{args.image_size}'.",
            file=sys.stderr,
        )
        args.image_size = None

    # --- Determinar ruta de salida ---
    if args.output:
        output_path = Path(args.output)
        if not output_path.is_absolute():
            output_path = PROJECT_ROOT / output_path
    else:
        output_dir = Path(args.output_dir) if args.output_dir else DEFAULT_OUTPUT_DIR
        if not output_dir.is_absolute():
            output_dir = PROJECT_ROOT / output_dir

        filename = args.filename if args.filename else slugify(args.prompt)
        output_path = output_dir / f"{filename}.{args.format}"

    # --- Config summary ---
    model_id = MODELS[args.model]

    log_step("Configuracion", q)
    log_kv("Prompt", args.prompt, q)
    log_kv("Modelo", f"{args.model} ({model_id})", q)
    log_kv("Aspect ratio", args.aspect_ratio, q)
    log_kv("Formato", args.format.upper(), q)
    if args.image_size:
        log_kv("Image size", args.image_size, q)
    if args.edit:
        log_kv("Imagen fuente", args.edit, q)
    log_kv("Destino", str(output_path), q)

    # --- API key ---
    log_step("Autenticacion", q)
    api_key = load_api_key(q)
    client = genai.Client(api_key=api_key)

    # --- Llamada a la API ---
    log_step("Llamando a Gemini API", q)
    log(f"Enviando request a {model_id}...", q)
    t0 = time.time()

    try:
        if args.edit:
            response = edit_image(
                client=client,
                prompt=args.prompt,
                image_path=args.edit,
                model=model_id,
                aspect_ratio=args.aspect_ratio,
                image_size=args.image_size,
            )
        else:
            response = generate_image(
                client=client,
                prompt=args.prompt,
                model=model_id,
                aspect_ratio=args.aspect_ratio,
                image_size=args.image_size,
            )
    except Exception as e:
        elapsed = time.time() - t0
        print(
            f"\n=== ERROR de API (tras {elapsed:.1f}s) ===\n  {e}",
            file=sys.stderr,
        )
        sys.exit(2)

    elapsed = time.time() - t0
    log(f"Respuesta recibida en {elapsed:.1f}s", q)

    # --- Guardar ---
    save_image(response, output_path, args.format, q)

    # --- Resumen final ---
    if not q:
        print(f"\n{'=' * 50}")
        print(f"  LISTO - Imagen generada exitosamente")
        print(f"  Tiempo total API: {elapsed:.1f}s")
        print(f"{'=' * 50}\n")


if __name__ == "__main__":
    main()
