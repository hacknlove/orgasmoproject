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

Those are the components that can be used dynamically.

In short, if the API gives something like `{ type: "SomeComponent", "props": {"some": "props"} }` orgasmo will render `<SomeComponent some="props" />` assuming there is a `SomeComponent.dynamic.jsx` file exporting a React component.

### Drivers

A driver is a set of known methods that deals with the data sources.

The scaffolding app uses the driver `@orgasmo/json`, meant for quick prototyping on the development environment`.

This driver's data-source is a folder with JSON files.

In the folder `/drivers` you can see the file `@orgasmo/json/data/pages/index.json` defining the `pageConfig` for the path `/`

## Catch-all route

At `/pages/[..._o].js` you can see the catch-all route that orgasmo uses to render the on-data pages.

The route `/` is not caught by the catch-all route, so you can see the file `/pages/index.js` reexporting all from `/pages/[..._o].js`

## Catch-all API route

at `/pages/api/[...o].js` you can see the catch-all API route, that orgasmo uses for some orgasmo's endpoints that manage things like lazy rendering and infinite scrolling

---

Now let's do the [Tutorial](GettingStarted/Tutorial.md).

?> If you want to add orgasmo to an existent Next.js web application, take a look at [Manual installation](Advanced/ManualInstallation.md)

