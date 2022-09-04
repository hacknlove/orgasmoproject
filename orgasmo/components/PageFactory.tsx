import { OrgasmoPage, PageFactoryParameters } from "~/types";
import Dynamic from "./Dynamic/Dynamic";
import Static from "./Static/Static";

export default function PageFactory({
  Components,
}: PageFactoryParameters): OrgasmoPage {
  const Page = ({ header, main, footer, src, layout, meta }) => {
    const headerRendered = <Static rows={header} Components={Components} />;
    const mainRendered = (
      <Dynamic rows={main} src={src} Components={Components} />
    );
    const footerRendered = <Static rows={footer} Components={Components} />;

    if (layout) {
      return (
        <Components
          type={layout}
          props={{
            heade: headerRendered,
            main: mainRendered,
            footer: footerRendered,
            meta,
          }}
        />
      );
    }
    return (
      <>
        {headerRendered}
        {mainRendered}
        {footerRendered}
      </>
    );
  };
  return Page;
}
