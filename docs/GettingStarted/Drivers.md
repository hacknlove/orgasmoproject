# Drivers

The drivers are the abstraction and anti-corruption layer that sits between your data sources and orgasmo.
 
There are two kind of drivers:

* External: The driver is a npm package
* Internal: The driver lives in a directory in the `/drivers` tree

Use the environmental variable `ORGASMO_DRIVER` to set the name of the driver you want to use, being the driver name the npm package name, or the path inside drivers. For instace `test/e2e` is the name of an internal driver that could live at `/drivers/test/e2e` 


## External Drivers

Currently, Orgasmo includes 3 external drivers:

* [`@orgasmo/mongo`](https://www.npmjs.com/package/@orgasmo/mongo): The data comes from a mongo database
* [`@orgasmo/strapi`](https://www.npmjs.com/package/@orgasmo/strapi): The data comes from a strapi server

### JSON files

This driver uses json files, and is meant to be used in the development environment and UI testing.

It can be used in production, but you would need to redeploy to make changes to your app.

Drop your json files with the [pageConfig](GettingStarted/pageConfig.md)s into the folder `/drivers/@orgasmo/json/data/pages`

More info: [`@orgasmo/json`](https://www.npmjs.com/package/@orgasmo/json)

### Mongo database

This driver gets the [pageConfig](GettingStarted/pageConfig.md) documents from a mongo Collection

Use the environmental variable `ORGASMO_MONGO_URL` to set the mongo connection url. It defaults to `mongodb://localhost:27017/orgasmo`

More info: [`@orgasmo/mongo`](https://www.npmjs.com/package/@orgasmo/mongo)


### Strapi server

This driver gets the pageConfigs from a strapi server using the template `@orgasmo/strapi-template`

Use the environmental variables `STRAPI_API_URL` and `STRAPI_API_TOKEN` to set the strapi url and the strappi access token.

More info: [`@orgasmo/strapi`](https://www.npmjs.com/package/@orgasmo/strapi)

### Create your own

If you want to use the same kind of datasource or behaviour in more than one orgasmo's webapp, it makes sense to create a package to share confortably the driver.

In a nutshell your driver needs to default-export an object with all the methods exported in two ways:

- in a tree, like `driver.method.path`
- by path, like `driver['method.path]`

## Internal Drivers

If you want to create an internal driver, create a folder in the `/drivers` tree, *for instance `/drivers/my-driver`*

Then create a file for each driver's method you want to define.

The file name must end with `.export.{js,tx}`, and the path of the method on the driver will match the path+filename of the file on the driver's folder.

*`/drivers/my-driver/page/getPageConfig.export.ts` will define the method `page.getPageConfig` for the driver `my-driver`*

## Driver Overriding

Driver overriding is the mechanism by which the methods of the overriging driver replace the methods of the overrided driver.

There are two kinds of Driver Overriding:

* Implicit: You set one driver name, and use the implicit overriding methods.
* Explicit: You set a comma separated list of drivers, that will combine into one.

### Implicit Overriding

#### Common directory
All the methods that you define in the `/drivers/common` folder will automatically overload the same methods of the driver in use.

#### Internal driver named after an External driver

If you create an internal driver with the same name as an external driver, the internal driver will override the external driver.

*For instance the file `/drivers/@orgasmo/mongo/page/getPageConfig.export.js` will override the method `page.getPageConfig` of the driver `@orgasmo/mongo`*

#### Overriding order

The order of the overriding is:
1. common
2. internal
3. external

### Explicit Overriding

If you set a list of comma separated drivers like `ORGASMO_DRIVER=driver1,driver2,driver3` the drivers will override each other from right to left, so considering the previous example `driver3` will override `driver2` and these two will override `driver1`


#### Overriding Order

The implicit overriding still works with the same order. Just expand internal and external with the list.

In the previous example the Overriding order is:

1. common
2. internal driver3
3. internal driver2
4. internal driver1
5. external driver 3
6. external driver 2
7. external driver 1

This means that when calling a method, the method used will be the one for the first driver (in that order) that defines it.

## Required Methods

Orgasmo needs these two driver's method to be defined:

* `pages.getPageConfig`: receives a getServerProps context and returns a pageConfig or an array of pageConfigs
* `page.getPageConfigFromId`: receives a pageId and returns a pageConfig