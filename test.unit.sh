#/bin/sh

set -e

npm test -w orgasmo -- $@
npm test -w driver/json -- $@
npm test -w driver/mongo -- $@
npm test -w driver/strapi -- $@
