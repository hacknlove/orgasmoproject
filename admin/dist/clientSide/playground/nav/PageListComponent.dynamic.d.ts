/// <reference types="react" />
interface StoryListComponentParams {
    path: string;
    stories: Record<string, any>;
}
export default function PageListComponent({ path, stories, }: StoryListComponentParams): JSX.Element;
export {};
