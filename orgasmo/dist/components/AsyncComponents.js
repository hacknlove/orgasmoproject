"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncComponents = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const children = new Set();
let i = 0;
function asyncit(Component, props = {}, area) {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });
    promise.resolve = resolve;
    promise.reject = reject;
    promise.props = props;
    promise.area = area;
    promise.Component = Component;
    promise.key = i++;
    children.add(promise);
    promise.finally(() => {
        children.delete(promise);
        AsyncComponents.forceUpdate();
    });
    AsyncComponents.forceUpdate();
    return promise;
}
exports.default = asyncit;
AsyncComponents.forceUpdate = () => {
};
function AsyncComponents({ area }) {
    const [, forceUpdate] = (0, react_1.useReducer)((x) => x + 1, 0);
    AsyncComponents.forceUpdate = forceUpdate;
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: Array.from(children).map((promise) => area === promise.area && ((0, jsx_runtime_1.jsx)(promise.Component, { ...promise.props, resolve: promise.resolve, reject: promise.reject }, promise.key))) }));
}
exports.AsyncComponents = AsyncComponents;
//# sourceMappingURL=AsyncComponents.js.map