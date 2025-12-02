#!/bin/bash
#
# Script para crear un post de blog usando curl
#
# Uso:
#   ./scripts/create-post-curl.sh "Título del Post" "Descripción" "tag1,tag2,tag3"
#

TITLE="$1"
DESCRIPTION="$2"
TAGS="$3"
PASSWORD="${ADMIN_PASSWORD:-dev_password_123}"

if [ -z "$TITLE" ] || [ -z "$DESCRIPTION" ]; then
  echo "Uso: $0 \"Título\" \"Descripción\" \"tag1,tag2,tag3\""
  exit 1
fi

# Convertir tags a array JSON
IFS=',' read -ra TAG_ARRAY <<< "$TAGS"
TAG_JSON=$(printf '"%s",' "${TAG_ARRAY[@]}" | sed 's/,$//')
TAG_JSON="[$TAG_JSON]"

# Leer contenido desde stdin
echo "Pega el contenido del post en Markdown (Ctrl+D cuando termines):"
CONTENT=$(cat)

# Escapar contenido para JSON
CONTENT_ESCAPED=$(echo "$CONTENT" | jq -Rs .)

# Crear JSON payload
PAYLOAD=$(cat <<EOF
{
  "title": "$TITLE",
  "description": "$DESCRIPTION",
  "content": $CONTENT_ESCAPED,
  "tags": $TAG_JSON,
  "readTime": "5 minutos"
}
EOF
)

# Enviar request
echo ""
echo "Creando post..."
curl -s -u "admin:$PASSWORD" \
  -X POST http://localhost:4321/api/admin/posts \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD" | python3 -m json.tool

echo ""
echo "Post creado!"
