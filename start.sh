#!/bin/sh
set -eu

mkdir -p /app/data

if [ -z "${DATABASE_URL:-}" ]; then
  export DATABASE_URL="file:/app/data/blog010.db"
fi

npx prisma migrate deploy --schema prisma/schema.prisma
exec npm run start
