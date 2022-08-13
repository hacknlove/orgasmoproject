const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
const withTM = require('next-transpile-modules')(['orgasmo']);

const processType = require('./processType.cjs')

module.exports = ({
    scss = true,
    driver = true,
    components = true
} = {}) => cb => async (phase, ...other) => {
    const isDevelopmentServer = phase === PHASE_DEVELOPMENT_SERVER
    await Promise.all([
        {
            type: 'scss',
            isEnabled: scss,
            isDevelopmentServer
        },
        {
            type: 'driver',
            isEnabled: driver,
            isDevelopmentServer
        },
        {
            type: 'components',
            isEnabled: components,
            isDevelopmentServer
        },
    ].map(processType))

    if (cb instanceof Function) {
        return withTM(await cb(phase, ...other))
    }
    return withTM(cb)
}