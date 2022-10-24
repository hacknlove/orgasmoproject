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
const react_2 = require("@orgasmo/dynamicstate/react");
function Select({ data, setContent, filePath }) {
    const [regexpPath, matchPath] = (0, react_1.useMemo)(() => [(0, path_to_regexp_1.pathToRegexp)(data.patternPath), (0, path_to_regexp_1.match)(data.patternPath)], [data]);
    const [pathParams, setPathParams] = (0, react_2.useDynamicValue)(`var://file${filePath}?params`);
    async function onChange(event) {
        let value = event.target.value;
        if (value === " add ") {
            value = await (0, AsyncComponents_1.default)(Prompt_1.default, { title: "New sample path", pattern: regexpPath.toString() }, "playgroundModal_o");
            if (!value) {
                return;
            }
            if (regexpPath.test(value)) {
                data.pathSamples ?? (data.pathSamples = []);
                setContent(JSON.stringify({
                    ...data,
                    pathSamples: [...data.pathSamples, value]
                }, null, 4));
            }
        }
        const parsedPath = matchPath(value);
        if (!parsedPath) {
            return (0, AsyncComponents_1.default)(Alert_1.default, { title: "Error", text: "The path does not match the pattern" }, "playgroundModal_o");
        }
        setPathParams({
            path: value,
            params: parsedPath.params
        });
    }
    return ((0, jsx_runtime_1.jsxs)("select", { value: pathParams?.path, onChange: onChange, children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Choose a path" }), data.pathSamples?.map?.((pathSample) => ((0, jsx_runtime_1.jsx)("option", { value: pathSample, children: pathSample }, pathSample))), (0, jsx_runtime_1.jsx)("option", { value: " add ", children: "add custom sample path" })] }));
}
function SelectPathSample({ filePath }) {
    const [content, setContent] = (0, react_2.useDynamicValue)(`var://file/${filePath}?content`);
    const data = (0, react_1.useMemo)(() => {
        try {
            return JSON.parse(content);
        }
        catch { }
    }, [content]);
    if (!data?.patternPath) {
        return null;
    }
    return (0, jsx_runtime_1.jsx)(Select, { data: data, setContent: setContent, filePath: filePath });
    const router = (0, router_1.useRouter)();
    const [customPaths, setCustomPaths] = (0, react_1.useState)([]);
    async function onChange(event) {
        let value = event.target.value;
        if (value === " add ") {
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
    if (!data.pathSamples) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)("select", { value: router.query.pathSample, onChange: onChange, children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Choose a path" }), pathSamples.map((pathSample) => ((0, jsx_runtime_1.jsx)("option", { value: pathSample, children: pathSample }, pathSample))), customPaths.map((pathSample) => ((0, jsx_runtime_1.jsx)("option", { value: pathSample, children: pathSample }, pathSample))), (0, jsx_runtime_1.jsx)("option", { value: " add ", children: "add custom sample path" })] }));
}
exports.default = SelectPathSample;
//# sourceMappingURL=SelectPathSample..js.map