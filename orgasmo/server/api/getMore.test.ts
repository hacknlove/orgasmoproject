import getMore from './getMore';

const res = {
    json: jest.fn(),
}

const req = {
    user: {},
    query: {
        from: '3',
        count: '6'
    }
}

describe('getMore', () => {
    it('calls driver[command.getMore.handler] and waits for it and sends it as json', async () => {
        const driver = {
            ['test.getMore.handler']: jest.fn(() => Promise.resolve({ test: 'ok' })),
        };

        await getMore({
            command: {
                handler: 'test.getMore.handler',
                moreParams: 'test',
            },
            driver,
            res,
            req,
        });
        expect(driver['test.getMore.handler']).toHaveBeenCalledWith({
            from: 3,
            count: 6,
            moreParams: 'test',
        });
        expect(res.json).toHaveBeenCalledWith({ test: 'ok' });
    })

    it('serialized getMore', async () => {
        const driver = {
            ['test.getMore.handler']: jest.fn(() => Promise.resolve({ getMore: { serialice: 'this' } })),
        };

        await getMore({
            command: {
                handler: 'test.getMore.handler',
            },
            driver,
            res,
            req,
        });

        expect(res.json).toHaveBeenCalledWith({ getMore: expect.any(String) });
    })
});