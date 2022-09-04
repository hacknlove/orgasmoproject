import getItemConfig from "../verticalscroll/getItemConfig.export"

const pages = {
    '/': {
        id: '/',
        header: [
            {
                type: 'Header',
                props: {
                    text: 'Home'
                }
            }
        ],
        main: [
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
        getItemConfig: 'home.getItemConfig',
        mainSsrSize: 2,
        footer: [
            {
                type: 'Footer'
            }
        ]
    },
    basiclayout: {
        id: 'basiclayout',
        header: [
            {
                type: 'Header',
                props: {
                    text: 'Basic Layout test'
                }
            }
        ],
        main: [
            {
                type: 'Item',
                props: {
                    string: 'Hello world',
                    number: 5,
                    className: 'fullWidth'
                },
            },
            
        ],
        footer: [
            {
                type: 'Footer'
            }
        ]
    },
    horizontalscroll: {
        id: 'horizontalscroll',
        header: [
            {
                type: 'Header',
                props: {
                    text: 'Horizontal Scroll test'
                }
            }
        ],
        main: [
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
        header: [
            {
                type: 'Header',
                props: {
                    text: 'Vertical Scroll test'
                }
            }
        ],
        main: [
            getItemConfig({ number: 0 }),
            getItemConfig({ number: 1 }),
            getItemConfig({ number: 2 }),
            getItemConfig({ number: 3 }),
        ],
        mainSsrSize: 4,
        getItemConfig: 'verticalscroll.getItemConfig',
    },
}

export default pages;