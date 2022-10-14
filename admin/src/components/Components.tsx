import dynamic from "next/dynamic";

export default {
  AdminMenuItem: dynamic(() => import("./AdminMenuItem.js"), {
    suspense: true,
  }),
  ChoosePageId: dynamic(() => import("./ChoosePageId.js"), { suspense: true }),
  EditLayoutName: dynamic(() => import("./page/EditLayoutName.js"), {
    suspense: true,
  }),
  EditJSSnippets: dynamic(() => import("./page/EditJSSnippets.js"), {
    suspense: true,
  }),
  EditCSSVars: dynamic(() => import("./page/EditCSSvars.js"), {
    suspense: true,
  }),
  EditMetaTags: dynamic(() => import("./page/EditMetaTags.js"), {
    suspense: true,
  }),
  EditPage: dynamic(() => import("./page/EditPage.js"), { suspense: true }),
  EditCookies: dynamic(() => import("./page/EditCookies.js"), {
    suspense: true,
  }),
  StoryListComponent: dynamic(() => import("./story/StoryListComponent.js"), {
    suspense: true,
  }),
  StoryIndex: dynamic(() => import("./layouts/StoryIndex.js"), {
    suspense: true,
  }),
  StoryRender: dynamic(() => import("./story/StoryRender.js"), {
    suspense: true,
  }),
  StoryPlayground: dynamic(() => import("./story/StoryPlayground.js"), {
    suspense: true
  }),
  StoryTitle: dynamic(() => import("./story/StoryTitle.js"), {
    suspense: true,
  }),
};
