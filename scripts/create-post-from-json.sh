#!/bin/bash
#
# Script para crear un post de blog desde un archivo JSON
#
# Uso:
#   ./scripts/create-post-from-json.sh archivo.json
#
# Ejemplo de archivo JSON: scripts/ejemplo-post.json
#

JSON_FILE="$1"
PASSWORD="${ADMIN_PASSWORD:-dev_password_123}"

if [ -z "$JSON_FILE" ]; then
  echo "Uso: $0 archivo.json"
  echo ""
  echo "Ejemplo: ./scripts/create-post-from-json.sh scripts/ejemplo-post.json"
  exit 1
fi

if [ ! -f "$JSON_FILE" ]; then
  echo "Error: El archivo '$JSON_FILE' no existe"
  exit 1
fi

echo "Creando post desde: $JSON_FILE"
echo ""

curl -s -u "admin:$PASSWORD" \
  -X POST http://localhost:4321/api/admin/posts \
  -H "Content-Type: application/json" \
  -d @"$JSON_FILE" | python3 -m json.tool

echo ""
echo "✅ Proceso completado"
