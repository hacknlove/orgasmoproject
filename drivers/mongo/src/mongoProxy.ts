import { MongoClient } from "mongodb";
import logger from "@orgasmo/orgasmo/logger";
import config from "@orgasmo/orgasmo/config";

let collections = {};

const mongo: Record<string, any> = {
  connect: async () => {
    if (mongo.db) {
      return mongoProxy;
    }
    if (!mongo.waitfor) {
      maxTries = 10;
      mongo.waitfor = mongoConnect();
    }
    await mongo.waitfor;
    mongo.connecting = null;
    return mongoProxy;
  },
};

const mongoHandler = {
  get: (target, collectionName) => {
    const orgasmoCollection = collections[collectionName];
    if (orgasmoCollection) {
      return target.db.collection(orgasmoCollection);
    }
    if (target[collectionName]) {
      return target[collectionName];
    }
    if (target.db?.[collectionName]) {
      return target.db[collectionName];
    }
    if (target.db?.collection) {
      return target.db.collection(collectionName);
    }

    throw new Error("Not connected. use await mongoProxy.waitfor");
  },
};

let maxTries;

const mongoProxy = new Proxy(mongo, mongoHandler);

export async function mongoConnect() {
  let client;
  const c = config["driver.@orgasmo.mongo"];

  const mongoURL = c.mongoURL;
  collections = c.collections;

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

  return mongoProxy;
}

export default mongoProxy;
