#!/bin/bash
set -e

# Build Watch CJS Modules
node_modules/.bin/nodemon --on-change-only -e ts -w src \
 -x 'node_modules/.bin/ttsc -p tsconfig.build.json && node cjs/index.js'