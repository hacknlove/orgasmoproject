export default async function getUser({ driver, ctx }) {
    if (ctx.req.user) {
        return ctx.req.user
    }

    if (driver.user?.getUser) {
        return driver.user.getUser(ctx)
    }

    return {
        roles: undefined
    }
}