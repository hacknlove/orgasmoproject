import getRow from "../verticalscroll/getRow.export"

export default {
    '/': {
        page: {
            id: '/',
            top: [
                {
                    type: 'Header',
                    props: {
                        text: 'Home recargar'
                    }
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
        }
    },
    basiclayout: {
        page: {
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
        }
    },
    horizontalscroll: {
        page: {
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
        }
    },
    verticalscroll: {
        page: {
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
                getRow({ number: 0 }),
                getRow({ number: 1 }),
                getRow({ number: 2 }),
                getRow({ number: 3 }),
            ],
            rowsLimit: 4,
            getRow: 'verticalscroll.getRow',
        }
    },
}