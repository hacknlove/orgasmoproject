import { useCallback } from "react";

import AdminButton from "./AdminButton";
import EditLayoutName from "./layout/EditLayoutName";
import EditJSSnippets from "./layout/EditJSSnippets";
import EditCSSVars from "./layout/EditCSSvars";
import EditMetaTags from "./layout/EditMetaTags";

export const AdminComponentsObject = {
  AdminButton,
  EditLayoutName,
  EditJSSnippets,
  EditCSSVars,
  EditMetaTags,
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
        default:
          return <DComponent type={type} props={props} />;
      }
    },
    [DComponent]
  );
}
