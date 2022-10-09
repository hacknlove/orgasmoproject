import asyncit from "@orgasmo/orgasmo/AsyncComponents";
import {
  useContext,
  useCallback,
  Fragment,
  useState,
  useEffect,
  useMemo,
  useRef,
} from "react";

import AdminContext from "../AdminContext";

function EditCookieOptions({ resolve, reject, options }) {
  const [editOptions, setEditOptions] = useState(options);

  return (
    <div className="_oadmin_modal_wrapper">
      <div className="_oadmin_modal">
        <div className="_oadmin_modal_fields">
          <label>Domain</label>
          <input value={editOptions.domain ?? ""} name="domain" />
          <label>Path</label>
          <input value={editOptions.path ?? ""} name="path" />
          <label>Expires</label>
          <input
            type="datetime-local"
            value={editOptions.expires ?? ""}
            name="expires"
          />
          <label>Max Age</label>
          <input type="number" value={editOptions.maxAge ?? ""} name="maxAge" />
        </div>
        <label>
          <input
            type="checkbox"
            checked={editOptions.httpOnly}
            name="httpOnly"
          />
          &ensp;HTTP Only
        </label>
        <label>
          <input
            type="checkbox"
            checked={editOptions.sameSite}
            name="sameSite"
          />
          &ensp;Same Site
        </label>
        <label>
          <input type="checkbox" checked={editOptions.secure} name="secure" />
          &ensp;Secure
        </label>
        <div>
          <button className="_oadmin_button">Reset</button>
          <button className="_oadmin_button">Apply</button>
        </div>
      </div>
    </div>
  );
}

export default function EditCookies() {
  const { updatePageConfig, pageConfig } = useContext(AdminContext) as any;
  const [cookies, setCookies] = useState<
    [string, string | null, string, string][]
  >([]);
  const ref: any = useRef();

  const reset = useCallback(() => {
    const pageCookies = pageConfig?.cookies ?? [];

    if (!pageCookies) {
      setCookies([]);
      return;
    }

    const cookies: [string, string | null, string, string][] = pageCookies.map(
      ([name, value, options]) => [
        name,
        value as string,
        JSON.stringify(options),
        `${value};${JSON.stringify(options)}` as string,
      ]
    );

    cookies.sort((a, b) => a[0].charCodeAt(0) - b[0].charCodeAt(0));

    setCookies(cookies);

    return;
  }, [pageConfig?.cookies]);

  const addNewCookie = useCallback(() => {
    const newVar = ref.current.value.trim();

    if (!newVar) {
      return;
    }

    const withValue = newVar.match(/^(?<name>[^=]+)\s*=\s*(?<content>.*)$/);

    if (!withValue) {
      setCookies([...cookies, [newVar.replace(/\s+/g, "-"), "", "{}", ""]]);
    } else {
      setCookies([
        ...cookies,
        [
          withValue.groups.name.replace(/\s+/g, "-"),
          withValue.groups.content,
          "{}",
          `${withValue.groups.content};{}`,
        ],
      ]);
    }

    ref.current.value = "";
  }, [setCookies, cookies, ref.current]);

  useEffect(reset, [reset, pageConfig?.cookies]);

  const changed = useMemo(() => cookies.find(([, a, b]) => a !== b), [cookies]);

  return (
    <div className="_oadmin_dialog">
      <label>Edit Cookies</label>
      <div className="_oadmin_dialog_grid_3">
        {cookies.map(([name, value, options, original], i) =>
          value === null && original !== null ? null : (
            <Fragment key={name}>
              <label>
                {name} {value !== original && "*"}
              </label>
              <div>
                <input
                  className="_oadmin_input_with_x"
                  type="text"
                  value={value ?? ""}
                  onChange={(event) =>
                    setCookies(
                      cookies.map((element, j) =>
                        i === j
                          ? [
                              element[0],
                              event.target.value,
                              element[2],
                              element[3],
                            ]
                          : element
                      )
                    )
                  }
                />
                <span
                  className="_oadmin_input_x"
                  onClick={() =>
                    setCookies(
                      cookies.map((e, j) =>
                        i === j ? [e[0], null, e[2], ""] : e
                      )
                    )
                  }
                >
                  ✖
                </span>
              </div>
              <div
                onClick={async () => {
                  const newOptions = await asyncit(
                    EditCookieOptions,
                    { options: JSON.parse(options) },
                    "_oadminModal"
                  );

                  setCookies(
                    cookies.map((element, j) =>
                      i === j
                        ? [
                            element[0],
                            element[1],
                            JSON.stringify(newOptions),
                            element[3],
                          ]
                        : element
                    )
                  );
                }}
              >
                <svg width="32" height="32" viewBox="0 0 16 16">
                  <path
                    fill="currentColor"
                    d="M3 9.5a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3z"
                  />
                </svg>
              </div>
            </Fragment>
          )
        )}
      </div>
      <div className="_oadmin_input_new_item">
        <input
          list="_oadminMeta"
          placeholder="new cookie"
          ref={ref}
          onKeyDown={(event) => event.key === "Enter" && addNewCookie()}
        />
        <button className="_oadmin_button" onClick={addNewCookie}>
          new Cookie
        </button>
      </div>
      <div>
        {changed && (
          <>
            <button className="_oadmin_button" onClick={reset}>
              Reset
            </button>
            <button
              className="_oadmin_button"
              onClick={() => {
                updatePageConfig({
                  ...pageConfig,
                  cookies: cookies.filter((e) => e[1] !== null),
                });
              }}
            >
              Apply
            </button>
          </>
        )}
      </div>
    </div>
  );
}
