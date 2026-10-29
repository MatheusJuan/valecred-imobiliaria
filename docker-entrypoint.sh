#!/bin/sh
set -e

# Aplica migrations pendentes antes de subir. Falhou = nao sobe (o deploy anterior continua no ar).
# Migration destrutiva exige backup do Postgres antes (ver CLAUDE.md).
if [ -n "$DATABASE_URL" ]; then
  prisma migrate deploy
else
  echo "DATABASE_URL nao definida: pulando migrations." >&2
fi

exec node server.js
