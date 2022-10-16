import { useState, useEffect, useMemo, useCallback } from "react";
import { RenderArea } from "@orgasmo/orgasmo/Area";

import AdminContext from "./AdminContext";
import * as equal from "fast-deep-equal";

import Router from "next/router";
import { AsyncComponents } from "@orgasmo/orgasmo/AsyncComponents";
import Save from "./Save";

export function Admin({
  adminAreas,
  DComponent,
  Components,
  pageConfig,
  setPageConfig,
  driverMethods,
  originalPageConfig,
  pageConfigIds,
  setSelectedPageId,
}) {
  const isDirty = useMemo(
    () => !equal(pageConfig, originalPageConfig),
    [pageConfig, originalPageConfig]
  );
  const [menuIsActive, setMenuIsActive] = useState(true);
  const [adminArea, setAdminArea] = useState("start");

  const updatePageConfig = useCallback(
    (pageConfig) => {
      window.history.pushState({ pageConfig }, "");
      setPageConfig(pageConfig);
    },
    [setPageConfig]
  );

  const chooseMenu = useCallback(
    (areaName) => {
      setAdminArea(areaName);
      window.history.pushState(
        {
          ...window.history.state,
          pageConfig,
        },
        "",
        `#${areaName === "start" ? "" : areaName}`
      );
    },
    [setAdminArea]
  );

  useEffect(() => {
    if (!menuIsActive) {
      return;
    }

    function makeInactive(event) {
      let element = event.target;
      while (element) {
        if (
          ["A", "BUTTON", "SELECT", "OPTION", "INPUT"].includes(element.tagName)
        ) {
          return;
        }
        element = element.parentElement;
      }

      setMenuIsActive(false);
    }

    window.addEventListener("click", makeInactive);

    return () => {
      window.removeEventListener("click", makeInactive);
    };
  }, [menuIsActive]);

  useEffect(() => {
    function keepAdminPaths(url) {
      if (url.startsWith("/admin")) {
        return;
      }
      Router.events.emit("routeChangeError");
      Router.replace("/admin" + url);
      throw "Ignore this error.";
    }

    Router.events.on("routeChangeStart", keepAdminPaths);

    () => Router.events.off("routeChangeStart", keepAdminPaths);
  }, [menuIsActive]);

  useEffect(() => {
    window.history.replaceState(
      {
        ...window.history.state,
        pageConfig,
      },
      ""
    );
    setAdminArea(window.location.hash.substring(1) || "start");

    function popstateHandler({ state }) {
      if (state && state?.pageConfig) {
        setPageConfig(state.pageConfig);
      }
      if (window.location.pathname)
        setAdminArea(window.location.hash.substring(1) || "start");
    }

    window.addEventListener("popstate", popstateHandler);

    return () => window.removeEventListener("popstate", popstateHandler);
  }, []);

  return (
    <div
      id="_oadmin"
      onMouseEnter={() => setMenuIsActive(true)}
      onClick={(event) => {
        event.stopPropagation();
        setMenuIsActive(true);
      }}
    >
      <AdminContext.Provider
        value={{
          pageConfig,
          originalPageConfig,
          isDirty,
          updatePageConfig,
          chooseMenu,
          DComponent,
          Components,
          driverMethods,
          pageConfigIds,
          setSelectedPageId,
        }}
      >
        <AsyncComponents area="playgroundModal_o" />
        <div
          id="_oadmin_menu"
          className={menuIsActive ? "_oadmin_menu_active" : ""}
        >
          <div id="_oadmin_menu_path">
            <span>
              {pageConfig?.exactPath ?? pageConfig?.patternPath}{" "}
              {isDirty && "*"}
            </span>
            {adminArea !== "start" && (
              <button
                className="_oadmin_button"
                onClick={() => {
                  chooseMenu("start");
                }}
              >
                🠄
              </button>
            )}
          </div>
          {Components[adminArea] ? (
            <DComponent type={adminArea} props={{}} />
          ) : (
            <RenderArea area={adminAreas[adminArea]} DComponent={DComponent} />
          )}
          <Save />
        </div>
      </AdminContext.Provider>
    </div>
  );
}
