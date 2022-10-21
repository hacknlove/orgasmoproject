# Tutorial

## 1. Clone the tutorial.

[`git@github.com:hacknlove/orgasmo-tutorial.git`](https://github.com/hacknlove/orgasmo-tutorial)

```sh
git clone `git@github.com:hacknlove/orgasmo-tutorial.git`
cd orgasmo-tutorial
git checkout clean
npm i
npm run dev
```

### Tutorial helpers

- `npm run step`: Prints on what step you need to do.
- `npm run help`: Opens the tutorial website at the specific step
- `npm run compare`: Shows the differences between your code and the solution to the step
- `npm run next`: Makes your code state ready to start working on the next step

## 2. "Hello worlds"

Clean all the content from the home, leave only a Header with the Phrase "Hello worlds"

Also update the home page's title and the description.

<details>
<summary><code>/drivers/@orgasmo/json/data/pages/index.json</code></summary>

```js
{
  "pageId": "/",
  "exactPath": "/",
  "layout": {
    "name": "Layout",
    "meta": [
      ["title", "Hello worlds"],
      ["description", "Hello all the worlds"]
    ]
  },
  "areas": {
    "header": {
      "items": [
        {
          "type": "Header",
          "props": {
            "text": "Hello worlds"
          }
        }
      ]
    }
  }
}
```

</details>

Refresh the browser, and you should see your new home.

## 3. Add some planets

Edit the same file again, and add some planets.

We are going to do this in a new area, called main.

Create one item for each planet, with the type `"CardLink"` and the props should be like this one:

```json
{
  "title": "earth",
  "href": "/hello/earth"
}
```

You can use these planets:

- Alderaan
- Arrakis
- Discworld
- Krypton
- Magrathea
- Vulcan
- Pluto

!> If you are thinking that shouldn't be in the list because Pluto is not an actual planet, I want you to consider if you have the same concerns about Alderaan or Kyrpton which aren't actual planets either.

You should have ended up with something like

<details>
<summary><code>/drivers/@orgasmo/json/data/pages/index.json</code></summary>

```js
{
  "pageId": "/",
  "exactPath": "/",
  "layout": {
    "name": "Layout",
    "meta": [
      ["title", "Hello worlds"],
      ["description", "Hello all the worlds"]
    ]
  },
  "areas": {
    "header": {
      "items": [
        {
          "type": "Header",
          "props": {
            "text": "Hello worlds"
          }
        }
      ]
    },
    "main": {
      "items": [
        {
          "type": "CardLink",
          "props": {
            "title": "Alderaan",
            "href": "/hello/Alderaan"
          }
        },
        {
          "type": "CardLink",
          "props": {
            "title": "Arrakis",
            "href": "/hello/Arrakis"
          }
        },
        {
          "type": "CardLink",
          "props": {
            "title": "Discworld",
            "href": "/hello/Discworld"
          }
        },
        {
          "type": "CardLink",
          "props": {
            "title": "Krypton",
            "href": "/hello/Krypton"
          }
        },
        {
          "type": "CardLink",
          "props": {
            "title": "Magrathea",
            "href": "/hello/Magrathea"
          }
        },
        {
          "type": "CardLink",
          "props": {
            "title": "Vulcan",
            "href": "/hello/Vulcan"
          }
        },
        {
          "type": "CardLink",
          "props": {
            "title": "Pluto",
            "href": "/hello/Pluto"
          }
        }
      ]
    }
  }
}

```

</details>

But you won't see anything new when you refresh the browser.

Open the developer tools, and inspect the `div.grid` element.

Those `<div data-component-name="CardLink"></div>` elements are showing you that there is no such `CardLink` dynamic element.

We will create the component in the next step, but you can run some experiments now if it pleases you.

For instance, rename the file `/components/Card.dynamic.jsx` to `/components/CardLink.dynamic.jsx`, or change any item type from `CardLink` to `Card` and refresh the browser.

When you want to continue with the next tutorial step, run `npm run next`

## 4. Add a Dynamic Component

A dynamic component is just a regular react component, default-exported from a file which name starts with a capital letter and ends with `.dynamic.jsx` or `dynamic.tsx`

That's all.

So, don't expend too much time with this.

?> Actually, this regular expression is more accurate: `/[A-Z][A-Za-z0-9_]*)\.dynamic\.[tj]sx/`

Just copy `Card.dynamic.jsx` to `CardLink.dynamic.jsx` and from the component `CardLink` remove the `p` and the extra property, and use a `next/link`

<details>
<summary><code>/components/CardLink.dynamic.jsx</code></summary>

```js
import Link from "next/link";
export default function CardLink({ href, title }) {
  return (
    <div>
      <Link href={href}>
        <a className="card">
          <h2>{title} &rarr;</h2>
        </a>
      </Link>
    </div>
  );
}
```

</details>

Cool, Now we see all our fiction planets ;)

## 5. Styling

You can see, `h2` inside the `.card` has a `margin-bottom` that it's fine for the `Card` elements which have title and content, but we don't want that margin in our `CardLink` elements.

We could fix this any of the many ways react, Next.js and the ecosystem provide us, but we are going to use another orgasmo feature because this is an orgasmo tutorial.

Add a `"link"` class to the `Card`'s `a` element.

Create a file `CardLink.css` next to `CardLink.dynamic.jsx` and put there the CSS you need to fix it.

<details>
<summary><code>/components/CardLink.css
</code></summary>

```css
.card.link > h2 {
  margin-bottom: 0;
}
```

</details>

You can see that the style is fixed, and you didn't have to do anything to import this CSS file.

?> orgasmo finds all the `.css` and `.scss` files in your project (except CSS module files), and creates a file `/style.scss` that import them all, so you only need to import `/style.scss` from your `/pages/_app.js` file, and you can split your CSS in files, close to where they belong, without caring yourself about maintaining the CSS imports.

## 6. Layout

You can see that the original scaffolding had 2 columns of cards, but now we have only 1 column.

It's because previously, the rendering mode of the main area was set to `"bubble"`, but we removed this configuration, causing it to default to `"static"`.

We will explore the rendering modes later, for now, I just want you to know that the `"bubble"` mode needs to wrap your set of items in a `div`.

Let's use this as an excuse to create a new layout called `PlanetsLayout`

The new layout will be a copy of `/components/Layout.dynamic.jsx` but wrapping the main area with a `div` with the class planets.

Add CSS rules for `.grid>.planets` to have 2 columns.

<details>
<summary><code>
/components/PlanetsLayout.dynamic.jsx
</code></summary>

```jsx
import Head from "next/head";
import Area from "@orgasmo/orgasmo/Area";

export default function PlanetsLayout() {
  return (
    <div className="container">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <Area name="header" />
        <div className="grid">
          <div className="planets">
            <Area name="main" />
          </div>
        </div>
      </main>

      <footer className="footer">
        <Area name="footer" />
      </footer>
    </div>
  );
}
```

</details>

<details>
<summary><code>
/components/PlanetsLayout.css
</code></summary>

```css
.grid > .planets {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2rem;
}
```

</details>

Edit the home's pageConfig's JSON file to use the new layout.

<details>
<summary>
<code>
/drivers/@orgasmo/json/data/pages/index.json
</code></summary>

```json
{
  "pageId": "/",
  "exactPath": "/",
  "layout": {
    "name": "PlanetsLayout",
    "meta": [
      ["title", "Hello worlds"],
      ["description", "Hello all the worlds"]
    ]
  },
  "areas": {

```

</details>

---

## 7. Dynamic routes

If you have clicked into any of the planets, you have noticed that it shows a 404 error.

Let's fix it, adding a pageConfig for a dynamic route that matches the pattern path `/hello/:planet`

You need to create a JSON file named `hello-planet.json`, but instead of `exactPath` use the field `patternParh`

For the areas, just use the header area to render only one component with the text `"Hello planet"`

<details>
<summary><code>
drivers/@orgasmo/json/data/pages/hello-planet.json
</code></summary>

```json
{
  "pageId": "hello-planet",
  "patternPath": "/hello/:planet",
  "layout": {
    "name": "PlanetsLayout",
    "meta": [
      ["title", "Hello planet"],
      ["description", "Hello this planet"]
    ]
  },
  "areas": {
    "header": {
      "items": [
        {
          "type": "Header",
          "props": {
            "text": "Hello planet"
          }
        }
      ]
    }
  }
}
```

</details>

## 8. Custom driver methods

We cannot salute every planet, but we need some way to personalize this.

Let's create a method that modifies the item properties.

Create this file:

`drivers/common/planet/sayHello.export.js`

```js
export default function itemHeader(config) {
  return {
    text: `${config.params.parsedPath.string} - ${config.params.parsedPath.number}`,
  };
}
```

And remove the props from your item, and set this `"getProps": "planet.sayHello"`.

?> `"getProps"` overrides the item props with the response of the driver's method specified. You can add methods to any driver under the `/driver/common/ directory.

## 9. Infinite planets

We are going to salute all the planets of the whole galaxy, but there are too many, and thus we cannot render them all on the first load; therefore We will use infinite scrolling.

We need a driver method to that gets/generates more items

Create the following file:
`/drivers/common/planet/getAnotherPlanet.export.js`

```js
export default function getAnotherPlanet({ number }) {
  const planetName = Math.sin(number).toString(36).split(".")[1];

  return {
    type: "CardLink",
    props: {
      title: `Hello ${planetName}`,
      href: `/hello/${planetName}`,
    },
  };
}
```

And we also need to enable the bubble mode, put use the original layout, set a `ssrSize` of 10, and set `"getItem"` to `planet/getAnotherPlanet`

<details>
<summary><code>
/drivers/@orgasmo/json/data/pages/index.json
</code></summary>

```json
{
  "pageId": "/",
  "exactPath": "/",
  "layout": {
    "name": "Layout",
    "meta": [
      ["title", "Hello worlds"],
      ["description", "Hello all the worlds"]
    ]
  },
  "areas": {
    "header": {
      "items": [
        {
          "type": "Header",
          "props": {
            "text": "Hello worlds"
          }
        }
      ]
    },
    "main": {
      "items": [
        {
          "type": "CardLink",
          "props": {
            "title": "Alderaan",
            "href": "/hello/Alderaan"
          }
        },
        {
          "type": "CardLink",
          "props": {
            "title": "Arrakis",
            "href": "/hello/Arrakis"
          }
        },
        {
          "type": "CardLink",
          "props": {
            "title": "Discworld",
            "href": "/hello/Discworld"
          }
        },
        {
          "type": "CardLink",
          "props": {
            "title": "Krypton",
            "href": "/hello/Krypton"
          }
        },
        {
          "type": "CardLink",
          "props": {
            "title": "Magrathea",
            "href": "/hello/Magrathea"
          }
        },
        {
          "type": "CardLink",
          "props": {
            "title": "Vulcan",
            "href": "/hello/Vulcan"
          }
        },
        {
          "type": "CardLink",
          "props": {
            "title": "Pluto",
            "href": "/hello/Pluto"
          }
        }
      ],
      "mode": "bubble",
      "ssrSize": 10,
      "getItem": "planet.getAnotherPlanet"
    }
  }
}
```

</details>

## 10. Well done.

You have completed the introductory tutorial.

More advanced tutorial focusing on some specific aspect of orgasmo will be available.

Meanwhile, you can take a look at the [orgasmo's docs](/), and you are welcome to use the [issues](https://github.com/hacknlove/orgasmoproject/issues) to resolve any trouble.
