#!/bin/bash
set -e

# Build CJS Modules
rm -rf cjs
node_modules/.bin/ttsc -p tsconfig.build.json
rm -rf cjs/tsconfig.build.tsbuildinfo

# Build ES Modules
rm -rf esm
node_modules/.bin/ttsc -p tsconfig.esm.json
find ./esm/ -name "*.js" -exec bash -c 'mv "$1" "${1%.js}".mjs' - '{}' \;
rm -rf esm/tsconfig.esm.tsbuildinfo