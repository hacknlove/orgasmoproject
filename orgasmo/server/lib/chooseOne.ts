import seedrandom from "seedrandom";
import getStaticRandom from "../lib/getStaticRandom";

export default function choseOne({ array, ctx }) {
  if (array.length === 0) {
    return null;
  }

  let staticRandom = getStaticRandom(ctx)
  
  const randomSeed = array.find((a) => a.randomSeed)?.randomSeed;

  if (randomSeed) {
    staticRandom = new seedrandom(staticRandom + randomSeed)();
  }

  if (array[0].ratio !== undefined) {
    const weight =
      staticRandom * array.reduce((total, item) => total + item.ratio, 0);

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
