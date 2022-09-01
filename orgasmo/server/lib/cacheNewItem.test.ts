/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import cacheNewItem from './cacheNewItem'

import cacheNewAutoRefreshInterval from "../cache/cacheNewAutoRefreshInterval";
import cacheNewExpirationTimeout from "../cache/cacheNewExpirationTimeout";
import { nextRevalidation } from "../cache/maps";

jest.mock("../cache/cacheNewAutoRefreshInterval", () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock("../cache/cacheNewExpirationTimeout", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe ('cacheNewItem', () => {
    let ctx
    let key
    let item
    beforeEach(() => {
        ctx = {
            cache: new Map()
        }
        key = expect.getState().currentTestName
        item = {
            timeChunk: {}
        }
    })
    it('does nothing if item.noCache', () => {
        item.noCache = true
        cacheNewItem({ ctx, item, key })
        expect(ctx.cache.has(key)).toBeFalsy()
    })
    it('does nothing if ctx.noCache', () => {
        ctx.noCache = true
        cacheNewItem({ ctx, item, key })
        expect(ctx.cache.has(key)).toBeFalsy()
    })
    it('does nothing if not item.timeChunk', () => {
        item.timeChunk = undefined
        cacheNewItem({ ctx, item, key })
        expect(ctx.cache.has(key)).toBeFalsy()
    })
    it('caches otherwise', () => {
        cacheNewItem({ ctx, item, key })
        expect(ctx.cache.get(key)).toBe(item)
    })
    it('calls cacheNewExpirationTimeout', () => {
        cacheNewItem({ ctx, item, key })
        expect(cacheNewExpirationTimeout).toBeCalled()
    })
    it('calls cacheNewAutoRefreshInterval if item.autoRefresh', () => {
        item.autoRefresh = {}
        cacheNewItem({ ctx, item, key })
        expect(cacheNewAutoRefreshInterval).toBeCalled()
    })
    it('calls cacheNewAutoRefreshInterval if item.autoRefresh', () => {
        item.autoRefresh = {}
        cacheNewItem({ ctx, item, key })
        expect(cacheNewAutoRefreshInterval).toBeCalled()
    })
    it('adds a revalidation time it item.revalidate', () => {
        item.revalidate = 'someMethod'
        cacheNewItem({ ctx, item, key })
        expect(nextRevalidation.has(key)).toBeTruthy()
    })

})