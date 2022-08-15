export default function getPage () {
    return {
        id: 'home',
        pre: [
            {
                type: 'Header'
            }
        ],
        rows: [
            {
                type: 'Row',
                props: {
                    title: 'Row #1'
                },
                getProps: 'random.rows',
                seed: 'first'
            },
            {
                type: 'Row',
                props: {
                    title: 'Row #2'
                },
                getProps: 'random.rows',
                seed: 'second'
            },
            {
                type: 'Row',
                props: {
                    title: 'Row #3'
                },
                getProps: 'random.rows',
                seed: 'third'
            },

        ],
        rowsLimit: 2,
        post: [
            {
                type: 'Footer'
            }
        ]
    }
}