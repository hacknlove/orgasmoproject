import seedrandom from 'seedrandom'

export default function choseOne({ array, staticRandom }) {
    if(array.length === 0) {
        return null
    }
    if (array[0].randomSeed) {
        const random = new seedrandom(staticRandom + array[0].randomSeed)
        staticRandom = random()
    }

    if (array[0].ratio !== undefined) {
        const weight = staticRandom * array.reduce((total, item) => total + item.ratio, 0)
    
        let sum = 0
        for (let i = 0; i < array.length; i++) {
            sum += array[i].ratio
            if (sum >= weight) {
                return array[i]
            }
        }
    }
    
    return array[Math.floor(staticRandom * array.length)]   
}