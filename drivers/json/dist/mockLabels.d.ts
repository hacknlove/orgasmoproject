declare function getLabels(ctx: any): {
    labels: any;
} | undefined;
declare const driver: {
    user: {
        getLabels: typeof getLabels;
    };
    "user.getLabels": typeof getLabels;
};
export default driver;
