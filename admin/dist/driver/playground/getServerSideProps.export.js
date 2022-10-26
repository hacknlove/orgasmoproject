"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getStoriesList_1 = require("./getStoriesList");
const getPagesList_1 = require("../../driver/playground/getPagesList");
async function getServerSideProps(ctx) {
    if (ctx.query.empty) {
        return {
            props: {
                exposeSharedState: true,
                areas: {},
            },
        };
    }
    console.log("THIS");
    const Components = ctx.Components;
    const driver = ctx.driver;
    const [stories, pages] = await Promise.all([
        (0, getStoriesList_1.default)({ driver, Components }),
        (0, getPagesList_1.default)({ driver }),
    ]);
    const response = {
        props: {
            clientSideOnly: true,
            layout: {
                name: "PlayGroundMainLayout_o",
                meta: [["title", "Orgasmo's playground"]],
            },
            areas: {
                MainLayout_nav_o: {
                    items: [
                        {
                            type: "PagesList_o",
                            props: {
                                pages,
                            },
                        },
                        {
                            type: "Storieslist_o",
                            props: {
                                stories,
                            },
                        },
                    ],
                },
                PlaygroundTitle_o: {
                    items: [
                        {
                            type: "h1",
                            props: {
                                children: ["Orgasmo's Playground"],
                            },
                        },
                    ],
                },
            },
        },
    };
    return response;
}
exports.default = getServerSideProps;
//# sourceMappingURL=getServerSideProps.export.js.map