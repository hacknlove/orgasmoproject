#/bin/sh

set -e

npm run build -w orgasmo -w drivers/json -w state -w admin

npm test -w examples/infinite
npm test -w create-orgasmo
