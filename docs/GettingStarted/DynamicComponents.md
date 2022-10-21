# Dynamic Components

If you open the directory `components` of your new orgasmo application, you will see many  filenames end with `.dynamic.jsx`.

This is the method we use to tell orgasmo that we want those components to be used dynamically.

Let's take a look at [`components/Description.dynamic.jsx`](https://github.com/hacknlove/orgasmoproject/blob/main/create-orgasmo/empty/components/Description.dynamic.jsx)

```js
export default function Description({ text, source }) {
  return (
    <div className="row">
      <p className="description">
        {text} <code className="code">{source}</code>
      </p>
    </div>
  );
}
```

As you can see, there is nothing special about this React component.

But because its name matches the pattern `.dynamic.{jsx,tsx}`, orgasmo will consider it dynamic and will render **Component** from a JSON like **itemConfig**:


**Component**
```jsx
<Description text="Take a look at" "source"= "drivers/@orgasmo/json/data/pages/index.json" />
```

**itemConfig**
```json
{
  "type": "Description",
  "props": {
    "text": "Take a look at",
    "source": "drivers/@orgasmo/json/data/pages/index.json"
  }
}
```

## Rules

To create Dynamic components, you need to follow these 1 rules:

1. The file name should end in `.dynamic.{jsx,tsx}`.
2. The name of the Dynamic component is the rest of the filename, and should be unique.
3. The Component should be default exported.

## Area

The Area component renders all the dynamic components of an area.

The usual place for an `Area` component is the layout of the page, but `Area` components can be used anywhere.


Take a look at [`components/Layout.dynamic.jsx`](https://github.com/hacknlove/orgasmoproject/blob/main/create-orgasmo/empty/components/Layout.dynamic.jsx#L12)

```jsx
import Head from "next/head";
import Area from "@orgasmo/orgasmo/Area";

export default function Layout() {
  return (
    <div className="container">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <Area name="header" />
        <div className="grid">
          <Area name="main" />
        </div>
      </main>

      <footer className="footer">
        <Area name="footer" />
      </footer>
    </div>
  );
}
```


---

This is all you need to know to start creating your dynamic frontend side.

Let's not take a look at the [drivers](GettingStarted/Drivers.md)


