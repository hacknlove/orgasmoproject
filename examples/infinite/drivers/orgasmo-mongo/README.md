
## Before Start
```
docker run --name=orgasmo-example-infinite --rm -p 27017:27017 -d mongo

mongorestore examples/infinite/drivers/orgasmo-mongo/mongodump/
```

## Start example from the project root with
```
ORGASMO_DRIVER=orgasmo-mongo npm run dev -w examples/infinite
```

## After end
```
docker stop orgasmo-example-infinite
```