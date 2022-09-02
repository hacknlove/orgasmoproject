import { autoRefreshInterval, expireTimeout, nextRevalidation } from './maps'

describe('maps', () => {
    it('autoRefreshInterval is a map', () => {
        expect(autoRefreshInterval).toBeInstanceOf(Map)
    })
    it('expireTimeout is a map', () => {
        expect(expireTimeout).toBeInstanceOf(Map)
    })
    it('nextRevalidation is a map', () => {
        expect(nextRevalidation).toBeInstanceOf(Map)
    })
})