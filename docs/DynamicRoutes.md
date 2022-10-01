# Dynamic Routes

One of the key Orgasmo's features is the dynamic routes.

Dynamic-routes are not defined by code, but by data.

With **Next.js you can set routes as patterns** like `/pages/post/[post-id].js`, that are quite dynamic, but still they are limited to what you have defined in your code.

What I mean by **Dynamic routes** is that at run time you, in whatever **database** you are using, you can set any route or pattern you want, and your orgasmo application will be able to render it.

## Catch-all routes

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

* `/foo` is an **in-code** page rendered by `/pages/foo.js`
* `/foo/bar` is an **in-code** page rendered by `/pages/foo/bar.js`
* `/foo/any/other/path` is an **in-code** page redered by `/pages/foo/[..all].js`
* `/any/other/page` is an **in-data** page rendered by `/pages/[..._o].js` 

### subpath

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


