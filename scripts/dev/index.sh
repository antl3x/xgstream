#!/bin/bash
set -e

echo -e "👻 running dev.."

pnpm run build
pnpm run build:watch &
nodemon --watch "cjs/" "cjs/index.dev.js" 
