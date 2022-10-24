import {
  useDynamicResource,
  useDynamicValue,
} from "@orgasmo/dynamicstate/react";
import EpCloseBold from "../../icons/EpCloseBold";
import CarbonReset from "../../icons/CarbonReset";
import CodiconSave from "../../icons/CodiconSave";
import IconoirEmptyPage from "../../icons/IconoirEmptyPage";
import RadixIconsBookmark from "../../icons/RadixIconsBookmark";
import MaterialSymbolsSettingsRounded from "../../icons/MaterialSymbolsSettingsRounded";

function TabButtons({ filePath }) {
  const [fileContent, setFileContent] = useDynamicValue(
    `var://file${filePath}?content`
  );
  const [originalContent, setOriginalContent] = useDynamicValue(
    `var://file${filePath}?original`
  );

  const isFileDirty = fileContent !== originalContent;

  const tabsResource = useDynamicResource("var://tabs_o");
  const activeFilepathResource = useDynamicResource("var://activeFilepath_o");

  function closeFilePath() {
    tabsResource.setValue(
      tabsResource.value.filter((path) => path !== filePath)
    );
    if (activeFilepathResource.value === filePath) {
      activeFilepathResource.setValue(tabsResource.value[0]);
    }
  }

  function reset() {
    setFileContent(originalContent);
  }
  function save() {
    setOriginalContent(fileContent);
  }

  return (
    <div className="TabButtons_o" onClick={(event) => event.stopPropagation()}>
      {isFileDirty && <CarbonReset onClick={reset} />}
      {isFileDirty && <CodiconSave onClick={save} />}
      <EpCloseBold onClick={closeFilePath} />
    </div>
  );
}

const Icons = {
  page: IconoirEmptyPage,
  component: RadixIconsBookmark,
  site: MaterialSymbolsSettingsRounded,
};

export default function Tab({ filePath }) {
  const [activeFilepath, setActiveFilePath] = useDynamicValue(
    "var://activeFilepath_o"
  );

  const parsed = filePath.match(/^\/(?<type>[^/]+).*?(?<label>[^/]+)$/).groups;

  const Icon = Icons[parsed.type];

  return (
    <button
      className={`tab_o ${activeFilepath === filePath ? "active_o" : ""}`}
      onClick={() => setActiveFilePath(filePath)}
    >
      <Icon />
      {parsed.label}
      <TabButtons filePath={filePath} />
    </button>
  );
}
