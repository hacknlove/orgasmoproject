import pages from './pages'
export default function getPage (ctx) {
    return pages[ctx.params?.orgasmo[0] ?? '/']
}