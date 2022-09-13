
export default function RandomRows ({ from = 0, count = 15 }) {
    return {
        items: Array.from({ length: count }, (_, i) => ({
            key: from + i,
            string: `${from + i}rowtesting.`,
            number: from + i,
        })),
        getMore: {
            handler: 'secuential.rows',
        }
    }
}