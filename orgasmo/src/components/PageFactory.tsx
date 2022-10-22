import { useState, useEffect, useRef } from "react";
import { OrgasmoPage, PageFactoryParameters } from "~/types";
import DefaultLayout from "./DefaultLayout/DefaultLayout";
import Meta from "./Meta/Meta";
import { DynamicStateProvider } from "@orgasmo/dynamicstate/react";

let testContextRef;

if (process.env.NODE_ENV === "development" && typeof window === "object") {
  testContextRef = {};
  (window as any).dynamicState_o = testContextRef;
}

export default function PageFactory({
  DComponent,
}: PageFactoryParameters): OrgasmoPage {
  const Page = (props) => {
    const [clientSideOnly, setClientSideOnly] = useState(props.clientSideOnly);

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

    if (props.exposeSharedState && typeof window === "object") {
      testContextRef = {};
      (window as any).dynamicState_o = testContextRef;
    }

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

    useEffect(() => {
      setClientSideOnly(false);
    }, [setClientSideOnly]);
    if (clientSideOnly) {
      return null;
    }

    return (
      <DynamicStateProvider
        initialState={initialState}
        testContextRef={testContextRef}
      >
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
