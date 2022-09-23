import { expandArea } from "./area"

export default async function expandAreas ({ ctx, areasConfig, params, timeChunk }) {
    if (!areasConfig) {
        return {}
    }
    const response = {}
    for (const name of Object.keys(areasConfig)) {
        response[name] = expandArea({ ctx, params, areaConfig: areasConfig[name], timeChunk })
    }
    return response
}