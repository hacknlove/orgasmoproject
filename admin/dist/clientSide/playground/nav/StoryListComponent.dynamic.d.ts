/// <reference types="react" />
interface StoryListComponentParams {
    component: string;
    stories: Record<string, any>;
}
export default function StoryListComponent({ component, stories, }: StoryListComponentParams): JSX.Element;
export {};
