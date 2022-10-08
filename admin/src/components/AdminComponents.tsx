import { useCallback } from "react";

import AdminButton from "./AdminButton";
import EditLayoutName from "./layout/EditLayoutName";
import EditJSSnippets from "./layout/EditJSSnippets";
import EditCSSVars from "./layout/EditCSSvars";
import EditMetaTags from "./layout/EditMetaTags";
import ClonePage from "./page/ClonePage";
import EditPage from "./page/EditPage";

export const AdminComponentsObject = {
  AdminButton,
  EditLayoutName,
  EditJSSnippets,
  EditCSSVars,
  EditMetaTags,
  ClonePage,
  EditPage
};

export default function AdminComponentsFactory(DComponent) {
  return useCallback(
    ({ type, props }) => {
      switch (type) {
        case "AdminButton":
          return <AdminComponentsObject.AdminButton {...props} />;
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
          return <EditPage {...props} />
        default:
          return <DComponent type={type} props={props} />;
      }
    },
    [DComponent]
  );
}
