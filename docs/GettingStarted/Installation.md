# Installation

## Creating a new Project

You can use the create-orgasmo script to bootstrap your Next.js+orgasmo web application.

```bash
npm init orgasmo some-name
cd some-name
npm run dev
```

## Scaffolding overview

### Components

In the folder `/components` you can see some components whose filename ends with `dynamic.jsx`

Orgasmo takes those components and compiles the file `/DComponent.ts`, open it and take a look.

As you can see, this file imports every dynamic component and returns a Component that renders one or the other depending on the prop `type`

This component `DComponent` is used by orgasmo to render
You can use this `<DComponent type="SomeComponent" props={someProps} />` in your regular pages, and your regular components, if you need to.

### Drivers

A driver is a set of known methods that deals with the data sources.

In the folder `/drivers` you can see just a file `@orgasmo/json/data/pages/index.json` file.

The scaffolding app uses the driver `@orgasmo/json`, meant for quick prototyping on the development environment`. This driver's data-source is a folder with JSON files.

You can edit this file, refresh the browser, and you will see that the page has changed.

Orgasmo compiles the file `/driver.js` from the contents of the `/drivers` folder and the value of the environmental variable `ORGASMO_DRIVER`

## Catch-all route

At `/pages/[..._o].js` you can see the catch-all route that orgasmo uses to render the on-data pages.

The route `/` is not caught by the catch-all route, so you can see the file `/pages/index.js` reexporting all from `/pages/[..._o].js`

## Catch-all API route

at `/pages/api/[...o].js` you can see the catch-all API route, that orgasmo uses for some orgasmo's endpoints that manage things like lazy rendering and infinite scrolling

---

Now let's do the [Tutorial](GettingStarted/Tutorial.md).

?> If you want to add orgasmo to an existent Next.js web application, take a look at [Manual installation](Advanced/ManualInstallation.md)
