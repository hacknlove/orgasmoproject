
import rows from './rows.json'

export default function getRow(config) {
    return rows[config.relative]

}