import getRow from "./getRow";
import parseCommand from "./parseCommand";

jest.mock("./parseCommand", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const res = {
    json: jest.fn(),
};

describe("getRow", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    it('does nothing if there is no command', async () => {
        await getRow({ req: {}, res, driver: {} });
        (parseCommand as jest.Mock).mockReturnValue({});

        expect(res.json).not.toHaveBeenCalled();
    })

    it('calls driver.page.getRow to get the row', async () => {
        const driver = { page: { getRow: jest.fn() } };
        (parseCommand as jest.Mock).mockReturnValue({ pageId: 'getRow-test' });
        
        await getRow({ req: { query: { n: 4 } }, res, driver });

        expect(driver.page.getRow).toHaveBeenCalledTimes(1);
        expect(driver.page.getRow).toHaveBeenCalledWith({ pageId: 'getRow-test', number: 4 });
        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith(null);
    })

    it('chooses one if the row is an array', async () => {
        const driver = { page: { getRow: jest.fn(() => [{ type: 'test-1' }, { type: 'test-2' }]) } };
        
        await getRow({ req: { user: { staticRandom: 0 }, query: { n: 4 } }, driver, res });

        expect(res.json).toHaveBeenCalledWith({ type: 'test-1', props: {} });
        res.json.mockReset()
        await getRow({ req: { user: { staticRandom: 0.9 }, query: { n: 4 } }, res, driver });
        expect(res.json).toHaveBeenCalledWith({ type: 'test-2', props: {} });
    })

    it('serializes props.getMore if defined', async () => {
        const driver = { page: { getRow: jest.fn(() => ({ type: 'test-1', props: { getMore: { handler: 'test' } } })) } };

        await getRow({ req: { user: { staticRandom: 0.9 }, query: { n: 4 } }, res, driver });

        expect(res.json.mock.calls[0][0]).toEqual({ type: 'test-1', props: {
            getMore: expect.any(String)
        } });
    })
})