"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const equal = require("fast-deep-equal");
function useEditItemConfig(original, file) {
    const [value, setValueOriginal] = (0, react_1.useState)(JSON.stringify(original, null, 2));
    const isDirty = (0, react_1.useMemo)(() => !equal(original, JSON.parse(value)), [value, original]);
    file.edit = {
        value,
        isDirty,
        setValue: (value) => {
            try {
                JSON.parse(value);
                setValueOriginal(value || "");
            }
            catch {
            }
        },
        prepareToSend: () => JSON.parse(value),
    };
    file.monaco.defaultValue = value;
    file.monaco.onChange = file.edit.setValue;
    return file.edit;
}
exports.default = useEditItemConfig;
//# sourceMappingURL=useEditPageConfig.js.map