import nookies from 'nookies'

export default function getStaticRandom (ctx) {
    if (ctx.req.user.staticRandom !== undefined) {
        return ctx.req.user.staticRandom
    }

    const cookies = nookies.get(ctx)

    if (cookies.o_sr) {
        return parseFloat(cookies.o_sr)
    }

    const random = Math.random() * 0.9999 // in a progresive deployment, if the total weight is 10000 and the latest weight is 1, the latest will never be chosen randomly. It will only be delivered to users with a manually set static random of 0.9999 or greater (always smaller than 1).

    nookies.set(ctx, 'o_sr', random.toString(), {
        maxAge: 60 * 60 * 24 * 365,
        path: '/',
        httpOnly: true,
    })

    if (ctx.req.user) {
        ctx.req.user.staticRandom = random
    }
    
    return random
}