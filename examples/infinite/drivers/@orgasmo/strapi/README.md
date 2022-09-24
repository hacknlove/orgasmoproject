# strapi example

From orgasmoproject root directory.

## Create and start strapi for this orgasmo example

from the root of the project:

```
cd ..
npx create-strapi-app@latest orgasmo-strapi --quickstart --template @orgasmo/strapi-template --no-run

mkdir orgasmo-strapi/.tmp

cp orgasmoproject/examples/infinite/drivers/@orgasmo/strapi/data.db orgasmo-strapi/.tmp/
cp orgasmoproject/examples/infinite/drivers/@orgasmo/strapi/.env orgasmo-strapi/

cd orgasmo-strapi
npm run develop
```

user: `admin@example.com`
password: `BullSh1t.Security`

> Trhough 20 years of effort, we've successfully trained everyone to use passwords that are hard for humans to remember, but easy for computers to guess.
> https://xkcd.com/936/

## Start orgasmo

```
npm run build -w orgasmo
npm run build -w drivers/strapi
ORGASMO_DRIVER=@orgasmo/strapi npm run dev -w examples/infinite
```
