import { useEffect, useState } from "react";

const ADMIN_GET_PAGE_CONFIG_ENDPOINT = "/api/_oadmin/page/expand";

export default function useExpandPage({ pageConfig, pathSample, parsedPath }) {
  const [expandedConfigPage, setExpandedPageConfig] = useState();

  useEffect(() => {
    if (!pageConfig) {
      return;
    }

    if (pageConfig.patternPath && !pathSample) {
      setExpandedPageConfig({
        areas: {},
      } as any);
      return;
    }

    fetch(ADMIN_GET_PAGE_CONFIG_ENDPOINT, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        pageConfig,
        resolvedUrl: pathSample,
        parsedPath,
      }),
    })
      .then((r) => r.json())
      .then((expandedPageConfig) =>
        setExpandedPageConfig(expandedPageConfig.props)
      );
  }, [pageConfig, pathSample, setExpandedPageConfig]);

  return expandedConfigPage;
}
