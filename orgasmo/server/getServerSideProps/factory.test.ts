import getServerSidePropsFactory from './factory';

import getRows from "./getRows";
import { serialize } from '../lib/serialization';
import setCookies from '../lib/setCookies';

jest.mock('../lib/setCookies');
jest.mock('./getRows');
jest.mock('../lib/serialization', () => ({
    serialize: jest.fn()
}));

describe('getServerSidePropsFactory', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    }),
    it('returns notFoud if page is not found', async () => {
        const driver = {
            user: {
                getUser: jest.fn().mockResolvedValue(null),
            },
            pages: {
                getPage: jest.fn().mockResolvedValue(null),
            },
        }

        const ctx = {
            req: {},
            res: {},
        }

        const result = await (getServerSidePropsFactory({ driver })(ctx));

        expect(result).toEqual({
            notFound: true,
        });
        expect(driver.pages.getPage).toHaveBeenCalledWith(ctx);
        expect(driver.user.getUser).toHaveBeenCalledWith(ctx);
        // @ts-ignore
        expect(ctx.res.page).toBe(null);
        // @ts-ignore
        expect(ctx.req.user).toBe(null);
    })

    it('redirects if page has field redirect', async () => {
        const driver = {
            user: {
                getUser: jest.fn().mockResolvedValue(null),
            },
            pages: {
                getPage: jest.fn().mockResolvedValue({
                    redirect: '/',
                }),
            },
        }

        const ctx = {
            req: {},
            res: {},
        }

        const result = await (getServerSidePropsFactory({ driver })(ctx));

        expect(result).toEqual({
            redirect: '/',
        });
    })

    it('chooses one if page is an array', async () => {
        const driver = {
            user: {
                getUser: jest.fn().mockResolvedValue({
                    staticRandom: 0
                }),
            },
            pages: {
                getPage: jest.fn().mockResolvedValue([
                    {
                        redirect: 'this',
                    },
                    {
                        redirect: 'that',
                    }
                ]),
            },
        }

        const ctx = {
            req: {},
            res: {},
        }

        expect(await (getServerSidePropsFactory({ driver })(ctx))).toEqual({
            redirect: 'this',
        });

        driver.user.getUser.mockResolvedValue({
            staticRandom: 0.99
        });
        expect(await (getServerSidePropsFactory({ driver })(ctx))).toEqual({
            redirect: 'that',
        });
    })
    it('calls setCookies', async () => {
        const driver = {
            user: {
                getUser: jest.fn().mockResolvedValue(null),
            },
            pages: {
                getPage: jest.fn().mockResolvedValue({
                    cookies: 'cookies-test',
                }),
            },
        }

        const ctx = {
            req: {},
            res: {},
        }

        await (getServerSidePropsFactory({ driver })(ctx));

        expect(setCookies).toHaveBeenCalledWith({ ctx, cookies: 'cookies-test' });
    })
    it('adds a getMore property if page has rowsLimit', async () => {
        const driver = {
            user: {
                getUser: jest.fn().mockResolvedValue({ id: 'user-id-test' }),
            },
            pages: {
                getPage: jest.fn().mockResolvedValue({
                    id: 'page-id-test',
                    getParams: 'foo.getPageParams',
                    rowsLimit: 10,
                }),
            },
            'foo.getPageParams': jest.fn().mockResolvedValue({
                someParams: 'some-params-test',
            })
        }

        const ctx = {
            req: {},
            res: {},
        }

        await (getServerSidePropsFactory({ driver })(ctx));

        expect(driver['foo.getPageParams']).toHaveBeenCalledWith(ctx);

        expect(getRows).toHaveBeenCalledTimes(3);

        expect(getRows).toHaveBeenCalledWith({
            ctx,
            params: {
                someParams: 'some-params-test',
            },
            rows: undefined,
            driver
        });
        expect(getRows).toHaveBeenCalledWith({
            ctx,
            params: {
                someParams: 'some-params-test',
            },
            rows: undefined,
            driver,
            limit: 10,
        });

        expect(serialize).toHaveBeenCalled()
    })
});