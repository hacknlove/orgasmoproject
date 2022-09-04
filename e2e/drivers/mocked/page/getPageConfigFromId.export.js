import pages from './pages'

export default function getPageConfigFromId(pageId) {
    return pages[pageId]
}