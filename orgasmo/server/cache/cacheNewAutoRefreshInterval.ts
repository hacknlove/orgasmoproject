import { autoRefreshInterval } from "./maps"
import cacheRefresh from './cacheRefresh'

export default function cacheNewAutoRefreshInterval ({ cache, key, driver, item }) {
    const autoRefresh = setInterval(() => cacheRefresh({ cache, key, driver, item }), item.autoRefresh.ms
    )

    autoRefreshInterval.set(key, autoRefresh)
}
