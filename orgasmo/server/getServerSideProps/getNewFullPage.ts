import { cencode } from 'cencode';
import expandPage from './expandPage';

export async function getNewFullPage({ driver, cache, ctx }) {
    const pageConfig = await driver.page.getPage()

    
    if (!pageConfig) {
        return null
    }

    const params = pageConfig.getParams ? await driver[pageConfig.getParams](ctx) : { params: ctx.params, roles: ctx.req.user.roles }

    const key = cencode(params)

    const page = await expandPage({ ctx, driver, pageConfig, params, key })
}

