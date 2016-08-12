#!/usr/bin/env bash
CUR_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
echo $CUR_DIR
node $CUR_DIR/../../node_modules/mocha/bin/_mocha --ui bdd $CUR_DIR/../tests