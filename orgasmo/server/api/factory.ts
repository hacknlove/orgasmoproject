import { parse } from '../lib/serialization'
import getRow from './getRow'
import getMore from './getMore'

export default function apiFactory({ driver }) {
    return async (req, res) => {
        const userPromise = driver.user.getUser({ req, res })
        const command  = parse(req.query.c)

        if (command.error === 'Signature is invalid') {
            driver.security?.badSigned?.({ req, command })
            return res.json({
                error: 'bad signed',
            })
        }

        const { userId, expire } = command;

        if (expire < Date.now()) {
            driver.security?.expiredSignature?.({ req, command })

            return res.json({
                error: 'expired signature',
            })
        }

        const user = req.user = await userPromise

        if (user.id !== userId) {
            res.json({
                error: 'wrong user',
            })

            driver.security?.wrongUser?.({ req, command })
            return
        }

        if (command.getMore) {
            return getMore({ req, res, command: command.getMore, driver })
        }

        if (command.getRow) {
            return getRow({ req, res, command: command.getRow, driver })
        }

        driver.security?.unknownCommand?.({ req, command })

        return res.json({
            error: 'unknown command',
        })
    }
}