#/bin/sh

set -e

npm run build -w state -w orgasmo -w drivers/json -w admin

npm test -w examples/infinite
npm test -w create-orgasmo
