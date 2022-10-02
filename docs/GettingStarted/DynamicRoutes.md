# Dynamic Routes

## Code Side

One of the key Orgasmo's features is the dynamic routes.

Dynamic-routes are not defined by code, but by data.

With **Next.js you can set routes as patterns** like `/pages/post/[post-id].js`, that are quite dynamic, but still they are limited to what you have defined in your code.

What I mean by **Dynamic routes** is that at run time you, in whatever **database** you are using, you can set any route or pattern you want, and your orgasmo application will be able to render it.

### Catch-all routes

To make that happen we need to manage a catch-all route, for most scenarios at `/pages/[..._o].js`.

```js
import Components from "../Components";
import driver from "../driver";

import PageFactory from "@orgasmo/orgasmo/PageFactory";
import getServerSidePropsFactory from "@orgasmo/orgasmo/getServerSidePropsFactory";

export default PageFactory({ Components });

export const getServerSideProps = getServerSidePropsFactory({ driver });
```

That will allow Orgasmo to render any page that is defined in the code.

For instance, consider the following files estructure.

<pre style="font-family:monospace; line-height: 1.15 ">
┬─ pages/
├┬─ foo/
│├─ bar.js
│└─ [...all].js
├─ foo.js
└─ [..._o].js
</pre>

- `/foo` is an **in-code** page rendered by `/pages/foo.js`
- `/foo/bar` is an **in-code** page rendered by `/pages/foo/bar.js`
- `/foo/any/other/path` is an **in-code** page redered by `/pages/foo/[..all].js`
- `/any/other/page` is an **in-data** page rendered by `/pages/[..._o].js`

#### subpath

If you want all your dynamic routes in a sub path, you just need to put the orgasmo's catch-all file in the path you want.

For instance you want to use **in-code** pages for all your application, and **in-data** pages only for the routes on the subpath `/blog/`

You will have something like.

<pre style="font-family:monospace; line-height: 1.15 ">
┬─ pages/
├┬─ blog/
│└─ [..._o].js
├─ index.js
...
</pre>

## Data Side

?> If you are using the official drivers and the official admin panel, you don't need to read this documentation.

With orgasmo you can define your routes in the data source.

There are two kind of dynamic routes:

- `exactPath`: by string equality
- `patternPath`: by pattern match _[path-to-regexp](https://github.com/pillarjs/path-to-regexp)_

When a page is going to be rendered by orgasmo, it tryes first to find an exact match. This exact matching search is fast, because indexing can be used.

If no exact match is found, the pattern are tried one by one, until one pattern matches, which is used.

If there is no matching pattern, 404 is returned.

### `patternPath` matching

It's very likely that different `patternPath`s match the same path, but the `patternPath` search ends with the first match, so the order matters.

#### Order of `patternPath`s

Lexicographical order is used, with some replaces.

- The secuence `/:[^/]+(/` is replaced with the penultimate character.
- The character `(` is the last character.
- The secuence `/:[^/]*/` is replaced with the antepenultimate character.

This makes the following ordering:

1. exact `/foo/bar/:baz` _second segment is `bar`_
2. placeholder `/foo/:bar/:baz` _second segment is anything `:bar`_
3. named regexp `/foo/:bar(\\d+)/:baz` _second segment is a named regexp `:bar(\\d+)`_
4. unnamed regexp `/foo/(\\d+)/:baz` _second segment is an unnamed (not catched) regexp `(\\d+)`_

### Multiple matching

Multiple matching is used for AB testing, and progressive delivery.

Multiple matching requires the same match, so:

- if a `pageConfig` matches by `exactPath` equality, only other pageConfigs with the same exactPath will be part of the multiple matching. It does not matter whether other `pageConfig`s match by `patternPath`
- if a `pageConfig` matches by `patternPath`, only pageConfigs with the same `patternPath` will be part of the multiple matching. It does not matter whether other `pageConfig`s have different `patternPath` that might match too.

#### AB testing

Set the same `exactPath` or `patternPath` to two (or more) `pageConfig`s and the users will see one of the matching `pageConfig` randomnly.

But AB testing is more than show different versions to different users, you need to track what user see what page.

You can use the field `cookie` at the root of the `pageConfig` to set cookies, or you can use the field `injectjs` to inject small js snippets.

#### Progresive Delivery

You can set the field `ratio` to change the probability of the `pageConfig` to be selected

For instance if you have two `pageConfig`s, lets called them `newPageConfig` and `oldPageConfig` for the same path, and you want the `newPageConfig` to be shown only to a 5% of the users, you can set the `newPageConfig`'s ratio to 5 and `oldPageConfig`s ratio to 95
