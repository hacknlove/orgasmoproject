# Mongo example

From orgasmoproject root directory.

## Start Mongo

```
docker run --name=orgasmo-example-infinite --rm -p 27017:27017 -d mongo

mongorestore examples/infinite/driver/@orgasmo/mongo/mongodump/
```

```
npm run build -w orgasmo
npm run build -w driver/mongo
ORGASMO_DRIVER=@orgasmo/mongo npm run dev -w examples/infinite
```
