"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const seedrandom_1 = require("seedrandom");
const getStaticRandom_1 = require("../lib/getStaticRandom");
function choseOne({ array, ctx }) {
    if (array.length === 0) {
        return null;
    }
    let staticRandom = (0, getStaticRandom_1.default)(ctx);
    const randomSeed = array.find((a) => a.randomSeed)?.randomSeed;
    if (randomSeed) {
        staticRandom = new seedrandom_1.default(staticRandom + randomSeed)();
    }
    if (array[0].ratio !== undefined) {
        const weight = staticRandom *
            array.reduce((total, item) => total + (item.ratio ?? 0), 0);
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += array[i].ratio;
            if (sum >= weight) {
                return array[i];
            }
        }
    }
    return array[Math.floor(staticRandom * array.length)];
}
exports.default = choseOne;
//# sourceMappingURL=chooseOne.js.map