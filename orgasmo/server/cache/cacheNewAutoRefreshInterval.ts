import { autoRefreshInterval } from "./maps"
import cacheRefresh from './cacheRefresh'

export default function cacheNewAutoRefreshInterval ({ ctx, key, item }) {
    const autoRefresh = setInterval(() => cacheRefresh({ ctx, key, item }), item.autoRefresh.ms
    )

    autoRefreshInterval.set(key, autoRefresh)
}
