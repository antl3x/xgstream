#!/bin/bash
set -e

echo -e "👻 running dev.."

pnpm run build
nodemon --watch "cjs/" "cjs/index.dev.js" & 
pnpm run build:watch
