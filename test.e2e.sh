#/bin/sh

set -e

npm run build -w build-tools -w state -w orgasmo -w driver/json -w admin

npm test -w examples/infinite
npm test -w create-orgasmo
