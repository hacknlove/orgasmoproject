/// <reference types="react" />
interface StoryUlParams {
    component: string;
    stories: Record<string, any>;
}
export default function StoryUl({ component, stories }: StoryUlParams): JSX.Element;
export {};
