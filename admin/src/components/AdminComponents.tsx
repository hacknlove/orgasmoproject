import { useCallback } from "react";

import AdminMenuItem from "./AdminMenuItem";
import ChoosePageId from "./ChoosePageId";
import EditLayoutName from "./page/EditLayoutName";
import EditJSSnippets from "./page/EditJSSnippets";
import EditCSSVars from "./page/EditCSSvars";
import EditMetaTags from "./page/EditMetaTags";
import EditPage from "./page/EditPage";
import EditCookies from "./page/EditCookies";

export const AdminComponentsObject = {
  AdminMenuItem,
  ChoosePageId,
  EditLayoutName,
  EditJSSnippets,
  EditCSSVars,
  EditMetaTags,
  EditPage,
  EditCookies,
};

export default function AdminComponentsFactory(DComponent) {
  return useCallback(
    ({ type, props }) => {
      switch (type) {
        case "AdminMenuItem":
          return <AdminComponentsObject.AdminMenuItem {...props} />;
        case "ChoosePageId":
          return <ChoosePageId {...props} />;
        case "EditLayoutName":
          return <AdminComponentsObject.EditLayoutName {...props} />;
        case "EditJSSnippets":
          return <EditJSSnippets {...props} />;
        case "EditCSSVars":
          return <EditCSSVars {...props} />;
        case "EditMetaTags":
          return <EditMetaTags {...props} />;
        case "EditPage":
          return <EditPage {...props} />;
        case "EditCookies":
          return <EditCookies {...props} />;
        default:
          return <DComponent type={type} props={props} />;
      }
    },
    [DComponent]
  );
}
