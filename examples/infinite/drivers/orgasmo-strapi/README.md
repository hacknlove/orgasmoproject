# strapi example

From orgasmoproject root directory.

## Start strapi

```
cp examples/infinite/drivers/orgasmo-strapi/data.db admin/strapi/
npm run dev -w admin/strapi
```

## Start orgasmo

```
npm run build -w orgasmo
npm run build -w drivers/orgasmo-strapi
ORGASMO_DRIVER=orgasmo-strapi npm run dev -w examples/infinite
```
