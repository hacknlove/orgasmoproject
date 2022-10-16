import dynamic from "next/dynamic";

export default {
  PlayGroundMainLayout_o: dynamic(() => import("./playground/PlayGroundMainLayout_o.js"), {
    suspense: true,
    loading: undefined
  }),
  SiteLayout_o: dynamic(() => import("./playground/SiteLayout_o.js"), {
    suspense: true,
    loading: undefined,
  }),
  StoryLayout_o: dynamic(() => import("./playground/StoryLayout_o.js"), {
    suspense: true,
    loading: undefined,
  }),
  playgroundTitle_o: dynamic(() => import("./playground/title/Title_o.js"), {
    suspense: true,
    loading: undefined,
  }),

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
    () => import("./playground/list/StoryListComponent.js"),
    {
      suspense: true,
      loading: undefined,
    }
  ),
  StoryRender: dynamic(() => import("./playground/render/StoryRender.js"), {
    suspense: true,
    loading: undefined,
  }),
  StoryPlayground: dynamic(
    () => import("./playground/PlayGround/StoryPlayground.js"),
    {
      suspense: true,
      loading: undefined,
    }
  ),

  PageListComponent: dynamic(
    () => import("./playground/list/PageListComponent.js"),
    { suspense: true, loading: undefined }
  ),
};
