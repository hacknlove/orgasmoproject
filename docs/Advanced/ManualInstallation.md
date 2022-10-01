# Manual installation

This method is meant for when you have an existing Next.js application and you to enhance it with orgasmo.

## Install the dependencies

```bash
npm i @orgasmo/orgasmo
npm i @orgasmo/json
```

?> `@orgasmo/json` is not a required dependency but it comes in handy for development.

## update next.config.js

You need to wrap your `next.config.js` with `withOrgasmo` to enable the Orgasmo's build tools.

Anything that you can export from `next.config.js` can be wrapped:
* an js object
* a function that returns an js object
* an async function that returns a promise of a js object.

If you need to use several plugins, it should be safe to put `withOrgasmo` at the outter level, because it's not changing anything from the nextConfiguration at all. 

*For instance*

```js
const withOrgasmo = require("orgasmo/withOrgasmo")();

module.exports = withOrgasmo({
    // nextConfig here
});

```


## Add the catch-all route

Orgasmo uses a catch-all route to render the **in-data** pages.

Add something like this to your pages folder

```js
// file: /pages/[..._o].js

import Components from "../Components";
import driver from "../driver";

import PageFactory from "@orgasmo/orgasmo/PageFactory";
import getServerSidePropsFactory from "@orgasmo/orgasmo/getServerSidePropsFactory";

export default PageFactory({ Components });

export const getServerSideProps = getServerSidePropsFactory({ driver });
```

## Add the catch-all api

Orgasmos uses a catch-all api endpoint for infinite scrolling, etc.

Add something like this to your api folder

```js
// file: /pages/api/[..._o].js

import apiFactory from "@orgasmo/orgasmo/api";
import driver from "../../driver";

export default apiFactory({ driver });

```

## Drivers and components

It won't render any **in-data** page until you tell it how to get and render the pageConfigs.

Take a look at the sections [Drivers](drivers.md) and your [Dynamic components](DynamicComponents.md)

