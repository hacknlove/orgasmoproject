# WARNING

Many people have recommended changing the name of this library to make it look more professional and reliable.

I am starting the migration.

This repository will be renamed soon, and the npm package will be deprecated and replaced

# Orgasmo

A Next.js plugin that gives you the best UX, the best DX and the best MX (marketeer experience).

## Tutorials

- [Basic tutorial](https://docs.orgasmo.dev/#/GettingStarted/Tutorial)

## Documentation

[Quick Start](https://docs.orgasmo.dev/)

## Why using orgasmo.

Any web application in any highly competitive market requires increasingly shorter iteration cycles to run experiments, collect data, and thus optimize user acquisition, retention and of course, revenue. But it also requires to have very specific and unique features that set it apart from the competition.

Summarizing, a web application needs to have very specialized functionalities and to be easily and quickly modifiable.

But it's very hard to have both things, because either you use a CMS to configure an easily and quickly modifiable website, or you use a framweork to tailor a custom webapp.

If you choose a CMS, like workpress, it will be much harder for your developers to add the kind of specialization you might need.

If you choose a framework, like Next.js, Most of the non functional changes, event the simplest ones, will require changin the code and redeploying, and the development cycle is expensive and slow. You can improve the workflows and tools to decrease the cost and increase the speed, but it will never be as cheap and fast as editing data in and administration panel.

**Till now.**

With oragasmo you can make the functional changes _(FI. a new behavior for a component)_ in code , and the non-functional changes _(FI. a new page in a new route re-using the available components)_ in data.

## Vision.

- **Code is for: Components, driver and CSS rules.**
- **Data is for: Content, Structure and CSS variables.**

## Features.

Orgasmo is a plugin for Next.js that makes this vision possible.

You will have all the Next.js' features, and also you will enable your marketing team to do the following things on their own without any developer assistance.

- Change any content they want.
- Change what components are shown in any page and in which order.
- Add new routes and pages using and combining the existing components.
- Create testing versions of any page to try their changes, and when they are happy with the changes, apply them back to the production page.
- Set up progressive delivery strategies to gradually roll out their changes to limit any potential negative impact.
- Show different pages or content to different users based on their geographical localization or any cookie or HTTP header.
- Add as many contents as you want to any page without any performance penalty at all.
- Set up role-based rules to show different content to different roles.

But that's not all. Orgasmo also has nice characteristics to improve your development experience:

- You still have full freedom to organize your code and your data schema as it suits you better.
- It provides you with a DDD-ready architecture. Everything is intended to be greatly decoupled because at the end you don't know (or care) how the marketing team is going to use it.
- You can adopt it incrementally. This is not a take-it-all-or-leave-it-all framework. Just pick the pieces you need now and use it now, within your current Next.js application.
- The ability to write and use different driver for different scenarios, for instance a mocked driver to developing new features or to run tests.
- A notable reduction of bullshit and boilerplate code.
