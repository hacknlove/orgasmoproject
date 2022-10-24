"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const AsyncComponents_1 = require("@orgasmo/orgasmo/AsyncComponents");
const react_1 = require("react");
const router_1 = require("next/router");
const Prompt_1 = require("../../modals/Prompt");
const path_to_regexp_1 = require("path-to-regexp");
const Alert_1 = require("../../modals/Alert");
const cencode_1 = require("cencode");
function PlaygroundSelectPathSample_o({ pathSamples, patternPath, }) {
    const router = (0, router_1.useRouter)();
    const [regexpPath, matchPath] = (0, react_1.useMemo)(() => [(0, path_to_regexp_1.pathToRegexp)(patternPath), (0, path_to_regexp_1.match)(patternPath)], [patternPath]);
    const [customPaths, setCustomPaths] = (0, react_1.useState)([]);
    async function onChange(event) {
        let value = event.target.value;
        if (value === "custom_o") {
            value = await (0, AsyncComponents_1.default)(Prompt_1.default, { title: "New sample path", pattern: regexpPath.toString() }, "playgroundModal_o");
            if (!value) {
                return;
            }
            if (regexpPath.test(value)) {
                setCustomPaths([...customPaths, value]);
            }
        }
        const parsedPath = matchPath(value);
        window.testthis = {
            parsedPath,
            value,
        };
        if (!parsedPath) {
            return (0, AsyncComponents_1.default)(Alert_1.default, { title: "Error", text: "The path does not match the pattern" }, "playgroundModal_o");
        }
        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                pathSample: value,
                parsedPath: (0, cencode_1.cencode)(parsedPath.params),
            },
        });
    }
    return ((0, jsx_runtime_1.jsxs)("select", { value: router.query.pathSample, onChange: onChange, children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Choose a path" }), pathSamples.map((pathSample) => ((0, jsx_runtime_1.jsx)("option", { value: pathSample, children: pathSample }, pathSample))), customPaths.map((pathSample) => ((0, jsx_runtime_1.jsx)("option", { value: pathSample, children: pathSample }, pathSample))), (0, jsx_runtime_1.jsx)("option", { value: "custom_o", children: "add custom sample path" })] }));
}
exports.default = PlaygroundSelectPathSample_o;
//# sourceMappingURL=PlaygroundSelectPathSample_o.dynamic.js.map