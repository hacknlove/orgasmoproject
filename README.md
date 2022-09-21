# Orgasmo ![coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)

## The best UX, the best DX, the best MX (marketeer experience).

Orgasmo's goal is to make it easy for you to improve your users' experience, by giving you the best developer experience, the best marketeer experience, and a complete set of over-the-top features.

## The Context.

Writing code is expensive and slow. You can improve its cost and speed, but it will never be as cheap and fast as editing data.

Any web application in any highly competitive market requires increasingly shorter iteration cycles to run experiments, collect data, and thus optimize user acquisition, retention and of course, revenue.

But it also requires to have very specific and unique features that set it apart from the competition.

Summarizing, a web application needs to have very specialized functionalities and to be easily and quickly modifiable.

But it's very hard to have both things.

Either you use a CMS to configure an easily and quickly modifiable website, or you use a framweork to tailor a custom webapp.

**Till now.**

## The vision.

- **Code is for: Components, Drivers and CSS rules.**
- **Data is for: Content, Structure and CSS variables.**

### The Solution.

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
- The ability to write and use different drivers for different scenarios, for instance a mocked driver to developing new features or to run tests.
- A notable reduction of bullshit and boilerplate code.

### Quickstart for brave early adopters.

#### Disclaimer.

This is a Work in progress. The schemas and contracts are not established yet, thus it's not recommendable at all for production environments.

Early adopters are invited to try it and provide feedback, but be aware that there is no guarantee of any kind of retro compatibility.

Breaking changes could and will happen.

#### First steps

- get a skaffolding

```sh
npm init orgasmo your-web
```

> ```
> Need to install the following packages:
>  create-orgasmo@1.6.4
> Ok to proceed? (y)
> Scaffolding:
> Installing dependencies
>
> added 256 packages, and audited 257 packages in 13s
>
> 79 packages are looking for funding
>  run `npm fund` for details
>
> found 0 vulnerabilities
> Done!
>
>
> run:
>
> cd your-web
> npm run dev
> ```

Read the readmes on `your-web/`
