
import items from './items.json'

export default function getItemConfig(config) {
    return items[config.relative]

}