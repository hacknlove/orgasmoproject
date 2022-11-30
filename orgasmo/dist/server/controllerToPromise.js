"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function controllerToPromise(controller) {
    return (req, res) => {
        return new Promise((resolve, reject) => {
            controller(req, res, (error) => {
                if (error) {
                    return reject(error);
                }
                resolve(undefined);
            });
        });
    };
}
exports.default = controllerToPromise;
//# sourceMappingURL=controllerToPromise.js.map