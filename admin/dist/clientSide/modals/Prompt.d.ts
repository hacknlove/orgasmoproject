/// <reference types="react" />
export default function SaveAsInput({ resolve, defaultValue, label, title, pattern, ...more }: {
    [x: string]: any;
    resolve: any;
    defaultValue?: string | undefined;
    label?: string | undefined;
    title?: string | undefined;
    pattern: any;
}): JSX.Element;
