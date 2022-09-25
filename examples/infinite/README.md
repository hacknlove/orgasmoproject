This is a small example of a orgasmo application to be used by the e2e tests.

You can also use it as simple reference, taking a look at the comments on the files, and readmes on the folders.

## How to run it

```bash
git clone git@github.com:hacknlove/orgasmoproject.git

cd orgasmoproject

npm i

npm run build -w orgasmo
npm run build -w drivers/json

npm run dev -w examples/[name]
```

## How to run iw with other drivers

Check the readme of the driver.

- [mongo](drivers/%40orgasmo/mongo/)
- [strapi](drivers/%40orgasmo//strapi/)
