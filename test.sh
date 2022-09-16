#/bin/sh

set -e

npm run build -w orgasmo
npm test -w orgasmo
npm run build -w drivers/orgasmo-filesystem
npm test -w drivers/orgasmo-filesystem
npm run test -w examples/infinite
npm run test -w create-orgasmo