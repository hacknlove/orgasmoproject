"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResource = void 0;
const var_1 = require("./var");
class ApiResource extends var_1.VarResource {
    constructor(url, { endpoint, headers, debounce = 0, interval, defaultError, skipFirst, ...options }, plugin) {
        super(url, options);
        this.plugin = plugin;
        this.fetchOptions = {
            endpoint: endpoint ?? url.replace(/^api:\/\//, ""),
            headers,
            defaultError,
        };
        this.debounce = debounce;
        this.interval = interval;
        if (!skipFirst) {
            this.refresh(0);
        }
    }
    set endpoint(url) {
        this.fetchOptions.endpoint = url;
        this.refresh();
    }
    set headers(headers) {
        this.fetchOptions.headers = headers;
        this.refresh();
    }
    async refresh(debounce) {
        if (this.debounced) {
            clearTimeout(this.debounced);
        }
        if (debounce === 0) {
            this.value = await this.plugin.GET(this.fetchOptions.endpoint, {
                headers: this.headers,
                defaultError: this.defaultValue,
            });
            if (this.interval) {
                setTimeout(this.refresh.bind(this), this.interval, 0);
            }
            return;
        }
        this.debounced = setTimeout(this.refresh.bind(this), debounce || this.debounce, 0);
    }
}
exports.ApiResource = ApiResource;
class ApiPlugin {
    constructor(sharedContext) {
        this.sharedContext = sharedContext;
        this.defaultError = { ok: false };
    }
    newResource(url, options) {
        return new ApiResource(url, options, this);
    }
    async GET(url, options) {
        return this.sharedContext.fetch(url, {
            headers: options.headers,
        });
    }
}
exports.default = ApiPlugin;
ApiPlugin.protocol = "api";
//# sourceMappingURL=api.js.map