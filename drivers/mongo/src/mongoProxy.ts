import { MongoClient } from "mongodb";
import logger from "@orgasmo/orgasmo/logger";

let mongoURL;

const mongo: Record<string, any> = {
  connect: async (newMongoUrl?) => {
    if (mongo.db) {
      return;
    }
    if (!mongo.waitfor) {
      maxTries = 10;
      mongo.waitfor = mongoConnect(newMongoUrl);
    }
    await mongo.waitfor;
    mongo.connecting = null;
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

export async function mongoConnect(newMongoUrl?) {
  let client;

  mongoURL ??= newMongoUrl;

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
  delete mongo.waitfor;

  client.on("connectionClosed", () => {
    delete mongo.db;
    mongo.connect();
  });
}

export default mongoProxy;
