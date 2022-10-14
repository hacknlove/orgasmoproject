import dynamic from "next/dynamic";

export default {
  AdminMenuItem: dynamic(() => import("./AdminMenuItem.js"), {
    suspense: true,
    loading: undefined,
  }),
  ChoosePageId: dynamic(() => import("./ChoosePageId.js"), {
    suspense: true,
    loading: undefined,
  }),
  EditLayoutName: dynamic(() => import("./page/EditLayoutName.js"), {
    suspense: true,
    loading: undefined,
  }),
  EditJSSnippets: dynamic(() => import("./page/EditJSSnippets.js"), {
    suspense: true,
    loading: undefined,
  }),
  EditCSSVars: dynamic(() => import("./page/EditCSSvars.js"), {
    suspense: true,
    loading: undefined,
  }),
  EditMetaTags: dynamic(() => import("./page/EditMetaTags.js"), {
    suspense: true,
    loading: undefined,
  }),
  EditPage: dynamic(() => import("./page/EditPage.js"), {
    suspense: true,
    loading: undefined,
  }),
  EditCookies: dynamic(() => import("./page/EditCookies.js"), {
    suspense: true,
    loading: undefined,
  }),
  StoryListComponent: dynamic(() => import("./story/StoryListComponent.js"), {
    suspense: true,
    loading: undefined,
  }),
  StoryIndex: dynamic(() => import("./layouts/StoryIndex.js"), {
    suspense: true,
    loading: undefined,
  }),
  StoryRender: dynamic(() => import("./story/StoryRender.js"), {
    suspense: true,
    loading: undefined,
  }),
  StoryPlayground: dynamic(
    () => import("./story/PlayGround/StoryPlayground.js"),
    {
      suspense: true,
      loading: undefined,
    }
  ),
  StoryTitle: dynamic(() => import("./story/StoryTitle.js"), {
    suspense: true,
    loading: undefined,
  }),
};
