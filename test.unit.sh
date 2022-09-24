#/bin/sh

set -e

npm test -w orgasmo -- $@
npm test -w drivers/filesystem -- $@
npm test -w drivers/mongo -- $@
npm test -w drivers/strapi -- $@
