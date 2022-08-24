export default function getRow ({number}) {
    return {
        type: 'Item',
        props: {
            string: `${Math.sin(number+0.1).toString(32).replace(/^-?0?.?/, '')}${Math.sin(number+1).toString(32).replace(/^-?0?.?/, '')}`,
            number,
        },
    }
}