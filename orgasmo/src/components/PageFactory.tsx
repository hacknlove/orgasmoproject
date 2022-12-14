import { useState, useEffect, useRef } from "react";
import { OrgasmoPage, PageFactoryParameters } from "~/types";
import DefaultLayout from "./DefaultLayout/DefaultLayout";
import Meta from "./Meta/Meta";
import {
  DynamicStateProvider,
  useDynamicValue,
} from "@orgasmo/dynamicstate/react";
import ComPlugin from "@orgasmo/dynamicstate/plugins/com";
import DComponent from "./DComponent";
import { AsyncComponents } from "./AsyncComponents";

const DynamicStatePlugins = [ComPlugin];

let exposeSharedState = process.env.NODE_ENV === "development";

function Layout() {
  const [layout] = useDynamicValue("var://layout");
  const [{ Components }] = useDynamicValue("var://Components");

  return (
    <>
      {layout?.meta && <Meta meta={layout?.meta} />}
      {layout?.name ? (
        <DComponent
          type={layout.name}
          props={{
            cssVars: layout?.cssVars,
          }}
          Components={Components}
        />
      ) : (
        <DefaultLayout cssVars={layout?.cssVars} />
      )}
    </>
  );
}

export default function PageFactory({
  Components,
}: PageFactoryParameters): OrgasmoPage {
  const Page = (props) => {
    const [clientSideOnly, setClientSideOnly] = useState(props.clientSideOnly);

    const [initialState, setInitialState] = useState(() => {
      const response = {
        "var://layout": props.layout,
        "var://areasNames": [] as string[],
        "var://Components": { Components },
      };

      for (const areaName in props.areas) {
        response["var://areasNames"].push(areaName);
        response[`var://area/${areaName}`] = props.areas[areaName];
      }

      return response;
    });

    const lastProps = useRef(props);

    exposeSharedState ||= props.exposeSharedState;

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
        testContextRef={
          exposeSharedState && typeof window === "object" && window
        }
        plugins={DynamicStatePlugins}
      >
        <AsyncComponents area="modals" />
        <Layout />
      </DynamicStateProvider>
    );
  };
  return Page;
}
