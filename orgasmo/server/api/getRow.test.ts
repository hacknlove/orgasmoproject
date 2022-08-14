import getRow from "./getRow";
import processRow from "../lib/processRow";


const ctx = {
    req: {
    },
    res: {
        json: jest.fn(),
    },
}

describe("getRow", () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    it('calls driverpages.getRow to get the row', async () => {
        const driver = { pages: { getRow: jest.fn() } };
        const command = 'getRow-test';

        
        await getRow({ ...ctx, req: { query: { n: 4 } }, command, driver });

        expect(driver.pages.getRow).toHaveBeenCalledTimes(1);
        expect(driver.pages.getRow).toHaveBeenCalledWith({ getRow: command, number: 4 });
        expect(ctx.res.json).toHaveBeenCalledTimes(1);
        expect(ctx.res.json).toHaveBeenCalledWith(null);
    })

    it('chooses one if the row is an array', async () => {
        const driver = { pages: { getRow: jest.fn(() => [{ type: 'test-1' }, { type: 'test-2' }]) } };
        const command = 'getRow-test';

        
        await getRow({ ...ctx, req: { user: { staticRandom: 0 }, query: { n: 4 } }, command, driver });

        expect(ctx.res.json).toHaveBeenCalledWith({ type: 'test-1', props: {} });
        ctx.res.json.mockReset()
        await getRow({ ...ctx, req: { user: { staticRandom: 0.9 }, query: { n: 4 } }, command, driver });
        expect(ctx.res.json).toHaveBeenCalledWith({ type: 'test-2', props: {} });
    })
})