"""
Script de extracción de datos de Google Search Console para facundogrowth.com.

Usa cuenta de servicio para autenticación y expone funciones por combinación
de dimensiones para que un agente pueda consultar datos del sitio.

Uso CLI:
    python extract.py --dims date,page,query --start 2026-01-01 --end 2026-02-28
    python extract.py --dims page --start 2026-01-01 --end 2026-02-28 --filter page /blog contains
    python extract.py --dims date,page,query --start 2026-01-01 --end 2026-02-28 --output /tmp/gsc_data.csv
"""

import argparse
import sys
from datetime import datetime, timedelta

import gscwrapper
import pandas as pd

SERVICE_ACCOUNT_PATH = "/Users/facundozupel/python_codigos/APIs/GSC/cuenta_servicio_facundozupel29gmail.json"
PROPERTY = "sc-domain:facundogrowth.com"


def get_account():
    return gscwrapper.generate_auth(
        client_config=SERVICE_ACCOUNT_PATH,
        service_account_auth=True,
    )


def extract(
    dimensions: list[str],
    start: str,
    end: str,
    filtro: list[str] | None = None,
) -> pd.DataFrame:
    """
    Extrae datos de GSC con las dimensiones indicadas.

    Args:
        dimensions: Lista de dimensiones. Opciones: date, page, query.
        start: Fecha inicio YYYY-MM-DD.
        end: Fecha fin YYYY-MM-DD.
        filtro: Opcional. Lista de 3 strings [dimension, valor, operador].
                Operadores: equals, notEquals, contains, notContains,
                            includingRegex, excludingRegex.

    Returns:
        DataFrame con las columnas de dimensiones + clicks, impressions, ctr, position.
    """
    account = get_account()
    webproperty = account[PROPERTY]

    query = (
        webproperty.query
        .range(start=start, stop=end)
        .dimensions(dimensions)
    )

    if filtro:
        query = query.filter(filtro[0], filtro[1], filtro[2])

    report = query.get()
    df = report.show_data()

    if df.empty:
        return df

    df["ctr"] = (df["clicks"] / df["impressions"]).round(4)
    df = df.applymap(lambda x: round(x, 2) if isinstance(x, float) else x)
    return df


def extract_date_page_query(start: str, end: str, filtro=None) -> pd.DataFrame:
    """Dimensiones: date, page, query."""
    return extract(["date", "page", "query"], start, end, filtro)


def extract_date_page(start: str, end: str, filtro=None) -> pd.DataFrame:
    """Dimensiones: date, page."""
    return extract(["date", "page"], start, end, filtro)


def extract_date_query(start: str, end: str, filtro=None) -> pd.DataFrame:
    """Dimensiones: date, query."""
    return extract(["date", "query"], start, end, filtro)


def extract_page(start: str, end: str, filtro=None) -> pd.DataFrame:
    """Dimensión: page."""
    return extract(["page"], start, end, filtro)


def extract_query(start: str, end: str, filtro=None) -> pd.DataFrame:
    """Dimensión: query."""
    return extract(["query"], start, end, filtro)


DIMENSION_MAP = {
    "date,page,query": extract_date_page_query,
    "date,page": extract_date_page,
    "date,query": extract_date_query,
    "page": extract_page,
    "query": extract_query,
}


def default_dates() -> tuple[str, str]:
    """Últimos 28 días (GSC tiene ~3 días de delay)."""
    end = datetime.now() - timedelta(days=3)
    start = end - timedelta(days=28)
    return start.strftime("%Y-%m-%d"), end.strftime("%Y-%m-%d")


def main():
    parser = argparse.ArgumentParser(description="Extrae datos de GSC para facundogrowth.com")
    parser.add_argument(
        "--dims",
        required=True,
        help="Dimensiones separadas por coma: date,page,query | date,page | date,query | page | query",
    )
    parser.add_argument("--start", help="Fecha inicio YYYY-MM-DD (default: hace 28 días)")
    parser.add_argument("--end", help="Fecha fin YYYY-MM-DD (default: hace 3 días)")
    parser.add_argument(
        "--filter",
        nargs=3,
        metavar=("DIM", "VALUE", "OPERATOR"),
        help="Filtro: dimension valor operador. Ej: page /blog contains",
    )
    parser.add_argument("--output", help="Ruta para guardar CSV. Si no se pasa, imprime en stdout.")
    parser.add_argument("--limit", type=int, help="Limitar filas de salida.")

    args = parser.parse_args()

    dims_key = args.dims.strip().lower()
    if dims_key not in DIMENSION_MAP:
        print(f"Error: dimensiones '{dims_key}' no válidas.", file=sys.stderr)
        print(f"Opciones: {', '.join(DIMENSION_MAP.keys())}", file=sys.stderr)
        sys.exit(1)

    start = args.start
    end = args.end
    if not start or not end:
        d_start, d_end = default_dates()
        start = start or d_start
        end = end or d_end

    print(f"Extrayendo GSC | dims={dims_key} | {start} → {end}", file=sys.stderr)

    df = DIMENSION_MAP[dims_key](start, end, args.filter)

    if args.limit:
        df = df.head(args.limit)

    if args.output:
        df.to_csv(args.output, index=False)
        print(f"Guardado en {args.output} ({len(df)} filas)", file=sys.stderr)
    else:
        print(df.to_string(index=False))

    return df


if __name__ == "__main__":
    main()
