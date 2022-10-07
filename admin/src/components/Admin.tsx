import Head from "next/head";
import { useState, useEffect, useMemo } from "react";
import { RenderArea } from "@orgasmo/orgasmo/Area";
import AdminComponentsFactory, {
  AdminComponentsObject,
} from "./AdminComponents";

import AdminContext from "./AdminContext";
import * as equal from "fast-deep-equal";

import Router from "next/router";

function hide(event?) {
  if (event?.target?.tagName === "A") {
    return;
  }
  const menu = document.getElementById("_oapw") as HTMLDivElement;

  if (!menu) {
    return;
  }
  menu.style.display = "";
  window.removeEventListener("click", hide);
}

function show() {
  window.removeEventListener("click", hide);
  const menu = document.getElementById("_oapw") as HTMLDivElement;

  if (!menu) {
    return;
  }
  menu.style.display = "flex";
  setTimeout(() => {
    window.addEventListener("click", hide);
  }, 1000);
}

function keepAdminPaths(url) {
  const menu = document.getElementById("_oapw") as HTMLDivElement;

  if (!menu) {
    return;
  }

  if (!menu.style.display) {
    return;
  }
  if (url.startsWith("/admin")) {
    return;
  }
  Router.events.emit("routeChangeError");
  Router.replace("/admin" + url);
  throw "Ignore this error.";
}

export function Admin({
  adminAreas,
  DComponent,
  Components,
  pageConfig,
  setPageConfig,
  driverMethods,
  originalPageConfig,
}) {
  const isDirty = useMemo(
    () => !equal(pageConfig, originalPageConfig),
    [pageConfig, originalPageConfig]
  );

  const AdminComponents = AdminComponentsFactory(DComponent);

  function chooseModal(areaName) {
    setAdminArea(areaName);
    window.history.pushState(
      { pageConfig },
      "",
      `#${areaName === "start" ? "" : areaName}`
    );
    show();
  }

  const [adminArea, setAdminArea] = useState("start");

  useEffect(() => {
    Router.events.on("routeChangeStart", keepAdminPaths);

    () => Router.events.off("routeChangeStart", keepAdminPaths);
  }, []);

  useEffect(() => {
    window.history.replaceState({ pageConfig }, "");
    setAdminArea(window.location.hash.substring(1) || "start");
    show();

    window.addEventListener("popstate", ({ state }) => {
      if (state && state?.pageConfig) {
        setPageConfig(state.pageConfig);
      }
      setAdminArea(window.location.hash.substring(1) || "start");
      show();
    });
  }, []);

  function updatePageConfig(pageConfig) {
    window.history.pushState({ pageConfig }, "");
    setPageConfig(pageConfig);
  }

  return (
    <div
      id="_oadmin"
      onMouseEnter={show}
      onClick={(event) => {
        event.stopPropagation();
        if ((event.target as HTMLDListElement).id === "_oadmin") {
          show();
        }
      }}
    >
      <Head>
        <style>
          {`#_oadmin{min-width:2rem;min-height:2rem;position:fixed;background:#555;border:3px solid #fff;border-bottom:0;border-right:0;bottom:0;right:0;cursor:pointer;z-index:999999999;color:#fff;font-family:sans}` +
            `#_oapw{cursor:default;display:none;flex-direction:column}` +
            `._oab{cursor: pointer;display:flex;align-items:center;justify-content:space.between;column-gap:1rem;padding:0.5rem 1rem}` +
            `._oab:hover{background:black}` +
            `._oad{display:flex;flex-direction:column;display:flex;align-items:end;row-gap:0.25rem;padding:0.5rem 1rem}` +
            `#_oadmin button{border:0;color:white;font-size:100%;padding:0.3rem 0.9rem;background:#555;cursor:pointer}` +
            `#_oadmin button:hover{background:#000}`}
        </style>
      </Head>
      <AdminContext.Provider
        value={{
          pageConfig,
          originalPageConfig,
          isDirty,
          updatePageConfig,
          chooseModal,
          DComponent,
          Components,
          AdminComponents,
          driverMethods,
        }}
      >
        <div id="_oapw">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontWeight: "bold", padding: "1rem 1rem 0.25rem" }}>
              pageId: {pageConfig.pageId}
            </span>
            <button
              onClick={(event) => {
                chooseModal("start");
                hide();
                (event.target as HTMLButtonElement).blur();
              }}
            >
              ✖
            </button>
          </div>
          <span style={{ fontWeight: "bold", padding: "0.25rem 1rem 1rem" }}>
            {pageConfig.exactPath ? "Exact" : "Pattern"} Path:{" "}
            {pageConfig.exactPath ?? pageConfig.patternPath}
          </span>
          {AdminComponentsObject[adminArea] ? (
            <AdminComponents type={adminArea} props={{}} />
          ) : (
            <RenderArea
              area={adminAreas[adminArea]}
              DComponent={AdminComponents}
            />
          )}
          {isDirty && (
            <>
              <div className="_oad" style={{ borderTop: "1px solid #999" }}>
                <div>
                  <button onClick={() => updatePageConfig(originalPageConfig)}>
                    Reset pageConfing
                  </button>
                  <button>Save pageConfig</button>
                </div>
              </div>
            </>
          )}
        </div>
      </AdminContext.Provider>
    </div>
  );
}
