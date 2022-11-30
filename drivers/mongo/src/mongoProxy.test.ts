/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { MongoClient } from "mongodb";
import mongoProxy from "./mongoProxy";

const db = jest.fn(() => ({}));
const on = jest.fn();

jest.mock("mongodb", () => ({
  __esModule: true,
  MongoClient: {
    connect: jest.fn(() => ({
      db,
      on,
    })),
  },
}));

describe("mongoProxy", () => {
  beforeEach(() => {
    mongoProxy.db = null;
    mongoProxy.waitfor = null;
  });
  it("passes the mongoURL parameter to MongoClient", async () => {
    await mongoProxy.connect("someTestUrl");
    expect(MongoClient.connect).toBeCalledWith("someTestUrl");
  });
  it("does not connect twice", async () => {
    await mongoProxy.connect();
    await mongoProxy.connect();
    await mongoProxy.connect();
    await mongoProxy.connect();
    expect(MongoClient.connect).toBeCalledTimes(1);
  });

  it("returns db[something] if exists", async () => {
    await mongoProxy.connect();
    mongoProxy.db.foo = "foo";

    expect(mongoProxy.foo).toBe("foo");
  });

  it("returns the collection if db exists", async () => {
    await mongoProxy.connect();
    mongoProxy.db.collection = jest.fn(() => "bar collection");

    expect(mongoProxy.bar).toBe("bar collection");
  });
  it("creates a collection proxy when using it without being connected", async () => {
    expect(mongoProxy.someCollection.someMethod).toBeInstanceOf(Function);

    const method = jest.fn();
    db.mockReturnValue({
      someCollection: {
        someMethod: method,
      },
    });

    method.mockRejectedValue;

    await mongoProxy.someCollection.someMethod("parameters");

    expect(method).toBeCalledWith("parameters");
  });
  it("on deconnection deletes the db so it connects again next query", async () => {
    await mongoProxy.connect();
    expect(MongoClient.connect).toBeCalledTimes(1);
    await mongoProxy.connect();
    expect(MongoClient.connect).toBeCalledTimes(1);

    expect(on).toBeCalled();

    expect(on.mock.calls[0][0]).toBe("connectionClosed");
    on.mock.calls[0][1]();

    await mongoProxy.connect();
    expect(MongoClient.connect).toBeCalledTimes(2);
  });
  it("connect retries 10 times", async () => {
    jest.spyOn(process, "exit").mockImplementation(() => undefined);
    jest.spyOn(console, "error").mockImplementation(() => undefined);
    MongoClient.connect.mockRejectedValue("fail");

    await mongoProxy.connect();
    expect(MongoClient.connect).toBeCalledTimes(11);
  });
});
