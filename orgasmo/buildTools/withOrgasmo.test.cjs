jest.mock('./processType.cjs', () => jest.fn(() => jest.fn(() => 'processType')))

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

const processType = require('./processType.cjs')
const withOrgasmo = require('./withOrgasmo.cjs')

describe('withOrgasmo', () => {
    beforeEach(() => {
        jest.resetModules()
        jest.clearAllMocks()
    }),

    it('calls processType for all the types with the right parameters', async () => {
        await (withOrgasmo({
            scss: 'scss param',
            driver:  'driver param',
            components: 'components param',
        })())()

        expect(processType.mock.calls[0][0]).toEqual({
            type: 'scss',
            isEnabled: 'scss param',
            isDevelopmentServer: false,
        })
        expect(processType.mock.calls[1][0]).toEqual({
            type: 'driver',
            isEnabled: 'driver param',
            isDevelopmentServer: false,
        })
        expect(processType.mock.calls[2][0]).toEqual({
            type: 'components',
            isEnabled: 'components param',
            isDevelopmentServer: false,
        })
    })
    it('in development phase,  isDevelopmentServer is true', async () => {
        await (withOrgasmo({
            scss: 'scss param',
            driver:  'driver param',
            components: 'components param',
        })())(PHASE_DEVELOPMENT_SERVER)

        expect(processType.mock.calls[0][0]).toEqual({
            type: 'scss',
            isEnabled: 'scss param',
            isDevelopmentServer: true,
        })
        expect(processType.mock.calls[1][0]).toEqual({
            type: 'driver',
            isEnabled: 'driver param',
            isDevelopmentServer: true,
        })
        expect(processType.mock.calls[2][0]).toEqual({
            type: 'components',
            isEnabled: 'components param',
            isDevelopmentServer: true,
        })
    })
    it('all types default to true', async () => {
        await (withOrgasmo()())()

        expect(processType.mock.calls[0][0]).toEqual({
            type: 'scss',
            isEnabled: true,
            isDevelopmentServer: false,
        })
        expect(processType.mock.calls[1][0]).toEqual({
            type: 'driver',
            isEnabled: true,
            isDevelopmentServer: false,
        })
        expect(processType.mock.calls[2][0]).toEqual({
            type: 'components',
            isEnabled: true,
            isDevelopmentServer: false,
        })
    })
})