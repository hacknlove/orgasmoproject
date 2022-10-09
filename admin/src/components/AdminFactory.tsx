import { useEffect, useState, useMemo } from "react";

import { Admin } from "./Admin";

const ADMIN_GET_PAGE_CONFIG_ENDPOINT = "/api/_oadmin/getPageConfig";

export default function AdminFactory({ DComponent, Components, Page, css }) {
  const AdminPage = ({
    pageConfigs,
    resolvedUrl,
    adminPageConfig,
    driverMethods,
  }) => {
    const [selectedPageId, setSelectedPageId] = useState(
      Object.keys(pageConfigs)[0]
    );
    const [editablePageConfig, setEditablePageConfig] = useState(
      pageConfigs[selectedPageId]
    );
    const [expandedPageConfig, setExpandedPageConfig] = useState<any>();

    useEffect(() => {
      setSelectedPageId(Object.keys(pageConfigs)[0]);
    }, [resolvedUrl]);

    useEffect(() => {
      if (!editablePageConfig) {
        return;
      }
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
      setEditablePageConfig(pageConfigs[selectedPageId]);
    }, [pageConfigs, selectedPageId]);

    const adminRendered = useMemo(
      () => (
        <Admin
          adminAreas={adminPageConfig.areas}
          DComponent={DComponent}
          Components={Components}
          originalPageConfig={pageConfigs[selectedPageId]}
          pageConfig={editablePageConfig}
          pageConfigIds={Object.keys(pageConfigs)}
          setSelectedPageId={setSelectedPageId}
          setPageConfig={setEditablePageConfig}
          driverMethods={driverMethods}
          css={css}
        />
      ),
      [editablePageConfig]
    );

    const pageRendered = useMemo(
      () => expandedPageConfig && <Page {...expandedPageConfig} />,
      [expandedPageConfig]
    );

    return useMemo(() => {
      if (adminPageConfig.layout?.name) {
        return (
          <DComponent
            type={adminPageConfig.layout?.name}
            admin={adminRendered}
            page={pageRendered}
          />
        );
      }

      return (
        <>
          {adminRendered}
          {pageRendered}
        </>
      );
    }, [expandedPageConfig, editablePageConfig]);
  };

  return AdminPage;
}
