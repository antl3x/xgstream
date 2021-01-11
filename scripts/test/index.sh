#!/bin/bash
set -e

echo -e "💉 unit testing with jest.."
jest --config jest.config.js --verbose