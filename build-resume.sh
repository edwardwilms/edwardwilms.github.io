#!/usr/bin/env bash
# One-command resume PDF builder.
# Usage: ./build-resume.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT/resume"

if [ ! -d node_modules ]; then
  echo "→ Installing resume dependencies (first run only, ~one minute)..."
  npm install --silent --no-audit --no-fund
fi

node build.mjs
