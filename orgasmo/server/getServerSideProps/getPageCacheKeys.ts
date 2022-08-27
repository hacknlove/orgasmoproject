import { cencode } from 'cencode'
export default async function* getPageCacheKeys({ driver, ctx }) {
    const methods = await driver.page.allParameterMethods?.(ctx) ?? []
    for (const method of methods) {
        yield cencode(await driver[method](ctx))
    }

    yield [cencode({ params: ctx.params, roles: ctx.req.user.roles })]
}