import pages from './pages'

export default function getPageFromId(config) {
    return pages[config.pageId]
}