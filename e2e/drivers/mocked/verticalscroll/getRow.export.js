export default function getRow ({number}) {
    return {
        type: 'Item',
        props: {
            string: `${Math.sin(number).toString(32).replace(/^-?0?.?/, '')} planet hello`,
            number,
        },
    }
}