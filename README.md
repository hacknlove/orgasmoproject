# Orgasmo ![coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)

![Logo](./orgasmo.svg)
## The best user experience

Orgasmo is a set of components and tools for developers that enhances Nextjs to help you effortless build even more outstanding web apps, with the following characteristics.

### How to make a PO orgasm? 

* **Lighter pages**, and faster first load time, without sacrificing content or interactivity, thanks to the Orgasmo's **lazy stream of data and components** that provides you, out of the box, with smart infinite vertical scroll, and smart infinite horizontal sliders. 
* **Huge no-code flexibility** that allows faster changes and provides more agility and shorter iteration loops, thanks to the Orgasmo's **dynamic site structure**, that avoid deploys and their overhead.  Developers only writes components and drivers, but where and how use that components and drivers is not code, is data.
* **Safest changes** with a minimized impact on case of error, thanks to the Orgasmo's **progressive  propagation**, that makes it possible to deliver the newest version to a growing subset of your visitors.
* and many, many more nice things out of the box like **AB testing**, **role-based permissions**, or **smart caching**.

### How to make a developer orgasm? 
* **100% Bullshit free**: No boilerplate code, no weird esoteric magic, no complex configuration and the quickest quick-start you have ever experienced.
* **Incrementally adoptable**: This is not a take-it-all-or-leave-it-all framework.  Everything is designed to work and be useful alone and together. Just pick the piece you need now and use it now, within your current Nextjs application. 
* **Fully decoupled**: You can effortless create multiple drivers for different backends or scenarios, and switch them easily. You could for instance have different mocked driver for your development or tests environments.
* and many, many more nice things like, **type-safe**, **fully tested** or **DDD ready**

## Quick Start

Run this to get a scaffolding to start
```
npm init orgasmo your-new-orgasmo-site
cd your-new-orgasmo-site
npm run dev
```

If you are new to Next.js, please take a look at Netx.js [tutorial](https://nextjs.org/learn/foundations/about-nextjs?utm_source=orgasmo&utm_medium=orgasmo&utm_campaign=orgasmo) and [documentation](https://nextjs.org/docs/getting-started?utm_source=orgasmo&utm_medium=orgasmo&utm_campaign=orgasmo).

### What is orgasmo about? Our Vision.

* Code is for Components and Drivers. (What widgets you have and how you can get the data.)
* Data is for Content, Site extructure, pages structure. (what widgets with what data are shown in any specific url)
* *Regarding stlye, Code is 95% of the style, Data is 5% of the style (css variables)*

Orgasmo is built on top of Next.js and, of course, you can use all next.js features, like for instance defining **in-code pages**; but the raison d'être of Orgasmo is to enable you to create **in-data pages**

So for now, forget about editing `/pages/infrc.jd` and go to poke around with `/driver/mocked/pages/page.json` and `/driver/mocked/pages/rows.json` to play around.

Eventually you will need to create your own dynamic components (Components that are loaded dynamically based on the data) and your driver to connect with your data sources.

Yoy have full freedom to organize your files, but there a few conventions you need to follow:

1. Create your dynamic components inside the `/components` directory with have the extension `.dynamic.{jsx,tsx,js,ts,cjs,mjs}`
2. Create your driver inside the `/driver/[your-driver-name]`] directory and use the extension `.export.{js,ts,mjs,cjs}` for those files that are meant to be used from outside the driver. 


### Driver
For this quick start these are the things you need to know about the drivers:

You can have as many drivers as you want, but you can only use one at a time.

The name of the driver to be used is determined by the environmental variable `ORGASMO_DRIVER`

For now these are the files you need to know about:

* `/drivers/[your-driver]/pages/getPage.export.js`
* `/drivers/[your-driver]/pages/getPageFromId.export.js`

`getPage.export.js` should export a function that accepts nextjs getServerSideProps context and returns the configuration of the page you want to render.

`getPageFromId.export.js` should export a function that accepts a pageId and returns the page configuration that correspond to that pageId. It's used by the data streamer.


so, What's a page configuration?

The page configuration is a JSON object that contains the recipe for a kind of page. Meaning, it's the recipe that will be used by all pages of the same type, be it one or thousands.

For now, just mind these fields:

* id: unique id that identifies the page configuration. REQUIRED.
* top: array with the items that go at the begining of the page and that will be always present. OPTIONAL
* rows: array with the items that are managed by the  smart infinite vertical scroll. OPTIONAL
* bottom: array with the items that go at the bottom of the page, and that will be always present. OPTIONAL
* rowsLimit: the number of rows that will be render at SSR. The rest of the rows will be render at the discretion of the smart infinite vertical scroll.

For now, consider these fields for the items:

* type: the name of the Dynamic component that should be rendered
* props: The props the Dynamic component will receive 
### Have fun!

I think you have enough information to try to create different urls with different kind of pages.

Play a bit around, try to build something, and then come back to learn a bit the next key feature that will allow you to reuse your page configurations, so you can use the same kind of page in multiple urls: **dynamic items**.

### Dynamic Items.

Documentation in progress. Please be patient.

## WIP

This is still a work in progress.

All the features are ready, but the API is not established. During the process of writing the documentation, changes could be done to improve the DX.

Moreover, the e2e testing is far for been complete.

This project should not be used in production until more examples are provided because they will be used for the e2e testing of every feature and possibility.

Be Patient.

### TODO

* ⌛ Quick Start Guide
* ⌛ Tutorial
* ⌛ Reference Guide
* ⌛ Examples
* ❓ React Native