declare function getUser(ctx: any): {
    roles: any;
} | undefined;
declare const driver: {
    user: {
        getUser: typeof getUser;
    };
    "user.getUser": typeof getUser;
};
export default driver;
