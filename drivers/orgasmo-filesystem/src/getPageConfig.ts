import { waitForIt, paths } from "./parseDirectory";

export default  async function getPageConfig(ctx) {
    await waitForIt
    const resolvedPath = ctx.resolvedUrl.replace(/\?.*$/, "");

    for (const [path, { match, pageConfig }] of paths) {
        if (path === resolvedPath) {
            ctx.parsedPath = {} 
            return pageConfig 
        }
        const matched = match(resolvedPath)
        if (matched) {
            ctx.parsedPath = matched.params
            return pageConfig 
        }
    }
}