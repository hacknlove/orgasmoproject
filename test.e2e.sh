#/bin/sh

set -e

npm run build -w orgasmo  -w drivers/filesystem

npm test -w examples/infinite
npm test -w create-orgasmo
