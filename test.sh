#/bin/sh

set -e

npm run build -w orgasmo
npm run test -w orgasmo
npm run build -w drivers/orgasmo-filesystem
npm run test -w examples/infinite
npm run test -w create-orgasmo