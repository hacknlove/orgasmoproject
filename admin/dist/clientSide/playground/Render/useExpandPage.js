"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@orgasmo/dynamicstate/react");
const AsyncComponents_1 = require("@orgasmo/orgasmo/AsyncComponents");
const react_2 = require("react");
const Alert_1 = require("../../modals/Alert");
async function updateProps({ filePath, fileContent, pathParams, setProps }) {
    if (!filePath || !fileContent) {
        return;
    }
    fileContent = JSON.parse(fileContent);
    if (fileContent.patternPath && !pathParams) {
        return;
    }
    if (fileContent.error) {
        return;
    }
    const props = await fetch("/api/_oadmin/playGround/expand", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            fileContent,
            filePath,
            pathParams,
        }),
    })
        .then((r) => r.json())
        .catch((error) => ({ error }));
    if (props.error) {
        return (0, AsyncComponents_1.default)(Alert_1.default, props.error, "playgroundModal_o");
    }
    if (props.props) {
        setProps(props.props);
    }
}
function setValues({ sharedState, props }) {
    for (const key of Array.from(sharedState.resources.keys())) {
        if (key === "var://Components") {
            continue;
        }
        sharedState.setValue(key, null);
    }
    sharedState.setValue("var://layout", props.layout);
    const areasNames = [];
    for (const areaName in props.areas) {
        areasNames.push(areaName);
        sharedState.setValue(`var://area/${areaName}`, props.areas[areaName]);
    }
    sharedState.setValue("var://areasNames", areasNames);
}
function resetState(sharedState) {
    sharedState.setValue("var://areasNames", []);
    for (const key of Array.from(sharedState.resources.keys())) {
        if (key === "var://Components") {
            continue;
        }
        if (key === "var://areasNames") {
            continue;
        }
        sharedState.setValue(key, null);
    }
}
function useExpandPage({ sharedState, filePath, fileContent, pathParams, }) {
    const [props, setProps] = (0, react_1.useDynamicValue)(`var://file${filePath}?props`);
    (0, react_2.useEffect)(() => {
        updateProps({
            filePath,
            fileContent,
            pathParams,
            setProps,
        });
    }, [filePath, fileContent, pathParams, setProps]);
    (0, react_2.useEffect)(() => {
        if (!sharedState) {
            return;
        }
        if (!props) {
            return resetState(sharedState);
        }
        setValues({ sharedState, props });
    }, [props, sharedState]);
}
exports.default = useExpandPage;
//# sourceMappingURL=useExpandPage.js.map