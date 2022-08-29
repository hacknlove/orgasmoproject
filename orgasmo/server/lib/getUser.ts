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

    ctx.req.user =  await ctx.driver.user.getUser(ctx).catch(error => {
        events.emit('error', {
            type: 'driver',
            method: 'user.getUser',
            params: [ctx],
            error
        }) 
    }) ?? {
        roles: []
    }

    if (!ctx.req.user.roles) {
        ctx.req.user.roles = []
    }
}