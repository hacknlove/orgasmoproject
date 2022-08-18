import getRow from './getRow'
import getMore from './getMore'
import apiCall from './apiCall'

export default function apiFactory({ driver }) {
    return async (req, res) => {
        switch (req.query.orgasmo[0]) {
            case '_ogr':
                return getRow({ driver, req, res })
            case '_ogm':
                return getMore({ driver, req, res })
            default:
                return apiCall({ driver, req, res })
        }
    }
}