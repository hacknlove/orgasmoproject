import {
  useDynamicResource,
  useDynamicState,
  useDynamicValue,
} from "@orgasmo/dynamicstate/react";
import EpCloseBold from "../../icons/EpCloseBold";
import CarbonReset from "../../icons/CarbonReset";
import CodiconSave from "../../icons/CodiconSave";
import IconoirEmptyPage from "../../icons/IconoirEmptyPage";
import RadixIconsBookmark from "../../icons/RadixIconsBookmark";
import MaterialSymbolsSettingsRounded from "../../icons/MaterialSymbolsSettingsRounded";
import asyncit from "@orgasmo/orgasmo/AsyncComponents";
import Alert from "../../modals/Alert";
import updateNav from "./updateNav";
import MaterialSymbolsAdd from "../../icons/MaterialSymbolsAdd";
import getFileDescriptorFromFileContent from "./getFileDescriptorFromFileContent";
import GrommetIconsStorage from "../../icons/GrommetIconsStorage";

function TabButtons({ filePath }) {
  const dynamicState = useDynamicState();
  const [fileContent, setFileContent] = useDynamicValue(
    `var://file${filePath}?content`
  );
  const [originalContent, setOriginalContent] = useDynamicValue(
    `var://file${filePath}?original`
  );

  const isFileDirty =
    fileContent !== originalContent && originalContent !== ' "reset" ';

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
    setOriginalContent(' "reset" ');
    activeFilepathResource.triggerSubscriptions();
  }
  async function save() {
    const preFileDescriptor = getFileDescriptorFromFileContent(
      JSON.parse(fileContent)
    );

    if (!preFileDescriptor) {
      asyncit(
        Alert,
        {
          title: "Unknown schema",
          text: `The file is not a page, a story or a KVStorage`,
        },
        "playgroundModal_o"
      );
      return;
    }

    if (preFileDescriptor.filePath !== filePath) {
      const confirm = await asyncit(
        Alert,
        {
          title: "Save as...",
          text: `the new filePath is ${preFileDescriptor.filePath}`,
          cancel: true,
        },
        "playgroundModal_o"
      );

      if (!confirm) {
        return;
      }
    }

    const fileDescriptor = await fetch("/api/_oadmin/playGround/saveFile", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: fileContent,
    })
      .then((r) => r.json())
      .catch((error) => ({ error }));

    if (fileDescriptor.error) {
      return asyncit(Alert, fileDescriptor.error, "playgroundModal_o");
    }

    if (activeFilepathResource.value === fileDescriptor.filePath) {
      setOriginalContent(fileContent);
    } else {
      dynamicState.setValue(
        `var://file${fileDescriptor.filePath}?original`,
        fileContent
      );
      activeFilepathResource.setValue(fileDescriptor.filePath);
      updateNav({ dynamicState, fileDescriptor });
    }
  }

  return (
    <div className="TabButtons_o" onClick={(event) => event.stopPropagation()}>
      {isFileDirty && !filePath.startsWith("/new/") && (
        <CarbonReset onClick={reset} />
      )}
      {isFileDirty && <CodiconSave onClick={save} />}
      <EpCloseBold onClick={closeFilePath} />
    </div>
  );
}

const Icons = {
  page: IconoirEmptyPage,
  component: RadixIconsBookmark,
  site: MaterialSymbolsSettingsRounded,
  value: GrommetIconsStorage,
  new: MaterialSymbolsAdd,
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
