import { useDynamicResource, useDynamicValue } from "@orgasmo/dynamicstate/react";
import EpCloseBold from "../../icons/EpCloseBold";
import CarbonReset from "../../icons/CarbonReset";
import CodiconSave from "../../icons/CodiconSave";


function IsDirtyButtons({ filePath }) {
  const [isFileDirty] = useDynamicValue(`var://file${filePath}?isDirty`)
  const [fileActions] = useDynamicValue(`var://file${filePath}?actions`)
  const tabsResource = useDynamicResource('var://tabs_o')
  const activeFilepathResource = useDynamicResource('var://activeFilepath_o');

  function closeFilePath () {
    tabsResource.setValue(tabsResource.value.filter((path) => path !== filePath))
    if (activeFilepathResource.value === filePath) {
      activeFilepathResource.setValue(null)
    }
  }
  
    return (
      <div className="øTabButtons" onClick={(event => event.stopPropagation())}>
        { isFileDirty && <CarbonReset onClick={fileActions.reset} />}
        { isFileDirty && <CodiconSave onClick={fileActions.save} />}
        <EpCloseBold onClick={closeFilePath} />
      </div>
    );
  }

export default function Tab ({ filePath }) {
    const [activeFilepath, setActiveFilePath] = useDynamicValue("var://activeFilepath_o");

    return (
        <button
        className={`tab_o ${activeFilepath === filePath ? "active_o" : ""}`}
        onClick={() => setActiveFilePath(filePath)}
      >
        {filePath}
        <IsDirtyButtons filePath={filePath} />
        
      </button>
    )
}