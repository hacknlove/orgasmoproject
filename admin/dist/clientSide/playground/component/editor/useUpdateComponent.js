"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_2 = require("@orgasmo/dynamicstate/react");
function useUpdateComponent(editItemConfig) {
    const storyComponentAreaResource = (0, react_2.useDynamicResource)("var://area/PlaygroundRender_o");
    (0, react_1.useEffect)(() => {
        const json = JSON.parse(editItemConfig);
        storyComponentAreaResource.setValue({
            items: [
                {
                    type: "PlaygroundRenderComponent_o",
                    props: {
                        itemConfig: json,
                    },
                },
            ],
        });
    }, [editItemConfig]);
}
exports.default = useUpdateComponent;
//# sourceMappingURL=useUpdateComponent.js.map