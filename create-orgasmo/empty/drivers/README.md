# /Drivers

You need a driver to connect your web app with your data-source.

Think of this driver as an abstraction/anti-corruption layer, that sits between your databases/APIs and your web app.

To write a driver, you need to fulfil some simple contracts, but mostly you are free to organize your code as you wish.

## How to set a driver

Set the environmental variable `ORGASMO_DRIVER` to the name of the driver you want to use.

```
ORGASMO_DRIVER=foo
```

This will make Orgasmo use the NPM package `foo` as a driver, and to override/complete it with the content of the directory `driver/foo`

More information in the sections [Writing a driver](#writing-a-driver) and [Overriding-a-driver](#overriding-a-driver)

## How to use a driver

Orgasmo build tools will compile an entry point for you to import. `~/driver.js`

This file exposes all the drivers methods in two flavors, as a tree, and by the dotted key.

```js
import driver from "~./driver";

driver.foo.bar.buz === driver["foo.bar.buz"];
```

Most of the time you will only need to pass the driver to an Orgasmo's factory, as we will see later.

## default driver

For your convenience, to make it possible for you to start working with mocked data, you can just drop JSON files on the `driver/orgasmo-filesystem` directory. Open the [README.md](orgasmo-filesystem/README.md) to learn the schema.

Not setting the `ORGASMO_DRIVER` environmental variable is the same as setting it to `orgasmo-filesystem`

## More ready to use drivers

You can install and use the following drivers:

    orgasmo-mongo (README)[../../../drivers/mongo/README.mg]
    orgasmo-strapi (README)[../../../drivers/strapi/README.mg]

Currently, there are no plans to add more, but if you think that it makes sense to add some others like PostgreSQL or contentful, create an issue [here](https://github.com/hacknlove/orgasmoproject/issues/new).

## Writing a driver

Write your files on the drivers/[driver name] tree

For those files that play a public role, there are a few suffixes you need to use to tell Orgasmo what's the role of the file.

    `.export.{js,ts}` This is a driver's method.
    `.event.{js,ts}` This is an event handler
    `.import.{js,ts}` This is for initialization.

The rest of the files are ignored by Orgasmo. It's up to you to organize your driver as your discretion.

### driver's methods

The route of the file determines the place of the method on the drivers' tree.

For instance, the default export of the file `drivers/my-driver/foo/bar/buz.export.ts`  
defines the method `foo.bar.buz` for the driver `my-driver`

#### Minimum Required methods

    `page.getPageConfig`: This method receives a [Next.js getServerSideProps context parameter](https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#context-parameter) enriched with some Orgasmo's attributes, and returns a pageConfig, (or an array of pageConfigs), (or a promise)
    `page.getPageConfigFromId`: This method receives a pageId and returns a pageConfig (or a promise)

#### Custom methods

In many scenarios, the pageConfig schema will allow you to set a method path, to transform/complete the page props.

You can add all the methods you require. For instance.

    You might need to sign S3 URLs: You get the bucket and key from the database, and you use a `s3.sign` method to sign it and add a `src` property.
    You might share the same pageConfig for a dynamic path: You get one pageConfig for every path matching `/foo/:bar` and the pageConfig tells Orgasmo to use a `foo.getBar` method to fetch the items.

### handling events

Currently, Orgasmo is emitting a few events, mostly for visibility and security, but it might emit more soon, and you can also emit your own events through the shared event emitter.

To handle an event, add anywhere within your driver's directory tree a file named after the event's name.

For instance, the default export of the file `drivers/my-driver/foo/error.event.ts` will handle the `error`event.

You can have many files handling the same event.

Current events:

    `error`: internal and driver errors
    `badSigned`: the signature of an Orgasmo's internal API call is not valid.
    `expiredSignature`: the signature of an Orgasmo's internal API call is expired.
    `wrongUser`: The roles of the user making the request don't match the roles of the user for whom the request has been signed.

### Initialization

If you need the server to do some common initialization work, required by several methods or event handlers, you don't need to arbitrarily run that work from one method or event handler. You can use an `.import.` file to do the job.

This is just a convenience help, to avoid polluting any method or event with a shared behavior or requirement. The goal is to help you better organize your driver.

## Overriding a Driver

Please read [writing a driver](#writing-a-driver) if you haven't yet.

When you set `ORGASMO_DRIVER` to the name of a package, that package is used as the driver, (for instance `foo-driver`)

But if you need to change something, add more methods, or more event handlers, you can create a directory with the same name (`drivers/foo-driver`) and add there all the files you need, with the same contracts and conventions you would use if you were writing a driver from scratch.

If you write a method with the same name and path, it will override the driver's one.

If you write a new method, it will be added to the driver.
