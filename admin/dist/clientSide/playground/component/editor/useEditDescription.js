"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useEditDescription(original, file) {
    const [value, setValue] = (0, react_1.useState)(original);
    const isDirty = (0, react_1.useMemo)(() => original !== value, [value, original]);
    file.monaco.defaultValue = value;
    file.monaco.onChange = setValue;
    file.edit = {
        value,
        isDirty,
        setValue,
        prepareToSend: () => value,
    };
    return file.edit;
}
exports.default = useEditDescription;
//# sourceMappingURL=useEditDescription.js.map