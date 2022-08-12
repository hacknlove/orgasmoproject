import nookies from 'nookies';

import setCookies from './setCookies';

jest.mock('nookies', () => {
    return {
        default: {
            set: jest.fn(),
            get: jest.fn(),
            remove: jest.fn(),
        }
    };
});

describe('setCookies', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })
   it('does nothing is cookies is falsy', () => {
        setCookies({ cookies: null, ctx: null });
        expect(nookies.set).not.toHaveBeenCalled();
    })

    it('does nothing is cookies is an empty array', () => {
        setCookies({ cookies: [], ctx: null });
        expect(nookies.set).not.toHaveBeenCalled();
    })

    it('calls nookies.set once if cookies is not an array', () => {
        setCookies({ cookies: {
            name: 'test-name',
            value: 'test-value',
            options: {},
        }, ctx: null });

        expect(nookies.set).toHaveBeenCalledTimes(1);
        expect(nookies.set).toHaveBeenCalledWith(null, 'test-name', 'test-value', {});
    })
    it('calls nookies.set once per each cookie in the cookies array', () => {
        setCookies({ cookies: [
            {
                name: 'test-name',
                value: 'test-value',
                options: {},
            },
            {
                name: 'test-name-2',
                value: 'test-value-2',
                options: {},
            },
        ], ctx: null });

        expect(nookies.set).toHaveBeenCalledTimes(2);
        // @ts-ignore
        expect(nookies.set.mock.calls[0]).toEqual([null, 'test-name', 'test-value', {}]);
        // @ts-ignore
        expect(nookies.set.mock.calls[1]).toEqual([null, 'test-name-2', 'test-value-2', {}]);

    })
})