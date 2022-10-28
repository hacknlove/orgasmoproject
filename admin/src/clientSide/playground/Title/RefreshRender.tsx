import IcBaselineRefresh from "../../icons/IcBaselineRefresh";

function refresh() {
  const iframe = document.getElementById(
    "pageRender_iframe"
  ) as HTMLIFrameElement;

  if (!iframe?.contentWindow) {
    return;
  }

  if (
    iframe.contentWindow.location.pathname === "/playground" &&
    iframe.contentWindow.location.search === "?empty"
  ) {
    iframe.contentWindow.location.reload();
    return;
  }

  iframe.contentWindow.location = "/playground?empty=true";
}

export default function RefreshRender() {
  return <IcBaselineRefresh className="icon_o" onClick={refresh} />;
}
