import { useEffect, useState } from "react";

const ADMIN_GET_PAGE_CONFIG_ENDPOINT = "/api/_oadmin/page/expand";

export default function useExpandPage({ pageConfig, samplePath }) {
  const [expandedConfigPage, setExpandedPageConfig] = useState();

  useEffect(() => {
    if (!pageConfig) {
      return;
    }

    if (pageConfig.patternPath && !samplePath) {
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
        resolvedUrl: samplePath,
      }),
    })
      .then((r) => r.json())
      .then((expandedPageConfig) =>
        setExpandedPageConfig(expandedPageConfig.props)
      );
  }, [pageConfig, samplePath, setExpandedPageConfig]);

  return expandedConfigPage;
}
