export default {
    '/': {
        id: 'home',
        top: [
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
        bottom: [
            {
                type: 'Footer'
            }
        ]
    },
    basiclayout: {
        id: 'basiclayout',
        top: [
            {
                type: 'Header'
            }
        ],
        rows: [
            {
                type: 'Item',
                props: {
                    string: 'Hello world',
                    number: 5,
                    className: 'fullWidth'
                },
            },

        ],
        bottom: [
            {
                type: 'Footer'
            }
        ]
    }
}