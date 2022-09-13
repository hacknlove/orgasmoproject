export default function itemHeader(config) {
    console.log(config)
    return {
        text: `${config.params.parsedPath.string} - ${config.params.parsedPath.number}`
    }
}