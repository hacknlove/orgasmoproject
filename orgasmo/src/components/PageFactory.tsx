import { useState, useEffect, useRef } from "react";
import { OrgasmoPage, PageFactoryParameters } from "~/types";
import DefaultLayout from "./DefaultLayout/DefaultLayout";
import Meta from "./Meta/Meta";
import { DynamicStateProvider } from "@orgasmo/dynamicstate/react";

export default function PageFactory({
  DComponent,
}: PageFactoryParameters): OrgasmoPage {
  const Page = (props) => {
    const [initialState, setInitialState] = useState(() => {
      const response = {
        "var://layout": props.layout,
        "var://areasNames": [] as string[],
        "var://DComponent": { DComponent },
      };

      for (const areaName in props.areas) {
        response["var://areasNames"].push(areaName);
        response[`var://area/${areaName}`] = props.areas[areaName];
      }

      return response;
    });

    const lastProps = useRef(props);

    const layout = initialState["var://layout"];

    useEffect(() => {
      if (lastProps.current === props) {
        return;
      }

      const newInitialState = {
        "var://layout": props.layout,
        "var://areasNames": [] as string[],
      } as any;

      for (const areaName in lastProps.current.areas) {
        newInitialState[`var://area/${areaName}`] = null;
      }

      for (const areaName in props.areas) {
        newInitialState["var://areasNames"].push(areaName);
        newInitialState[`var://area/${areaName}`] = props.areas[areaName];
      }

      lastProps.current = props;
      setInitialState(newInitialState);
    }, [props]);

    return (
      <DynamicStateProvider initialState={initialState}>
        {layout?.meta && <Meta meta={layout?.meta} />}
        {layout?.name ? (
          <DComponent
            type={layout.name}
            props={{
              cssVars: layout?.cssVars,
            }}
          />
        ) : (
          <DefaultLayout cssVars={layout?.cssVars} />
        )}
      </DynamicStateProvider>
    );
  };
  return Page;
}
