import { useEffect, useState } from "react";

import { Admin } from "./Admin";

const ADMIN_GET_PAGE_CONFIG_ENDPOINT =
  process.env.ADMIN_GET_PAGE_CONFIG_ENDPOINT ?? "/api/_oadmin/getPageConfig";

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
      fetch(ADMIN_GET_PAGE_CONFIG_ENDPOINT, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
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
