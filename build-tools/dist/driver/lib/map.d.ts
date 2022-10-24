export default function map({ route, filename, from, type }: {
    route?: string | undefined;
    filename: any;
    from: any;
    type: any;
}): {
    from: any;
    route: string;
    filename: any;
    type: any;
    importName: string;
    name: any;
};
