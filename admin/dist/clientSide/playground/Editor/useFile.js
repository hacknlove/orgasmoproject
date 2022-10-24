"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@orgasmo/dynamicstate/react");
const react_2 = require("react");
function useFile() {
    const sharedState = (0, react_1.useDynamicState)();
    (0, react_2.useEffect)(() => sharedState.onChange("var://activeFilepath_o", async (filePath) => {
        if (!filePath) {
            return;
        }
        let originalContent = sharedState.getValue(`var://file${filePath}?original`);
        const force = originalContent === ' "reset" ';
        if (!originalContent || force) {
            originalContent = await fetch(`/api/_oadmin/playGround/getFile`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    filePath,
                }),
            })
                .then((r) => r.json())
                .catch((error) => ({ error }))
                .then((json) => JSON.stringify(json, null, 4));
            sharedState.setValue(`var://file${filePath}?original`, originalContent);
        }
        let fileContent = sharedState.getValue(`var://file${filePath}?content`);
        if (!fileContent || force) {
            fileContent = originalContent;
            sharedState.setValue(`var://file${filePath}?content`, originalContent);
        }
    }), []);
}
exports.default = useFile;
//# sourceMappingURL=useFile.js.map