import { useRouter } from "next/router";
import { OrgasmoPage, PageFactoryParameters } from "~/types";
import Dynamic from "./Dynamic/Dynamic";
import Static from "./Static/Static";

export default function PageFactory({
  Components,
}: PageFactoryParameters): OrgasmoPage {
  const Page = ({
    header,
    main,
    mainMode,
    mainThreshold,
    footer,
    src,
    layout,
    meta,
  }) => {
    const router = useRouter();

    const headerRendered = <Static items={header} Components={Components} />;
    const mainRendered =
      mainMode === "static" ? (
        <Static items={main} Components={Components} />
      ) : (
        <Dynamic
          key={router.asPath}
          items={main}
          src={src}
          mode={mainMode}
          threshold={mainThreshold}
          Components={Components}
        />
      );
    const footerRendered = <Static items={footer} Components={Components} />;

    if (layout) {
      return (
        <Components
          type={layout}
          props={{
            header: headerRendered,
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
