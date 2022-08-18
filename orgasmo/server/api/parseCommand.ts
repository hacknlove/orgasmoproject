import events from '../events'
import { parse } from '../lib/serialization'

export default async function parseCommand ({ req, res, driver }) {
    const command = parse(req.query.c)

    if (command.error === 'Signature is invalid') {
        events.emit('badSigned', { req, command })

        res.json({
            error: 'bad signed',
        })
        return
    }

    const { userId, expire } = command;

    if (expire < Date.now()) {
        events.emit('expiredSignature', { req, command })

        return res.json({
            error: 'expired signature',
        })
    }

    const user = req.user || (req.user = await driver.user.getUser({ req, res }))

    if (user.id !== userId) {
        events.emit('wrongUser', { req, command })

        return res.json({
            error: 'wrong user',
        })
    }

    return command
}