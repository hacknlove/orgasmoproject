import events from '../events'
import { serialize } from '../lib/serialization'
import parseCommand from './parseCommand'

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
    }
}

const req = {
    query: {
        c: 'this is not a valid serialized command',
    }
}

const res = {
    json: jest.fn(),
}

describe('parseCommand', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('return an error if the signature is not valid and calls the driver', async () => {


        await parseCommand({ req, res, driver });
        expect(res.json).toHaveBeenCalledWith({
            error: 'bad signed',
        });
        expect(events.emit).toHaveBeenCalledWith('badSigned', { req, command: {
            error: 'Signature is invalid',
        }});
    });
    it('return an error if the signature is expired', async () => {
        const req = {
            query: {
                c: serialize({ expire: 0}),
            },
        };
        await parseCommand({ req, res, driver });
        expect(res.json).toHaveBeenCalledWith({
            error: 'expired signature',
        });
        expect(events.emit).toHaveBeenCalledWith('expiredSignature', { req, command: {
            expire: 0,
        }});
    });
    it('return an error if the user is not the same', async () => {
        const req = {
            query: {
                c: serialize({ userId: 'wrong user'}),
            },
        };
        await parseCommand({ req, res, driver });
        expect(res.json).toHaveBeenCalledWith({
            error: 'wrong user',
        });
        expect(events.emit).toHaveBeenCalledWith('wrongUser', { req, command: {
            userId: 'wrong user',
        }});
    });
    it('returns the parsed command, if everything went ok', async () => {
        const req = {
            query: {
                c: serialize({ userId: 'test-user-id', foo: 'bar',}),
            },
        };
        const response = await parseCommand({ req, res, driver });
        expect(res.json).not.toHaveBeenCalled();
        expect(events.emit).not.toHaveBeenCalled();
        expect(response).toEqual({
            userId: 'test-user-id',
            foo: 'bar',
        });
    });
})