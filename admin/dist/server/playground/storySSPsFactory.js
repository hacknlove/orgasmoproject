"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getStoriesList_1 = require("./getStoriesList");
const getPagesList_1 = require("./getPagesList");
function storySSPsFactory({ driver, Components, layout }) {
    return async function getServerSideProps(ctx) {
        if (ctx.query.empty) {
            return {
                props: {
                    exposeSharedState: true,
                    areas: {},
                },
            };
        }
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
                    ...layout,
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
    };
}
exports.default = storySSPsFactory;
//# sourceMappingURL=storySSPsFactory.js.map