import cleanJson, { cleanAwaitJson, withCleanJson } from "./cleanJson";

describe("cleanJson", () => {
    it('returns null if obj is null or undefined', () => {
        expect(cleanJson(null)).toBeNull();
        expect(cleanJson(undefined)).toBeNull();
    })

    it('converts dates to ISOstrings', () => {
        const date = new Date();
        expect(cleanJson(date)).toBe(date.toISOString());
    })
    it('converts to hexString if the object has the method', () => {
        const obj = {
            toHexString: () => "0x123"
        }
        expect(cleanJson(obj)).toBe("0x123");
    })
    it('processes arrays', () => {
        const arr = [undefined, new Date(0), { toHexString: () => "0x123" }, "test"];
        expect(cleanJson(arr)).toEqual([
            null,
            "1970-01-01T00:00:00.000Z",
            "0x123",
            "test"
        ]);
    })
    it('processes objects', () => {
        const obj = {
            a: undefined,
            b: new Date(0),
            c: { toHexString: () => "0x123" },
            d: "test",
            e: [undefined, new Date(0), { toHexString: () => "0x123" }, "test"]
        }
        expect(cleanJson(obj)).toEqual({
            a: null,
            b: "1970-01-01T00:00:00.000Z",
            c: "0x123",
            d: "test",
            e: [
                null,
                "1970-01-01T00:00:00.000Z",
                "0x123",
                "test"
            ]
        });
    })
})

describe("cleanAwaitJson", () => {
    it('returns null if obj is null or undefined', async () => {
        expect(await cleanAwaitJson(null)).toBeNull();
        expect(await cleanAwaitJson(undefined)).toBeNull();
    })

    it('converts dates to ISOstrings', async () => {
        const date = new Date();
        expect(await cleanAwaitJson(date)).toBe(date.toISOString());
    })
    it('converts to hexString if the object has the method', async () => {
        const obj = {
            toHexString: () => "0x123"
        }
        expect(await cleanAwaitJson(obj)).toBe("0x123");
    })
    it('processes arrays', async () => {
        const arr = [undefined, new Date(0), { toHexString: () => "0x123" }, "test"];
        expect(await cleanAwaitJson(arr)).toEqual([
            null,
            "1970-01-01T00:00:00.000Z",
            "0x123",
            "test"
        ]);
    })
    it('processes objects', async () => {
        const obj = {
            a: undefined,
            b: new Date(0),
            c: { toHexString: () => "0x123" },
            d: "test",
            e: [undefined, new Date(0), { toHexString: () => "0x123" }, "test"]
        }
        expect(await cleanAwaitJson(obj)).toEqual({
            a: null,
            b: "1970-01-01T00:00:00.000Z",
            c: "0x123",
            d: "test",
            e: [
                null,
                "1970-01-01T00:00:00.000Z",
                "0x123",
                "test"
            ]
        });
    })
    it('processes promises', async () => {
        const obj = Promise.resolve({
            a: undefined,
            b: new Date(0),
            c: { toHexString: () => "0x123" },
            d: Promise.resolve("test"),
            e: [undefined, new Date(0), Promise.resolve({ toHexString: () => "0x123" }), "test"]
        })
        expect(await cleanAwaitJson(obj)).toEqual({
            a: null,
            b: "1970-01-01T00:00:00.000Z",
            c: "0x123",
            d: "test",
            e: [
                null,
                "1970-01-01T00:00:00.000Z",
                "0x123",
                "test"
            ]
        });
    })
})

describe("withCleanJson", () => {
    it('returns a getServerSideProps function', () => {
        const getServerSideProps = withCleanJson(() => ({}));
        expect(typeof getServerSideProps).toBe("function");
    })
    it('cleans the json of the response of the callback', async () => {
        const getServerSideProps = withCleanJson(() => ({
            props: {
                a: undefined,
                b: Promise.resolve(new Date(0)),
                c: { toHexString: () => "0x123" },
                d: "test",
                e: [undefined, new Date(0), { toHexString: () => "0x123" }, "test"]
            }
        }));
        expect(await getServerSideProps({})).toEqual({
            props: {
                a: null,
                b: "1970-01-01T00:00:00.000Z",
                c: "0x123",
                d: "test",
                e: [
                    null,
                    "1970-01-01T00:00:00.000Z",
                    "0x123",
                    "test"
                ]
            }
        });
    })
    it('keep props as undefined if undefined', async () => {
        const getServerSideProps = withCleanJson(() => ({
            props: undefined
        }));
        expect(await getServerSideProps({})).toEqual({
            props: undefined
        });
    })
    it('does not run cleanAwaitJson if ctx is tagged as already done', async () => {
        const getServerSideProps = withCleanJson(() => ({
            props: {
                a: undefined,
                b: Promise.resolve(new Date(0)),
            }
        }));
        const ctx = {
            jsonCleaned: true
        }
        expect(await getServerSideProps(ctx)).toEqual({
            props: {
                a: undefined,
                b: Promise.resolve(new Date(0)),
            }
        });
    })
})