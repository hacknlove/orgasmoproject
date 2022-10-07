import AdminContext from "../AdminContext";
import {
  useContext,
  useCallback,
  Fragment,
  useState,
  useEffect,
  useMemo,
  useRef,
} from "react";

import { AdminCSSVarsDataList } from "../AdminDataLists";

export default function EditCSSVars() {
  const { updatePageConfig, pageConfig } = useContext(AdminContext) as any;
  const [vars, setVars] = useState<[string, string | null, string][]>([]);

  const ref: any = useRef();
  const reset = useCallback(() => {
    const layoutCssVars = pageConfig?.layout?.cssVars ?? {};

    if (!layoutCssVars) {
      setVars([]);
      return;
    }

    const cssVars: [string, string | null, string][] = Object.entries(
      layoutCssVars
    ).map(([name, value]) => [name, value as string, value as string]);

    cssVars.sort((a, b) => a[0].charCodeAt(0) - b[0].charCodeAt(0));

    setVars(cssVars);

    return;
  }, [pageConfig?.layout?.cssVars]);

  const addOrUpdateCssVar = useCallback(
    ({ name, value = "" }): [string, string | null, string][] => {
      name = name.replace(/\s+/g, "-");

      const item = vars.findIndex((e) => e[0] === name);

      if (item === -1) {
        return [...vars, [name, value, ""]];
      }

      return vars.map((e, i) => (i === item ? [name, value, e[2]] : e));
    },
    [vars]
  );

  const addNewCssVar = useCallback(() => {
    const newVar = ref.current.value.trim();

    if (!newVar) {
      return;
    }

    const withValue = newVar.match(/^(?<name>[^=]+?)\s*=\s*(?<value>.*)$/);

    if (!withValue) {
      setVars(addOrUpdateCssVar({ name: newVar }));
    } else {
      setVars(addOrUpdateCssVar(withValue.groups));
    }
    ref.current.value = "";
  }, [vars, setVars, ref.current]);

  useEffect(reset, [reset, pageConfig?.layout?.cssVars]);

  const changed = useMemo(() => vars.find(([, a, b]) => a !== b), [vars]);

  const filter = useCallback(
    (varName) =>
      vars.every(([name, value]) => name !== varName || value === null),
    [vars]
  );

  return (
    <div className="_oad">
      <AdminCSSVarsDataList filter={filter} />
      <label>Edit CSS vars</label>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          columnGap: "1rem",
          rowGap: "0.25rem",
        }}
      >
        {vars.map(([name, value, original], i) =>
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
                    setVars(
                      vars.map((element, j) =>
                        i === j
                          ? [element[0], event.target.value, element[2]]
                          : element
                      )
                    )
                  }
                />
                <span
                  onClick={() =>
                    setVars(
                      vars.map((e, j) => (i === j ? [e[0], null, e[2]] : e))
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
          list="_oadminCSSVars"
          placeholder="new variable"
          style={{ flexGrow: 1 }}
          ref={ref}
          onKeyDown={(event) => event.key === "Enter" && addNewCssVar()}
        />
        <button onClick={addNewCssVar}>new var</button>
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
                    cssVars: Object.fromEntries(
                      vars.filter((e) => e[1] !== null)
                    ),
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
