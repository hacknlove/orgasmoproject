#/bin/sh

set -e

npm test -w orgasmo -- $@
npm test -w drivers/json -- $@
npm test -w drivers/mongo -- $@
npm test -w drivers/strapi -- $@
