cd /tmp
rm -r orgasmoproject-ci
git clone git@github.com:hacknlove/orgasmoproject.git orgasmoproject-ci
cd orgasmoproject
npm ci
CI=true npm test