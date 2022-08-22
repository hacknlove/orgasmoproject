export default {
    '/': {
        id: '/',
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
        getRow: 'home.getRow',
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
                type: 'Header',
                props: {
                    text: 'Basic Layout test'
                }
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
    },
    horizontalscroll: {
        id: 'horizontalscroll',
        top: [
            {
                type: 'Header',
                props: {
                    text: 'Horizontal Scroll test'
                }
            }
        ],
        rows: [
            {
                type: 'Row',
                props: {
                    title: 'Horizontal Scroll'
                },
                getProps: 'secuential.rows',
            }
        ],
    },
    verticalscroll: {
        id: 'verticalscroll',
        top: [
            {
                type: 'Header',
                props: {
                    text: 'Vertical Scroll test'
                }
            }
        ],
        rows: [
            {
                type: 'Item',
                props: {
                    string: 'world hello',
                    number: 0,
                },
            },
            {
                type: 'Item',
                props: {
                    string: 'mars hello',
                    number: 1,
                },
            },
            {
                type: 'Item',
                props: {
                    string: 'jupiter hello',
                    number: 2,
                },
            },
            {
                type: 'Item',
                props: {
                    string: 'saturno hello',
                    number: 3,
                },
            },

        ],
        rowsLimit: 4,
        getRow: 'verticalscroll.getRow',
    },
}