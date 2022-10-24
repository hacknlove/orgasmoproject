"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_2 = require("@orgasmo/dynamicstate/react");
function useUpdateComponent(editPageConfig) {
    const storyComponentAreaResource = (0, react_2.useDynamicResource)("var://area/PlaygroundRender_o");
    (0, react_1.useEffect)(() => {
        const json = JSON.parse(editPageConfig);
        storyComponentAreaResource.setValue({
            items: [
                {
                    type: "PlaygroundRender_o",
                    props: {
                        pageConfig: json,
                        pathSample: json.exactPath,
                    },
                },
            ],
        });
    }, [editPageConfig]);
}
exports.default = useUpdateComponent;
//# sourceMappingURL=useUpdateComponent.js.map