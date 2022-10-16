# orgasmo

To enable the orgasmo's Admin panel

## How to

1. add the admin page at any route

```
// file pages/admin.js

import DComponent, { Components } from "../DComponent";
import driver from "../driver";
import PageFactory from "@orgasmo/orgasmo/PageFactory";
import storySSPsFactory from "@orgasmo/admin/storySSPsFactory";

export default PageFactory({ DComponent });

export const getServerSideProps = storySSPsFactory({ driver, Components });
```

2. Include the admin driver in the environmental variable

   a. When starting orgasmo

```
ORGASMO_DRIVER=admin,yourOtherDrivers,... npm run dev
```

    b. or, at next.config.js

```
process.env.ORGASMO_DRIVER=`admin,${ORGASMO_DRIVER}`

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const withOrgasmo = require("@orgasmo/orgasmo/withOrgasmo")();

module.exports = withOrgasmo(nextConfig);
```

## Documentation

[docs.orgasmo.dev](https://docs.orgasmo.dev)

To build the styles:

```
npx nodemon -e css ../build-tools/dist/scss/build.js ./ ./dist/style.css
```

to build the drivers:

```
npx nodemon ../build-tools/dist/driver/build.js --ignore src/driver/driver.ts src/driver/
```

# TODO

add those to the dev script
