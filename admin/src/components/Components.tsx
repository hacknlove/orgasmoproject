import dynamic from "next/dynamic";

export default {
  AdminMenuItem: dynamic(() => import("./admin/AdminMenuItem.js"), {
    suspense: true,
    loading: undefined,
  }),
  ChoosePageId: dynamic(() => import("./admin/ChoosePageId.js"), {
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
  StoryListComponent: dynamic(
    () => import("./story/list/StoryListComponent.js"),
    {
      suspense: true,
      loading: undefined,
    }
  ),
  StoryIndex: dynamic(() => import("./story/StoryIndex.js"), {
    suspense: true,
    loading: undefined,
  }),
  StoryRender: dynamic(() => import("./story/render/StoryRender.js"), {
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
  StoryTitle: dynamic(() => import("./story/title/StoryTitle.js"), {
    suspense: true,
    loading: undefined,
  }),
  PageListComponent: dynamic(
    () => import("./story/list/PageListComponent.js"),
    { suspense: true, loading: undefined }
  ),
};
