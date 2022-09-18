#/bin/sh

set -e

npm run build
npm test -w orgasmo
npm test -w drivers/orgasmo-filesystem
npm test -w drivers/orgasmo-mongo
npm run test -w examples/infinite
npm run test -w create-orgasmo