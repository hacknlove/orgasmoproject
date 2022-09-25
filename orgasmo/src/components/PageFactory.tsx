import { useState, useCallback } from "react";
import { useRouter } from "next/router";
import { OrgasmoPage, PageFactoryParameters } from "~/types";
import DefaultLayout from "./DefaultLayout/DefaultLayout";
import Meta from "./Meta/Meta";
import AreasContext from "./AreasContext";

export default function PageFactory({
  Components,
}: PageFactoryParameters): OrgasmoPage {
  const Page = (ssrProps) => {
    const router = useRouter();

    const [props, setProps] = useState(ssrProps);

    const layout = props.layout;
    const areas = props.areas;

    const setAreas = useCallback(
      (areas) =>
        setProps((props) => ({
          ...props,
          areas,
        })),
      [setProps]
    );

    const setLayout = useCallback(
      (layout) =>
        setProps((props) => ({
          ...props,
          layout,
        })),
      [setProps]
    );

    return (
      <AreasContext.Provider
        value={{ areas, layout, Components, setAreas, setLayout }}
      >
        {layout?.meta && <Meta meta={layout?.meta} />}
        {layout?.name ? (
          <Components
            key={router.asPath}
            type={layout.name}
            props={{
              cssVars: layout?.cssVars,
            }}
          />
        ) : (
          <DefaultLayout key={router.asPath} cssVars={layout?.cssVars} />
        )}
      </AreasContext.Provider>
    );
  };
  return Page;
}
