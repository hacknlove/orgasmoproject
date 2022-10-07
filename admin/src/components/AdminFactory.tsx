import { useEffect, useState } from "react";

import { Admin } from "./Admin";

export default function AdminFactory({ DComponent, Components, Page }) {
  const AdminPage = ({
    pageConfig,
    resolvedUrl,
    adminAreas,
    driverMethods,
  }) => {
    const [editablePageConfig, setEditablePageConfig] = useState(pageConfig);
    const [expandedPageConfig, setExpandedPageConfig] = useState<any>();

    useEffect(() => {
      fetch("/api/_oga", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          pageConfig: editablePageConfig,
          resolvedUrl,
        }),
      })
        .then((r) => r.json())
        .then((expandedPageConfig) =>
          setExpandedPageConfig(expandedPageConfig.props)
        );
    }, [editablePageConfig, resolvedUrl, setExpandedPageConfig]);

    useEffect(() => {
      setEditablePageConfig(pageConfig);
    }, [pageConfig]);

    return (
      <>
        <Admin
          adminAreas={adminAreas}
          DComponent={DComponent}
          Components={Components}
          originalPageConfig={pageConfig}
          pageConfig={editablePageConfig}
          setPageConfig={setEditablePageConfig}
          driverMethods={driverMethods}
        />
        {expandedPageConfig && <Page {...expandedPageConfig} />}
      </>
    );
  };

  return AdminPage;
}
