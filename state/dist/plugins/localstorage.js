"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onChange = void 0;
const PROTOCOLCUT = "localStorage://".length;
if (typeof setImmediate === "function") {
    global.localStorage = {};
}
function parseIfPossible(value) {
    try {
        return JSON.parse(value);
    }
    catch (e) {
        return value;
    }
}
function onChange(resource) {
    if (!global.addEventListener || !global.removeEventListener) {
        return;
    }
    function listener() {
        if (localStorage[resource.key] === JSON.stringify(resource.value)) {
            return;
        }
        resource.value = parseIfPossible(localStorage[resource.key]);
        Object.values(resource.callbacks).forEach((cb) => cb(resource.value));
    }
    global.addEventListener("storage", listener);
    return () => {
        global.removeEventListener("storage", listener);
    };
}
exports.onChange = onChange;
const plugin = {
    name: "localStorage",
    regex: /^localStorage:\/\/./i,
    refresh(resource) {
        return parseIfPossible(localStorage[resource.key]);
    },
    getResource(resource) {
        resource.unsubscribeStorage = onChange(resource);
        resource.key = resource.url.substr(PROTOCOLCUT);
        if (localStorage[resource.key] !== undefined) {
            resource.value = parseIfPossible(localStorage[resource.key]);
            return;
        }
        if (resource.value === undefined) {
            return;
        }
        localStorage[resource.key] = JSON.stringify(resource.value);
    },
    get(url) {
        return parseIfPossible(localStorage[url.substr(PROTOCOLCUT)]);
    },
    set(resource) {
        if (resource === undefined) {
            return delete localStorage[resource.key];
        }
        localStorage[resource.key] = JSON.stringify(resource.value);
    },
    clean(resource) {
        resource.unsubscribeStorage && resource.unsubscribeStorage();
    },
    start() {
        global.localStorage = {};
    },
};
exports.default = plugin;
//# sourceMappingURL=localstorage.js.map