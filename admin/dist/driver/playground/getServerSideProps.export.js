"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getStoriesList_1 = require("./getStoriesList");
const getPagesList_1 = require("../../driver/playground/getPagesList");
const getKVStorageList_1 = require("./getKVStorageList");
const config_1 = require("@orgasmo/orgasmo/config");
async function getServerSideProps(ctx) {
    const adminRole = config_1.default['drivers.@orgasmo.admin.role'];
    console.log(adminRole);
    console.log(ctx.req.user.roles);
    if (adminRole &&
        !ctx.req.user.roles.includes(adminRole)) {
        return {
            notFound: 404,
            props: {},
        };
    }
    if (ctx.query.empty) {
        return {
            props: {
                exposeSharedState: true,
                areas: {},
            },
        };
    }
    const Components = ctx.Components;
    const driver = ctx.drivers;
    const [stories, pages, KVStorages] = await Promise.all([
        (0, getStoriesList_1.default)({ driver, Components }),
        (0, getPagesList_1.default)({ driver }),
        (0, getKVStorageList_1.default)({ driver }),
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
                            type: "KVStorageList_o",
                            props: {
                                KVStorages,
                            },
                        },
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