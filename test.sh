#/bin/sh

set -e

npm run build
npm test -w orgasmo
npm test -w drivers/filesystem
npm test -w drivers/mongo
npm test -w drivers/strapi
npm test -w examples/infinite
npm test -w create-orgasmo