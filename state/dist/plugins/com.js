"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComResource = void 0;
const var_1 = require("./var");
class ComResource extends var_1.VarResource {
    constructor(url, { computation = () => undefined, urls = [], ...options } = {}, sharedContext) {
        super(url, options);
        this.urls = [];
        this.sharedContext = sharedContext;
        this.crossSubcriptions = [];
        this.addUrls(urls);
        this.addComputation(computation);
    }
    addUrls(urls) {
        this.urls = urls;
        this.crossSubcriptions.forEach((subscription) => subscription());
        this.crossSubcriptions = this.urls.map((url) => this.sharedContext.onChange(url, this.recompute.bind(this)));
    }
    addComputation(computation) {
        this.computation = computation;
        this.recompute(this.value, this);
    }
    recompute(value, resource) {
        const newValue = this.computation(this.sharedContext.proxy, value, resource);
        if (newValue !== undefined) {
            this.value = newValue;
        }
        return newValue;
    }
    removeComputation() {
        this.computation = () => {
            undefined;
        };
    }
}
exports.ComResource = ComResource;
class ComPlugin {
    constructor(sharedContext) {
        this.sharedContext = sharedContext;
    }
    newResource(url, options) {
        return new ComResource(url, options, this.sharedContext);
    }
}
exports.default = ComPlugin;
ComPlugin.protocol = "com";
//# sourceMappingURL=com.js.map