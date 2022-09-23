import { useMemo } from 'react';
import { useRouter } from "next/router";
import { OrgasmoPage, PageFactoryParameters } from "~/types";
import Dynamic from "./Dynamic/Dynamic";
import Static from "./Static/Static";
import DefaultLayout from './DefaultLayout/DefaultLayout';
import Meta from './Meta/Meta';

function renderArea ({ Components, area }) {
  if (area.mode === 'bubble' || area.mode === 'grow') {
    return <Dynamic
      items={area.items}
      src={area.src}
      mode={area.mode}
      threshold={area.threshold}
      Components={Components}
    />
  }
  return <Static items={area.items} Components={Components} />
}

export default function PageFactory({
  Components,
}: PageFactoryParameters): OrgasmoPage {
  const Page = ({
    layout,
    areas
  }) => {
    const router = useRouter()
    const renderedAreas = useMemo(
      () => Object.fromEntries(Object.entries(areas).map(([name, area]) => [name, renderArea({ Components, area })])), [areas]
    )
    
    return (
      <>
        { layout?.meta && <Meta meta={layout?.meta} />}
        { layout?.name
          ? (
            <Components
              key={router.asPath}
              type={layout.name}
              props={{
                areas: renderedAreas,
                layout,
              }}
            />
          )
          : (
            <DefaultLayout
              key={router.asPath}
              cssVars={layout?.cssVars}
              areas={renderedAreas}
            />
          )
        }
      </>
    )
  };
  return Page;
}
