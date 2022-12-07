# driver

The driver are the abstraction and anti-corruption layer that sits between your data sources and orgasmo.

## Set the driver to be used

You need to use the environmental variable `ORGASMO_DRIVER` to the name of the driver you want to use.

The driver's name indicates where to find the it.

If the variable is not set, it defaults to `@orgasmo/json`

You can use a comma separated set of driver' names, to use driver composition, for instance:

```sh
ORGASMO_DRIVER=@orgasmo/admin,@orgasmo/mongo
```

## Kind of driver:

We can classify the driver in two, according to where the driver is loaded from:

- External: The driver is loaded from a NPM package.
- Internal: The driver is loaded from your source code.

Use the environmental variable `ORGASMO_DRIVER` to set the name of the driver you want to use, being the driver name the string for an import, or a path inside driver (or both).

For instance, `test/e2e` is the name of an internal driver that could live at `/driver/test/e2e`, and `@orgasmo/json` a driver that is imported from `@orgasmo/json`

## External driver

Currently, Orgasmo includes 4 external driver:

- [`@orgasmo/json']https://www.npmjs.com/package/@orgasmo/mongo): gets the pageConfigs from a collection of JSON files.
- [`@orgasmo/mongo`](https://www.npmjs.com/package/@orgasmo/mongo): gets the pageConfigs from a MongoDB database.
- [`@orgasmo/strapi`](https://www.npmjs.com/package/@orgasmo/strapi): gets the pageConfigs from a strapi server.
- [`@orgasmo/admin`](https://www.npmjs.com/package/@orgasmo/admin): adds methods used by orgasmo's playground and orgasmo's admin panel.

### JSON files

This driver uses JSON files, and is meant to be used in the development environment and UI testing.

It can be used in production, but you would need to redeploy to introduce changes to your app.

Drop your JSON files with the [pageConfig](GettingStarted/pageConfig.md)s into the folder `/driver/@orgasmo/json/data/pages`

More info: [`@orgasmo/json`](https://www.npmjs.com/package/@orgasmo/json)

### MongoDB database

This driver gets the [pageConfig](GettingStarted/pageConfig.md) documents from a MongoDB Collection

Use the environmental variable `ORGASMO_MONGO_URL` to set the MongoDB connection URL. It defaults to `mongodb://localhost:27017/orgasmo`

More info: [`@orgasmo/mongo`](https://www.npmjs.com/package/@orgasmo/mongo)

### Strapi server

This driver gets the pageConfigs from a strapi server using the template `@orgasmo/strapi-template`

Use the environmental variables `STRAPI_API_URL` and `STRAPI_API_TOKEN` to set the strapi URL and the strapi access token.

More info: [`@orgasmo/strapi`](https://www.npmjs.com/package/@orgasmo/strapi)

### Admin

This driver is not meant to be used isolated because it does not get pageConfigs thus orgasmo would only show 404s.

This driver is meant for driver composition, adding the methods required by the admin panel and the playground.

### Create your external driver own

If you want to use the same kind of data source or behavior in more than one orgasmo's web app, it makes sense to create a package to share comfortably the driver.

In a nutshell, your driver needs to default-export an object with all the methods exported in two ways:

- in a tree, like `driver.method.path`
- by path, like `driver['method.path]`

## Internal driver

If you want to create an internal driver, create a folder in the `/driver` tree, _for instance `/driver/my-driver`_

Then create a file for each driver's method you intend to define.

The file name must end with `.export.{js,tx}`.

The path of the method on the driver matches the full path+filename of the file on the driver's folder.

_`/driver/my-driver/page/getPageConfig.export.ts` will define the method `page.getPageConfig` for the driver `my-driver`_

## driver composition

driver composition is the mechanism by which the actual driver takes methods from many driver.

### Common directory

No matter what driver(s) do you set, all the methods defined inside the `/driver/common` directory will be loaded into the actual driver.

### Internal driver named after an External driver

When the same driver name can identify both an external driver and an internal driver, methods from both driver will be loaded into the actual driver.

This is very convenient for override an external driver.

_For instance the file `/driver/@orgasmo/mongo/page/getPageConfig.export.js` would override the method `page.getPageConfig` of the driver `@orgasmo/mongo`_

### Overriding order

When more than one driver defines the same method, one of those definitions will be used.

The overriding cascades from left to right, external to internal, being common the last one.

The method used is the one from the last driver that defines it, because it overrides all the previous definitions.

## Required Methods

Orgasmo needs these two driver's method to be defined:

- `pages.getPageConfig`: receives a getServerProps context and returns a pageConfig or an array of pageConfigs
- `page.getPageConfigFromId`: receives a pageId and returns a pageConfig
