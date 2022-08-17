import { serialize } from "../lib/serialization";

import getRow from "./getRow";
import getMore from "./getMore";

import apiFactory from "./factory";

import events from "../events";


jest.mock('./getRow');
jest.mock('./getMore');

jest.spyOn(console, 'error').mockImplementation(() => {});

jest.mock('../events', () => ({
    __esModule: true,
    default: {
        emit: jest.fn(),
    }
}));

const driver = {
    user: {
        getUser: jest.fn(() => Promise.resolve({ id: 'test-user-id' })),
    },
    security: {
        badSigned: jest.fn(),
        expiredSignature: jest.fn(),
        wrongUser: jest.fn(),
        unknownCommand: jest.fn(),
    },
}

const res = {
    json: jest.fn(),
}


describe("apiFactory", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    }),
    it('returns a function', () => {
        expect(typeof apiFactory({ driver: {} })).toBe('function');
    })
    it('return an error if the signature is not valid and calls the driver', async () => {
        const api = apiFactory({ driver });

        const req = {
            query: {
                c: 'this is not a valid serialized command',
            }
        }
        await api(req, res);
        expect(res.json).toHaveBeenCalledWith({
            error: 'bad signed',
        });
        expect(events.emit).toHaveBeenCalledWith('badSigned', { req, command: {
            error: 'Signature is invalid',
        }});
    })
    it('return an error if the signature is expired', async () => {
        const api = apiFactory({ driver });
        const req = {
            query: {
                c: serialize({ expire: 0}),
            },
        };
        await api(req, res);
        expect(res.json).toHaveBeenCalledWith({
            error: 'expired signature',
        });
        expect(events.emit).toHaveBeenCalledWith('expiredSignature', { req, command: {
            expire: 0,
        }});
    })
    it('return an error if the user is not the same', async () => {
        const api = apiFactory({ driver });
        const req = {
            query: {
                c: serialize({ userId: 'wrong user'}),
            },
        };
        await api(req, res);
        expect(res.json).toHaveBeenCalledWith({
            error: 'wrong user',
        });
        expect(events.emit).toHaveBeenCalledWith('wrongUser', { req, command: {
            userId: 'wrong user',
        }});
    })
    it('returns an error if the command is unknown', async () => {
        const api = apiFactory({ driver });
        const req = {
            query: {
                c: serialize({ userId: 'test-user-id', unknown: 'command'}),
            },
        };
        await api(req, res);
        expect(res.json).toHaveBeenCalledWith({
            error: 'unknown command',
        });
        expect(events.emit).toHaveBeenCalledWith('unknownCommand', { req, command: { userId: 'test-user-id', unknown: 'command'}});
    })
    it('calls getMore if the command is getMore', async () => {
        const api = apiFactory({ driver });
        const req = {
            query: {
                c: serialize({ userId: 'test-user-id', getMore: { handler: 'getMore' }}),
            },
        };
        await api(req, res);
        expect(getMore).toHaveBeenCalledWith({ req, res, command: { handler: 'getMore'}, driver });
    })
    it('calls getRow if the command is getRow', async () => {
        const api = apiFactory({ driver });
        const req = {
            query: {
                c: serialize({ userId: 'test-user-id', getRow: { handler: 'getRow' }}),
            },
        };
        await api(req, res);
        expect(getRow).toHaveBeenCalledWith({ req, res, command: { handler: 'getRow'}, driver });
    })
});