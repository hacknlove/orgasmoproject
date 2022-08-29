import events from "../events"

export default async function getUser(ctx) {
    if (ctx.req.user) {
        return
    }

    if (!ctx.driver.user?.getUser) {
        ctx.req.user = {
            roles: []
        }
        return
    }
    try {
        ctx.req.user =  await ctx.driver.user.getUser(ctx) ?? {
            roles: []
        }
    } catch (error) {
        events.emit('error', {
            type: 'driver',
            method: 'user.getUser',
            params: [ctx],
            error
        })
        ctx.req.user = {
            roles: []
        }
    }

    if (!ctx.req.user.roles) {
        ctx.req.user.roles = []
    }
}