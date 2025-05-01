#!/bin/sh

HOST="$1"
PORT="$2"
shift 2

echo "Waiting for PostgreSQL at $HOST:$PORT..."

# Prefer pg_isready if available
if command -v pg_isready >/dev/null 2>&1; then
  until pg_isready -h "$HOST" -p "$PORT"; do
    sleep 1
  done
else
  # Fallback to netcat (nc)
  if command -v nc >/dev/null 2>&1; then
    until nc -z "$HOST" "$PORT"; do
      sleep 1
    done
  else
    echo "Error: Neither 'pg_isready' nor 'nc' (netcat) is available in the container."
    exit 1
  fi
fi

echo "📂 Showing *.yaml files in /liquibase:"
if command -v tree >/dev/null 2>&1; then
  tree -C -P '*.yaml' /liquibase
else
  echo "(tree not available — falling back to ls)"
  find /liquibase -type f -name "*.yaml"
fi

echo "🚀 Running Liquibase command:"
exec "$@"
