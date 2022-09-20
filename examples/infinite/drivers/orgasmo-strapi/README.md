# strapi example

From orgasmoproject root directory.

## Start strapi
```
cp examples/infinite/drivers/orgasmo-strapi/data.db admin/orgasmo-strapi-admin/
npm run dev -w admin/orgasmo-strapi-admin
```

## Start orgasmo
```
npm run build -w orgasmo
npm run build -w drivers/orgasmo-strapi
ORGASMO_DRIVER=orgasmo-strapi npm run dev -w examples/infinite
```

