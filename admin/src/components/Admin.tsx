import Head from "next/head";
import { useState, useEffect, useMemo } from "react";
import { RenderArea } from "@orgasmo/orgasmo/Area";
import AdminComponentsFactory, {
  AdminComponentsObject,
} from "./AdminComponents";

import AdminContext from "./AdminContext";
import * as equal from "fast-deep-equal";

import Router from "next/router";
import { AsyncComponents } from "@orgasmo/orgasmo/AsyncComponents";

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

function hide(event?) {
  if (event?.target?.tagName === "A") {
    return;
  }
  const menu = document.getElementById("_oadmin_menu") as HTMLDivElement;

  if (!menu) {
    return;
  }
  menu.style.display = "";
  window.removeEventListener("click", hide);
}

function show() {
  window.removeEventListener("click", hide);
  const menu = document.getElementById("_oadmin_menu") as HTMLDivElement;

  if (!menu) {
    return;
  }
  menu.style.display = "flex";
  setTimeout(() => {
    window.addEventListener("click", hide);
  }, 1000);
}

function keepAdminPaths(url) {
  const menu = document.getElementById("_oadmin_menu") as HTMLDivElement;

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
  css,
  pageConfigIds,
  setSelectedPageId,
}) {
  const isDirty = useMemo(
    () => !equal(pageConfig, originalPageConfig),
    [pageConfig, originalPageConfig]
  );

  const AdminComponents = AdminComponentsFactory(DComponent);

  function chooseMenu(areaName) {
    setAdminArea(areaName);
    window.history.pushState(
      {
        ...window.history.state, 
        pageConfig
      },
      "",
      `#${areaName === "start" ? "" : areaName}`
    );
  }

  const [adminArea, setAdminArea] = useState("start");

  useEffect(() => {
    Router.events.on("routeChangeStart", keepAdminPaths);

    () => Router.events.off("routeChangeStart", keepAdminPaths);
  }, []);

  useEffect(() => {
    window.history.replaceState({
      ...window.history.state,
      pageConfig
    }, "");
    setAdminArea(window.location.hash.substring(1) || "start");

    function popstateHandler ({ state }) {
      if (state && state?.pageConfig) {
        setPageConfig(state.pageConfig);
      }
      if (window.location.pathname) 
      setAdminArea(window.location.hash.substring(1) || "start");
    }

    window.addEventListener("popstate",popstateHandler);

    return () => window.removeEventListener("popstate", popstateHandler)
  }, []);

  function updatePageConfig(pageConfig) {
    window.history.pushState({ pageConfig }, "");
    setPageConfig(pageConfig);
  }

  if (!pageConfig) {
    return null
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
          AdminComponents,
          driverMethods,
          pageConfigIds,
          setSelectedPageId,
        }}
      >
        <AsyncComponents area="_oadminModal" />
        <div id="_oadmin_menu">
          <div id="_oadmin_menu_path">
            <span>
              {pageConfig.exactPath ?? pageConfig.patternPath} {isDirty && '*'}
            </span>
            <button
              className="_oadmin_button"
              onClick={(event) => {
                chooseMenu("start");
                hide();
                (event.target as HTMLButtonElement).blur();
              }}
            >
              ✖
            </button>
          </div>
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
              <div className="_oadmin_save_menu">
                <div>
                  <button
                    className="_oadmin_button"
                    onClick={() => updatePageConfig(originalPageConfig)}
                  >
                    Reset
                  </button>
                  <button className="_oadmin_button">Save</button>
                  <button className="_oadmin_button">Save as...</button>
                </div>
              </div>
            </>
          )}
        </div>
      </AdminContext.Provider>
    </div>
  );
}
