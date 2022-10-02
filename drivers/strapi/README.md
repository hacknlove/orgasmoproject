# orgasmo strapi driver

This driver connects your orgasmo webapp with strapi, using the schema of `@orgasmo/strapi-template`

## How to use

Install the driver

```
npm i @orgasmo/strapi
```

Start or create your strapi server

```
cd ..
npx create-strapi-app@latest orgasmo-strapi --quickstart --template @orgasmo/strapi-template
```

Set the environmental variable `ORGASMO_DRIVER=@orgasmo/strapi`

Use the environmental variable `STRAPI_API_URL` to set your strapi api url. _For instancehttp://localhost:1337/api/_
Use the environmental varianle `STRAPI_API_TOKEN` to set your strapi access token.

## Orgasmo's Documentation

[docs.orgasmo.dev](https://docs.orgasmo.dev)
