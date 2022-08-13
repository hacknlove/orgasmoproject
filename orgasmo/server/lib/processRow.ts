export default async function processRow ({ rowConfig, params, driver }) {
    const row = {
        type: rowConfig.type,
        props: rowConfig.props ?? {}
    }

    if(driver[rowConfig.getProps]) {
        row.props = {
            ...row.props,
            ...await driver[rowConfig.getProps]({
                rowConfig,
                params
            })
        }
    }

    return row
}