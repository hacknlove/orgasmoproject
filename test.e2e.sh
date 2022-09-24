#/bin/sh

set -e

npm run build -w orgasmo  -w drivers/json

npm test -w examples/infinite
npm test -w create-orgasmo
