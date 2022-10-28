import { MongoClient } from "mongodb";
import logger from "@orgasmo/orgasmo/logger";

const mongoURL =
  (process.env.ORGASMO_MONGO_URL as string) ??
  "mongodb://localhost:27017/orgasmo";

const mongo: Record<string, any> = {
  connect: async () => {
    if (mongo.db) {
      return;
    }
    maxTries = 10;
    await mongoConnect();
  },
};

const mongoHandler = {
  get: (target, collectionName) => {
    if (target[collectionName]) {
      return target[collectionName];
    }
    if (target.db?.[collectionName]) {
      return target.db[collectionName];
    }
    if (target.db?.collection) {
      return target.db.collection(collectionName);
    }

    return new Proxy({ collectionName }, collectionHandler);
  },
};

const collectionHandler = {
  get: ({ collectionName }, method) => {
    const target: Record<string, any> = new Function();

    target.collectionName = collectionName;
    target.method = method;
    return new Proxy(target, methodHandler);
  },
};

const methodHandler = {
  apply: async ({ collectionName, method }, thisArg, argumentList) => {
    await mongo.connect();
    return mongoProxy[collectionName][method](...argumentList);
  },
};

let maxTries;

const mongoProxy = new Proxy(mongo, mongoHandler);

async function mongoConnect() {
  let client;

  try {
    client = await MongoClient.connect(mongoURL);
  } catch (err) {
    if (maxTries--) {
      return mongoConnect();
    }
    logger.error(err, "Error connecting with mongo");
    return process.exit(1);
  }

  mongo.client = client;
  mongo.db = client.db();

  client.on("connectionClosed", () => {
    delete mongo.db;
  });
}

export default mongoProxy;
