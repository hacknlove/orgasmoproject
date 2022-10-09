import { useCallback } from "react";

import AdminMenuItem from "./AdminMenuItem";
import ChoosePageId from "./ChoosePageId";
import EditLayoutName from "./layout/EditLayoutName";
import EditJSSnippets from "./layout/EditJSSnippets";
import EditCSSVars from "./layout/EditCSSvars";
import EditMetaTags from "./layout/EditMetaTags";
import ClonePage from "./page/ClonePage";
import EditPage from "./page/EditPage";
import EditCookies from "./page/EditCookies";

export const AdminComponentsObject = {
  AdminMenuItem,
  ChoosePageId,
  EditLayoutName,
  EditJSSnippets,
  EditCSSVars,
  EditMetaTags,
  ClonePage,
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
        case "ClonePage":
          return <ClonePage {...props} />;
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
