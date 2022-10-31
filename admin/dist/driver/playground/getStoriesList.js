"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Components_1 = require("../../clientSide/Components");
async function getStoriesList({ driver, Components }) {
    const stories = (await driver?.admin?.getAllStories?.()?.catch(() => ({}))) || {};
    for (const key in Components) {
        if (Components_1.default[key]) {
            continue;
        }
        if (!stories[key]) {
            stories[key] = {
                empty: {
                    description: `Create the first story for the component ${key}`,
                },
            };
        }
    }
    return stories;
}
exports.default = getStoriesList;
//# sourceMappingURL=getStoriesList.js.map