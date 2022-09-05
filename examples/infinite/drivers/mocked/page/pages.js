import getItemConfig from "../vertical/getItemConfig.export"

const pages = {
    '/': {
        id: '/',
        header: [
            {
                type: 'Header',
                props: {
                    text: 'Index'
                }
            },
            {
                type: "Index",
                props: {
                    links: {
                        '/both': 'Vertical scroll + horizontal slider.',
                        '/vertical': 'Vertical scroll.',
                        '/horizontal': 'Horizontal slider.',
                    }
                }
            }
        ],
        main: [
            {
                type: 'Item',
                props: {
                    string: 'Infinite',
                    number: 42,
                    className: 'fullWidth'
                },
            },
        ],
        footer: [
            {
                type: "Index",
                props: {
                    links: {
                        '/both': 'Vertical scroll + horizontal slider.',
                        '/vertical': 'Vertical scroll.',
                        '/horizontal': 'Horizontal slider.',
                    }
                }
            },
        ]
    }, 
    both: {
        id: 'both',
        header: [
            {
                type: 'Header',
                props: {
                    text: 'Vertical scroll + horizontal slider',
                    home: true,
                }
            },
            {
                type: "Index",
                props: {
                    links: {
                        '/vertical': 'Vertical scroll.',
                        '/horizontal': 'Horizontal slider.',
                    }
                }
            },
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
        getItemConfig: 'both.getItemConfig',
        mainSsrSize: 2,
        footer: [
            {
                type: "Index",
                props: {
                    links: {
                        '/both': 'Vertical scroll + horizontal slider.',
                        '/vertical': 'Vertical scroll.',
                        '/horizontal': 'Horizontal slider.',
                    }
                }
            }
        ]
    },
    horizontal: {
        id: 'horizontal',
        header: [
            {
                type: 'Header',
                props: {
                    text: 'Horizontal Scroll test',
                    home: true,
                }
            },
            {
                type: "Index",
                props: {
                    links: {
                        '/both': 'Vertical scroll + horizontal slider.',
                        '/vertical': 'Vertical scroll.',
                    }
                }
            },
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
        footer: [
            {
                type: "Index",
                props: {
                    links: {
                        '/both': 'Vertical scroll + horizontal slider.',
                        '/vertical': 'Vertical scroll.',
                        '/horizontal': 'Horizontal slider.',
                    }
                }
            }
        ]
    },
    vertical: {
        id: 'vertical',
        header: [
            {
                type: 'Header',
                props: {
                    text: 'Vertical Scroll test',
                    home: true,
                }
            },
            {
                type: "Index",
                props: {
                    links: {
                        '/both': 'Vertical scroll + horizontal slider.',
                        '/horizontal': 'Horizontal slider.',
                    }
                }
            },
        ],
        main: [
            getItemConfig({ number: 0 }),
            getItemConfig({ number: 1 }),
            getItemConfig({ number: 2 }),
            getItemConfig({ number: 3 }),
        ],
        mainSsrSize: 4,
        getItemConfig: 'vertical.getItemConfig',
    },
    item: {
        id: 'item',
        header: [{
            type: 'Header',
            props: {
                home: true
            },
            getProps: 'item.header'
        },
        {
            type: "Index",
            props: {
                links: {
                    '/both': 'Vertical scroll + horizontal slider.',
                    '/vertical': 'Vertical scroll.',
                    '/horizontal': 'Horizontal slider.',
                }
            }
        }],
        main: [
            {
                type: 'Item',
                props: {
                    className: 'fullWidth'
                },
                getProps: 'item.main'
            },
            
        ],
        footer: [
            {
                type: "Index",
                props: {
                    links: {
                        '/both': 'Vertical scroll + horizontal slider.',
                        '/vertical': 'Vertical scroll.',
                        '/horizontal': 'Horizontal slider.',
                    }
                }
            }
        ]
    }
}

export default pages;