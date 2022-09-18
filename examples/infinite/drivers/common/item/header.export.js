export default function itemHeader(config) {
    return {
        text: `${config.params.parsedPath.string} - ${config.params.parsedPath.number}`
    }
}