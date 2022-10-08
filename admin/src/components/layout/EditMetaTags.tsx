import {
  useContext,
  useCallback,
  Fragment,
  useState,
  useEffect,
  useMemo,
  useRef,
} from "react";

import AdminDataList from "../AdminDataLists";
import AdminContext from "../AdminContext";
import * as metaTagsList from "./metatags.json";

export default function EditMetaTags() {
  const { updatePageConfig, pageConfig } = useContext(AdminContext) as any;
  const [metaTags, setMetaTags] = useState<[string, string | null, string][]>(
    []
  );
  const ref: any = useRef();

  const reset = useCallback(() => {
    const layoutMetaTags = pageConfig?.layout?.meta ?? [];

    if (!layoutMetaTags) {
      setMetaTags([]);
      return;
    }

    const metaTags: [string, string | null, string][] = layoutMetaTags.map(
      ([name, value]) => [name, value as string, value as string]
    );

    metaTags.sort((a, b) => a[0].charCodeAt(0) - b[0].charCodeAt(0));

    setMetaTags(metaTags);

    return;
  }, [pageConfig?.layout?.meta]);

  const addNewMetaTag = useCallback(() => {
    const newVar = ref.current.value.trim();

    if (!newVar) {
      return;
    }

    const withValue = newVar.match(/^(?<name>[^=]+)\s*=\s*(?<content>.*)$/);

    if (!withValue) {
      setMetaTags([...metaTags, [newVar.replace(/\s+/g, "-"), "", ""]]);
    } else {
      setMetaTags([
        ...metaTags,
        [
          withValue.groups.name.replace(/\s+/g, "-"),
          withValue.groups.content,
          "",
        ],
      ]);
    }

    ref.current.value = "";
  }, [setMetaTags, metaTags, ref.current]);

  useEffect(reset, [reset, pageConfig?.layout?.meta]);

  const changed = useMemo(
    () => metaTags.find(([, a, b]) => a !== b),
    [metaTags]
  );

  const filter = useCallback(
    (varName) =>
      metaTags.every(([name, value]) => name !== varName || value === null),
    [metaTags]
  );

  return (
    <div className="_oad">
      <AdminDataList list={metaTagsList} id="_oadminMeta" filter={filter} />
      <label>Edit Meta Tags</label>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          columnGap: "1rem",
          rowGap: "0.25rem",
        }}
      >
        {metaTags.map(([name, value, original], i) =>
          value === null && original !== null ? null : (
            <Fragment key={name}>
              <label>
                {name} {value !== original && "*"}
              </label>
              <div>
                <input
                  style={{ paddingRight: "1.5rem" }}
                  type="text"
                  value={value ?? ""}
                  onChange={(event) =>
                    setMetaTags(
                      metaTags.map((element, j) =>
                        i === j
                          ? [element[0], event.target.value, element[2]]
                          : element
                      )
                    )
                  }
                />
                <span
                  onClick={() =>
                    setMetaTags(
                      metaTags.map((e, j) => (i === j ? [e[0], null, e[2]] : e))
                    )
                  }
                  style={{
                    position: "absolute",
                    marginLeft: "-1rem",
                    color: "#a00",
                    cursor: "pointer",
                  }}
                >
                  ✖
                </span>
              </div>
            </Fragment>
          )
        )}
      </div>
      <div style={{ display: "flex", width: "100%", marginTop: "0.5rem" }}>
        <input
          list="_oadminMeta"
          placeholder="new variable"
          style={{ flexGrow: 1 }}
          ref={ref}
          onKeyDown={(event) => event.key === "Enter" && addNewMetaTag()}
        />
        <button onClick={addNewMetaTag}>new meta tag</button>
      </div>
      <div>
        {changed && (
          <>
            <button onClick={reset}>Reset</button>
            <button
              onClick={() => {
                updatePageConfig({
                  ...pageConfig,
                  layout: {
                    ...pageConfig.layout,
                    meta: metaTags.filter((e) => e[1] !== null),
                  },
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
