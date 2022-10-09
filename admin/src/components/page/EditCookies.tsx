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

function EditCookieOptions({ resolve, serializedOptions }) {
  const [editOptions, setEditOptions] = useState(JSON.parse(serializedOptions));

  const onChange = useCallback(
    (event) => {
      setEditOptions((editOptions) => ({
        ...editOptions,
        [event.target.name]: event.target.value,
      }));
    },
    [setEditOptions]
  );

  const onCheck = useCallback(
    (event) => {
      setEditOptions((editOptions) => ({
        ...editOptions,
        [event.target.name]: !editOptions[event.target.name],
      }));
    },
    [setEditOptions]
  );

  const isDirty = useMemo(
    () => serializedOptions !== serializeOrdered(editOptions),
    [editOptions, serializedOptions]
  );

  return (
    <div
      className="_oadmin_modal_wrapper"
      onClick={(event) => {
        event.stopPropagation();
        if (
          (event.target as HTMLDivElement).className === "_oadmin_modal_wrapper"
        ) {
          resolve();
        }
      }}
    >
      <div className="_oadmin_modal">
        <div id="_oadmin_menu_pageId">
          <span>Edit cookie options</span>
          <button className="_oadmin_button" onClick={() => resolve()}>
            ✖
          </button>
        </div>{" "}
        <div className="_oadmin_modal_fields">
          <label>Domain</label>
          <input
            value={editOptions.domain ?? ""}
            name="domain"
            onChange={onChange}
          />
          <label>Path</label>
          <input
            value={editOptions.path ?? ""}
            name="path"
            onChange={onChange}
          />
          <label>Expires</label>
          <input
            type="datetime-local"
            value={editOptions.expires ?? ""}
            name="expires"
            onChange={onChange}
          />
          <label>Max Age</label>
          <input
            type="number"
            value={editOptions.maxAge ?? ""}
            name="maxAge"
            onChange={onChange}
          />
        </div>
        <label>
          <input
            type="checkbox"
            checked={Boolean(editOptions.httpOnly)}
            name="httpOnly"
            onClick={onCheck}
          />
          &ensp;HTTP Only
        </label>
        <label>
          <input
            type="checkbox"
            checked={Boolean(editOptions.sameSite)}
            name="sameSite"
            onClick={onCheck}
          />
          &ensp;Same Site
        </label>
        <label>
          <input
            type="checkbox"
            checked={Boolean(editOptions.secure)}
            name="secure"
            onClick={onCheck}
          />
          &ensp;Secure
        </label>
        {isDirty && (
          <div>
            <button
              className="_oadmin_button"
              onClick={() => setEditOptions(JSON.parse(serializedOptions))}
            >
              Reset
            </button>
            <button
              className="_oadmin_button"
              onClick={() => resolve(serializeOrdered(editOptions))}
            >
              Apply
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function serializeOrdered(object) {
  if (!object) {
    return "{}";
  }
  const entries = Object.entries(object);
  entries.sort((a, b) => {
    if (a[0] < b[0]) {
      return -1;
    }
    if (b[0] < a[0]) {
      return 1;
    }
    return 0;
  });

  return JSON.stringify(Object.fromEntries(entries));
}

export default function EditCookies() {
  const { updatePageConfig, pageConfig } = useContext(AdminContext) as any;
  const [cookies, setCookies] = useState<
    [string, string | null, string, string][]
  >([]);

  console.log(cookies);

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
        serializeOrdered(options),
        `${value};${serializeOrdered(options)}` as string,
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
          "",
        ],
      ]);
    }

    ref.current.value = "";
  }, [setCookies, cookies, ref.current]);

  useEffect(reset, [reset, pageConfig?.cookies]);

  const changed = useMemo(
    () =>
      cookies.find(
        ([, value, options, original]) => `${value};${options}` !== original
      ),
    [cookies]
  );

  return (
    <div className="_oadmin_dialog">
      <label>Edit Cookies</label>
      <div className="_oadmin_dialog_grid_3">
        {cookies.map(([name, value, options, original], i) =>
          value === null && original !== null ? null : (
            <Fragment key={name}>
              <label>
                {name} {`${value};${options}` !== original && "*"}
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
                    { serializedOptions: options },
                    "_oadminModal"
                  );

                  if (!newOptions) {
                    return;
                  }

                  setCookies(
                    cookies.map((element, j) =>
                      i === j
                        ? [element[0], element[1], newOptions, element[3]]
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
                  cookies: cookies
                    .filter((e) => e[1] !== null)
                    .map((e) => [e[0], e[1], JSON.parse(e[2])]),
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
