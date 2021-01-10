#!/bin/bash

set -e

echo -e "🧪 💉 [test:performance] starting performance test.."

if [ $# -eq 0 ]
  then
    echo -e "Error! You must inform a valid performance file. (ex: pnpm run test:performance tests/modules/something/some.performance.ts   ) \n"
    exit 1
fi

node_modules/.bin/ts-node $1