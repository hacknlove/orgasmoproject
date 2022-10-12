import Head from "next/head";
import { useState, useEffect, useMemo, useCallback } from "react";
import { RenderArea } from "@orgasmo/orgasmo/Area";

import AdminContext from "./AdminContext";
import * as equal from "fast-deep-equal";

import Router from "next/router";
import { AsyncComponents } from "@orgasmo/orgasmo/AsyncComponents";
import Save from "./Save";

// Copy-pasted from ./admin.css
const defaultCss = `
#_oadmin {
  min-width: 2rem;
  min-height: 2rem;
  position: fixed;
  background: #555;
  bottom: 0;
  right: 0;
  z-index: 999999999;
  color: #fff;
  font-family: sans-serif;
  box-shadow: 0 0 15px #000a, 0 0 20px #fffa;
}

#_oadmin_menu {
  display: none;
  flex-direction: column;
}

#_oadmin_menu._oadmin_menu_active {
  display: flex;
}

#_oadmin_menu_pageId {
  font-weight: bold;
  padding: 0.25rem 1rem 1rem;
}

#_oadmin_menu_path {
  display: flex;
  justify-content: space-between;
}
#_oadmin_menu_path > span {
  font-weight: bold;
  padding: 1rem 1rem 0.25rem;
}

._oadmin_menu_item {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  color: white;
  background: transparent;
  font-weight: inherit;
  font-size: inherit;
  font-family: inherit;
}

._oadmin_menu_item:hover {
  background: black;
}

._oadmin_dialog {
  display: flex;
  flex-direction: column;
  display: flex;
  align-items: end;
  row-gap: 0.25rem;
  padding: 0.5rem 1rem;
}

._oadmin_save_menu {
  display: flex;
  flex-direction: column;
  display: flex;
  align-items: end;
  row-gap: 0.25rem;
  padding: 0.5rem 1rem;
  border-top: 1px solid #999;
}

._oadmin_button {
  border: 0;
  color: white;
  font-size: 100%;
  padding: 0.3rem 0.9rem;
  background: #555;
  cursor: pointer;
}

._oadmin_button:hover {
  background: #000;
}

._oadmin_modal_wrapper {
  font-family: sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #0005;
  z-index: 99999999999;
  display: flex;
  justify-content: center;
  align-items: center;
}

._oadmin_modal {
  background: #555;
  padding: 0 1rem 1rem;
  display: flex;
  flex-direction: column;
  row-gap: 0.25rem;
  color: #fff;
  box-shadow: 0 0 15px #000a, 0 0 20px #fffa;
}

._oadmin_modal_fields {
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 1rem;
  row-gap: 0.25rem;
  align-items: center;
}

._oadmin_dialog_grid_3 {
  display: grid;
  grid-template-columns: auto auto auto;
  column-gap: 1rem;
  row-gap: 0.25rem;
  align-items: center;
}

._oadmin_dialog_grid_2 {
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 1rem;
  row-gap: 0.25rem;
  align-items: center;
}

._oadmin_input_with_x {
  padding-right: 1.5rem;
}

._oadmin_input_x {
  position: absolute;
  margin-left: -1rem;
  color: #a00;
  cursor: pointer;
}

._oadmin_input_new_item {
  display: flex;
  width: 100%;
  margin-top: 0.5rem;
}
._oadmin_input_new_item > input {
  flex-grow: 1;
}
`;

export function Admin({
  adminAreas,
  DComponent,
  Components,
  pageConfig,
  setPageConfig,
  driverMethods,
  originalPageConfig,
  css,
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
      <Head>
        <style>{css || defaultCss}</style>
      </Head>
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
        <AsyncComponents area="_oadminModal" />
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
