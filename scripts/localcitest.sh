cd /tmp

git clone git@github.com:hacknlove/orgasmoproject.git
cd orgasmoproject
npm ci
CI=true npm test