export default function itemMain (config) {
    return {
        string: config.params.params._o[1],
        number: parseInt(config.params.params._o[2])
    }
}