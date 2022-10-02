# orgasmo mongo driver

This driver connects your orgasmo webapp with mongo.

## How to use

Install the driver
```
npm i @orgasmo/mongo
```

Set the environmental variable `ORGASMO_DRIVER=@orgasmo/mongo`

Use the environmental variable `ORGASMO_MONGO_URL` to set the mongo connection url. It defaults to `mongodb://localhost:27017/orgasmo`


Use the environmental variable `ORGASMO_MONGO_PAGES_COLLECTION` to set the mongo collection used to retrieve the pages. It defaults to `pageConfigs`

## Orgasmo's Documentation

[docs.orgasmo.dev](https://docs.orgasmo.dev)