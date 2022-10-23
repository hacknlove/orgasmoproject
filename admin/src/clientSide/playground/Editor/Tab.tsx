import {
  useDynamicResource,
  useDynamicValue,
} from "@orgasmo/dynamicstate/react";
import EpCloseBold from "../../icons/EpCloseBold";
import CarbonReset from "../../icons/CarbonReset";
import CodiconSave from "../../icons/CodiconSave";

function IsDirtyButtons({ filePath }) {
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

export default function Tab({ filePath }) {
  const [activeFilepath, setActiveFilePath] = useDynamicValue(
    "var://activeFilepath_o"
  );

  return (
    <button
      className={`tab_o ${activeFilepath === filePath ? "active_o" : ""}`}
      onClick={() => setActiveFilePath(filePath)}
    >
      {filePath}
      <IsDirtyButtons filePath={filePath} />
    </button>
  );
}
