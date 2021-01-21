#!/bin/bash
set -e

# Build Watch CJS Modules
node_modules/.bin/nodemon --on-change-only -e ts -w src \
 -x 'node_modules/.bin/tsc -p tsconfig.build.json && node_modules/.bin/ef-tspm -c tsconfig.build.json && node cjs/index.js'