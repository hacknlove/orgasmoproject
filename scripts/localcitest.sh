REPODIR=$PWD
rm -rf /tmp/orgasmoproject-ci
set -e
cd /tmp

git clone $REPODIR orgasmoproject-ci
cd orgasmoproject-ci
npm ci
npm run lint.ci
CI=true npm test

cd /tmp
rm -rf orgasmoproject-ci
