#!/bin/bash
set -e

echo -e "💉 starting unit testing with jest (watch mode).."

node_modules/.bin/nodemon -e ts -w src -w tests \
 -x 'jest --config jest.config.js --verbose'