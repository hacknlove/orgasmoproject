import { OrgasmoPage, PageFactoryParameters } from "~/types";
import Dynamic from "./Dynamic/Dynamic";
import Static from "./Static/Static";

export default function PageFactory({
  Components,
}: PageFactoryParameters): OrgasmoPage {
  const Page = ({ top, rows, bottom, src, layout, meta }) => {
    const topRendered = <Static rows={top} Components={Components} />;
    const rowsRendered = (
      <Dynamic rows={rows} src={src} Components={Components} />
    );
    const bottomRendered = <Static rows={bottom} Components={Components} />;

    if (layout) {
      return (
        <Components
          type={layout}
          props={{
            top: topRendered,
            rows: rowsRendered,
            bottom: bottomRendered,
            meta,
          }}
        />
      );
    }
    return (
      <>
        {topRendered}
        {rowsRendered}
        {bottomRendered}
      </>
    );
  };
  return Page;
}
