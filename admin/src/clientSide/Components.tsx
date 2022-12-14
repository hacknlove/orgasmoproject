import dynamic from "next/dynamic";

export default {
  Admin: dynamic(() => import("./admin/Admin.dynamic.js"), {
    suspense: true,
    loading: undefined,
  }),
  AdminDataLists: dynamic(() => import("./admin/AdminDataLists.dynamic.js"), {
    suspense: true,
    loading: undefined,
  }),
  ChoosePageId: dynamic(() => import("./admin/ChoosePageId.dynamic.js"), {
    suspense: true,
    loading: undefined,
  }),
  EditCookies: dynamic(() => import("./admin/page/EditCookies.dynamic.js"), {
    suspense: true,
    loading: undefined,
  }),
  EditCSSvars: dynamic(() => import("./admin/page/EditCSSvars.dynamic.js"), {
    suspense: true,
    loading: undefined,
  }),
  EditJSSnippets: dynamic(
    () => import("./admin/page/EditJSSnippets.dynamic.js"),
    {
      suspense: true,
      loading: undefined,
    }
  ),
  EditLayoutName: dynamic(
    () => import("./admin/page/EditLayoutName.dynamic.js"),
    {
      suspense: true,
      loading: undefined,
    }
  ),
  EditMetaTags: dynamic(() => import("./admin/page/EditMetaTags.dynamic.js"), {
    suspense: true,
    loading: undefined,
  }),
  EditPage: dynamic(() => import("./admin/page/EditPage.dynamic.js"), {
    suspense: true,
    loading: undefined,
  }),
  PlayGroundMainLayout_o: dynamic(
    () => import("./playground/MainLayout/PlayGroundMainLayout_o.dynamic.js"),
    {
      suspense: true,
      loading: undefined,
    }
  ),
  KVStorageList_o: dynamic(
    () => import("./playground/nav/KVStorageList_o.dynamic.js"),
    {
      suspense: true,
      loading: undefined,
    }
  ),
  PagesList_o: dynamic(
    () => import("./playground/nav/PagesList_o.dynamic.js"),
    {
      suspense: true,
      loading: undefined,
    }
  ),
  Storieslist_o: dynamic(
    () => import("./playground/nav/Storieslist_o.dynamic.js"),
    {
      suspense: true,
      loading: undefined,
    }
  ),
};
