"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoConnect = void 0;
const mongodb_1 = require("mongodb");
const logger_1 = require("@orgasmo/orgasmo/logger");
const config_1 = require("@orgasmo/orgasmo/config");
let collections = {};
const mongo = {
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
        throw new Error('Not connected. use await mongoProxy.waitfor');
    },
};
let maxTries;
const mongoProxy = new Proxy(mongo, mongoHandler);
async function mongoConnect() {
    let client;
    const c = config_1.default['drivers.@orgasmo.mongo'];
    const mongoURL = c.mongoURL;
    collections = c.collections;
    try {
        client = await mongodb_1.MongoClient.connect(mongoURL);
    }
    catch (err) {
        if (maxTries--) {
            return mongoConnect();
        }
        logger_1.default.error(err, "Error connecting with mongo");
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
exports.mongoConnect = mongoConnect;
exports.default = mongoProxy;
//# sourceMappingURL=mongoProxy.js.map