# Getting Started

## Installation

```bash
npm init orgasmo some-name
cd some-name
```

This command will create a bootstrapped Next.js+orgasmo web.

!> At this stage the only package manager supported by the `create-orgasmo` script is `npm`.<br/>
If you use any other like `yarn create orgasmo some-name` the script will install the dependencies using `npm`.<br/>
I'm sorry, but at this early stage I need to prioritize.

?> The previous warning only affects `create-orgasmo` script. Once it's you can use any package manager you fancy.

## Orgasmo

Orgasmo enhances Next.js with **in-data** pages, which are pages that are not defined with js code, but with JSON data, that might be fetched from an API or database, and completed/transformed by some server side methods.

For this we have two building blocks, and a good to have feature:

- Dynamic Components
- Drivers
- scss importer

### Dynamic Components

A Dynamic component is a React Component that is meant to be mounted dynamically. From the Next.js or React perspective there is nothing special about these components, you don't need to learn anything new.

#### How to declare a component as dynamic.

Just put the file anywhere in the `/components/` tree, name it `Name.dynamic.{jsx,tsx}` and default-export the component.

?> The Name should be unique among the dynamic components.

### Drivers

The drivers are the abstraction and anti-corruption layer that sits between your data sources and orgasmo.

Orgasmo's does not care where or how the `pageConfig`s come, it just gives you a few and easy to follow convenctions so Orgasmo and your driver understand each other, appart from that it's up to you how do you organize your code.

You can have as many drivers as you like, and choose one or another with the environmental variable `ORGAMO_DRIVER` (defaults to `@orgasmo/json`)

Drivers can be:

- External: a npm package, like `@orgasmo/json`
- Custom: Completely defined in your source code.
- Overrided: a npm package, overrided by your sorce code.
- Common: It's not really a driver, is a way to share method accross all the drivers.

#### External drivers.

Just install the package, set the variable, and follow any instruction the package might have.

_For instance_

```bash
npm i @orgasmo/mongo
ORGASMO_DRIVER=@orgasmo/mongo npm run dev
```

Currently, there are 3 official drivers you can import and use:

- `@orgasmo/json`: it's meant to be use in development and testing.
- `@orgasmo/mongo`: It fetches the pageConfigs from mongo.
- `@orgasmo/strapi`: It fetches the pageConfigs from strapi.

#### Custom driver

Write the driver's methods as the default export of files with the suffix `.export` at the path and name that matches the methods paths inside the driver object. For instance `/drivers/my-driver/page/getPageConfig.export.ts` will define the method `page.getPageConfig` for the driver `my-driver`

At least you need to define these two methods, for they are directly used by orgasmo.

- `pages.getPageConfig`: receives a getServerProps context and returns a `pageConfig` or an array of pageConfigs
- `page.getPageConfigFromId`: receives a `pageId` and returns a `pageConfig`

You can define as many methods as you need, and they will be used dynamicalle as instructed by the pageConfigs.

?> There are more methods that are directy used by orgasmo, but that part is still not stabile, so no documentation yet.

#### Overrided driver

You can use an external driver, and create custom driver with the same name.

Your custom driver's method will override the external driver's methods.

#### Shared methods

In some cases you need the same method doing the same in all your drivers. For instance you need to sign some urls and it does not really matter whether the data comes from a database, an API a json... you are always getting the same url field from the inputs and you are always adding the same signed url field to outputs.

For those scenarios you can create a custom "driver" called `common`

The method resolution order is:

1. Custom Driver
2. Common "Driver"
3. External Driver

### SCSS importer

There are many ways to deal with styling in Next.js. To say a few, you can use:

- css modules
- styled-components
- tailwind

And everyone has its own pros and cons. At the end it's more a matter of taste.

the **SCSS importer** is just another opionated way to deal with styling. The one I find more simple and convenient.

Orgasmo will create a `/style.scss` file that imports all the `scss`and `css` files on your project.

The goal is to be able to do the styling in `scss` and `css`, but at the same time being able to split it confortabily across your pages and components, without the need to maintain a main scss importing everything.

It also has its advantages and disadvantages, but you don't need to use it if you don't like it. And it's very likely that I extract it from the core Orgasmo and put it in a plugin.

## Next.js config

As you can see if you have created your orgasmo web app using `npm init orgasmo` the `nextConfig` is wrapped with `withOrgasmo`

This starts the orgasmo build tools that creates the files

- `/driver.js` that exports the aggregated driver object
- `/Component.js` that exports the proxy component that mounts the dynamic components.
- `/style.scss` that imports all the `scss` and `css` files

?> in development mode, the orgasmo's build tool will listen for changes on the files to re build those.

You can disable any of those build tools passing with the options parameter

_For instance_

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const withOrgasmo = require("@orgasmo/orgasmo/withOrgasmo")();

module.exports = withOrgasmo(nextConfig, { scss: true });
```

?> You could disable all, or even not wrap your `nextConfig` with orgasmo, and the dynamic pages would work, as long as you provide orgasmo with a working driver and a working dynamic components proxy.

In a nutshell your driver needs to default-export an object with all the methods exported in two ways:

- in a tree, like `driver.method.path`
- by path, like `driver['method.path]`

You must at least define these two methods, _unless your driver is meant to override other one that defines them_.

- `pages.getPageConfig`: receives a getServerProps context and returns a pageConfig or an array of pageConfigs
- `page.getPageConfigFromId`: receives a pageId and returns a pageConfig
