import { parse } from '../lib/serialization'
import getRow from './getRow'
import getMore from './getMore'

import events from '../events'

export default function apiFactory({ driver }) {
    return async (req, res) => {
        const userPromise = driver.user.getUser({ req, res })
        const command  = parse(req.query.c)

        if (command.error === 'Signature is invalid') {
            events.emit('badSigned', { req, command })

            return res.json({
                error: 'bad signed',
            })
        }

        const { userId, expire } = command;

        if (expire < Date.now()) {
            events.emit('expiredSignature', { req, command })

            return res.json({
                error: 'expired signature',
            })
        }

        const user = req.user = await userPromise

        if (user.id !== userId) {
            events.emit('wrongUser', { req, command })

            return res.json({
                error: 'wrong user',
            })
        }

        if (command.getMore) {
            return getMore({ req, res, command: command.getMore, driver })
        }

        if (command.getRow) {
            return getRow({ req, res, command: command.getRow, driver })
        }

        events.emit('unknownCommand', { req, command })

        return res.json({
            error: 'unknown command',
        })
    }
}