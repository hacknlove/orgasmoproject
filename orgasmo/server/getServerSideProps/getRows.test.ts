import getRows from "./getRows";
import chooseOne from "../lib/chooseOne";
import processRow from "../lib/processRow";
import setCookies from "../lib/setCookies";
import { serialize } from "../lib/serialization";

jest.mock('../lib/chooseOne');
jest.mock('../lib/processRow');
jest.mock('../lib/setCookies');
jest.mock('../lib/serialization', () => ({
    serialize: jest.fn(),
}));

describe("getRows", () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })
    it('retursn empty array if rows is falsy', async () => {
        const rows = await getRows({ rows: undefined, params: {}, ctx: {}, driver: {} });
        expect(rows).toEqual([]);
    })
    it('calls processRow for each row and return the array of responses', async () => {
        const rows = Array.from({ length: 5 }, (_, i) => `row${i}`);

        // @ts-ignore
        processRow.mockImplementation(async ({ rowConfig }) => ({ props: { row: true, test: rowConfig  } }));

        const response = await getRows({ rows, params: {}, ctx: {}, driver: {} });

        expect(processRow).toHaveBeenCalledTimes(5);

        expect(response).toEqual([
            { props: { row: true, test: 'row0' } },
            { props: { row: true, test: 'row1' } },
            { props: { row: true, test: 'row2' } },
            { props: { row: true, test: 'row3' } },
            { props: { row: true, test: 'row4' } },
        ]);
    })

    it('stops when reaching the limit', async () => {
        const rows = Array.from({ length: 5 }, (_, i) => `row${i}`);

        // @ts-ignore
        processRow.mockImplementation(async ({ rowConfig }) => ({ props: { row: true, test: rowConfig  } }));

        const response = await getRows({ rows, params: {}, ctx: {}, driver: {}, limit: 3 });

        expect(processRow).toHaveBeenCalledTimes(3);

        expect(response).toEqual([
            { props: { row: true, test: 'row0' } },
            { props: { row: true, test: 'row1' } },
            { props: { row: true, test: 'row2' } },
        ]);
    })
    it('calls setCookies for each row', async () => {
        const rows = Array.from({ length: 5 }, (_, i) => `row${i}`);

        (processRow as jest.Mock).mockImplementation(async ({ rowConfig }) => ({ props: { row: true, test: rowConfig  } }));

        await getRows({ rows, params: {}, ctx: {}, driver: {} });

        expect(setCookies).toHaveBeenCalledTimes(5);
    })
    it('choosesOne if a row is and array', async () => {
        const rows = [
            [{}],
            [{}],
        ];

        (chooseOne as jest.Mock).mockImplementation(({ array }) => array[0]);

        await getRows({ rows, params: {}, ctx: {}, driver: {} });
        expect(chooseOne).toHaveBeenCalledTimes(2);
    })
    it('serializes the getMore property', async () => {
        const rows = [
            { props: { getMore: {}, test: true } },
        ];

        (processRow as jest.Mock).mockImplementation(async ({ rowConfig }) => ( rowConfig ));
        (serialize as jest.Mock).mockImplementation(getMore => getMore);

        await getRows({ rows, params: {}, ctx: { req: { user: { id: 'test-user-id' } }}, driver: {} });
        expect(rows[0].props.getMore).toEqual({
            getMore: {},
            expire:  expect.any(Number),
            userId: 'test-user-id',
        });
    })
    it('edge case, user not there', async () => {
        const rows = [
            { props: { getMore: {}, test: true } },
        ];

        (processRow as jest.Mock).mockImplementation(async ({ rowConfig }) => ( rowConfig ));
        (serialize as jest.Mock).mockImplementation(getMore => getMore);

        await getRows({ rows, params: {}, ctx: { req: {} }, driver: {} });
        expect(rows[0].props.getMore).toEqual({
            getMore: {},
            expire:  expect.any(Number),
            userId: undefined,
        });
    })
})