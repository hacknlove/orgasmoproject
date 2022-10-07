# Strapi's template for orgasmo

Create your strapi server

```sh
npx create-strapi-app@latest orgasmo-strapi --quickstart --template @orgasmo/strapi-template
```

Create your orgasmo web app

```sh
npm init orgasmo your-webapp-name
```

Install the strapi driver

```sh
cd your-webapp-name
npm i @orgasmo/strapi
```

Set the environmental variables _(for instance in .env.local)_

- `ORGASMO_DRIVER=@orgasmo/strapi`
- `STRAPI_API_URL`
- `STRAPI_API_TOKEN`

## Orgasmo's Documentation

[docs.orgasmo.dev](https://docs.orgasmo.dev)
