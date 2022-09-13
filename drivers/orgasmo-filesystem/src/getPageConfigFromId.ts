import { waitForIt, ids } from './parseDirectory'

export default async function getPageConfigFromIdFactory(pageId) {
    await waitForIt
    return ids.get(pageId)
}