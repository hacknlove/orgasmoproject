import choseOne from "./chooseOne";
import seedrandom from "seedrandom";

const random = jest.fn(() => 0.5)

jest.mock("seedrandom", () => ({
    default: jest.fn().mockImplementation(() => random)
}));

describe('choseOne', () => {
    it('generates a random number seeded with staticRandom and randomSeed if the first element of the array has randomSeed', () => {
        const array = [{ randomSeed: 'test', ratio: 1 }, { ratio: 1 }, { ratio: 1 }];
        const staticRandom = 0.9;
        choseOne({ array, staticRandom });
        expect(seedrandom).toHaveBeenCalledWith(staticRandom + 'test');
    })

    it('returns the element that correspond with staticRandom', () => {
        const array = Array.from({ length: 10, }, (_, i) => i)
 
        expect(choseOne({ array, staticRandom: 0.5 })).toEqual(5);
        expect(choseOne({ array, staticRandom: 0.99 })).toEqual(9);
        expect(choseOne({ array, staticRandom: 0 })).toEqual(0);
    })
    it('some edge cases', () => {
        choseOne({array: [], staticRandom: NaN })
        choseOne({array: [{ratio: 1}], staticRandom: NaN })
    })
})