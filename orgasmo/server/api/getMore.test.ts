import getMore from './getMore';

describe('getMore', () => {
    it('calls driver[command.getMore.handler] and waits for it and sends it as json', async () => {
        const driver = {
            ['test.getMore.handler']: jest.fn(() => Promise.resolve({ test: 'ok' })),
        };
        const res = {
            json: jest.fn(),
        }
        const req = {
            query: {
                from: '3',
                count: '6'
            }
        }

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
});