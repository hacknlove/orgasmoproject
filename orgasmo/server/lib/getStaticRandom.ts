import nookies from 'nookies'

export default function getStaticRandom (ctx) {
    if (ctx.req.user?.staticRandom) {
        return ctx.req.user.staticRandom
    }

    const cookies = nookies.get(ctx)

    if (cookies.o_sr) {
        return parseFloat(cookies.o_sr)
    }

    const random = Math.random()

    nookies.set(ctx, 'o_sr', random.toString(), {
        maxAge: 60 * 60 * 24 * 365,
        path: '/',
        httpOnly: true,
    })

    ctx.req.user = random
    
    return random
}