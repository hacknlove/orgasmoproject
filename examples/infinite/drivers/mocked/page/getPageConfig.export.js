import pages from './pages'
export default function getPageConfig (ctx) {
    return pages[ctx.params?._o[0] ?? '/']
}