import { useRouter } from "next/router";
import { useState, useMemo, useEffect } from "react";
import * as equal from "fast-deep-equal";
import { useDynamicResource } from "@orgasmo/dynamicstate/react";
import dynamic from "next/dynamic";

const JSONEditor = dynamic(() => import("./JsonEditor.js"), { ssr: false });
export default function StoryPlayground({ description, itemConfig }) {
  const router = useRouter();
  const [editItemConfig, setEditItemConfig] = useState<Record<string, any>>({
    json: itemConfig,
  });
  const storyComponentAreaResource = useDynamicResource(
    "var://area/PlaygroundRender_o"
  );

  const [reset, setReset] = useState({});
  const [editNotes, setEditNotes] = useState(description);
  const isDirty = useDynamicResource(
    `var://${router.query.component}/${router.query.story}/isDirty_o`
  );
  const isItemConfigDirty = useMemo(() => {
    let json = editItemConfig.json;
    if (editItemConfig.text) {
      try {
        json = JSON.parse(editItemConfig.text);
      } catch {
        return;
      }
    }

    return !equal(itemConfig, json);
  }, [editItemConfig, itemConfig]);
  const isNotesDirty = useMemo(
    () => editNotes !== description,
    [editNotes, description]
  );
  const jsoneditor = useMemo(
    () => <JSONEditor content={editItemConfig} onChange={setEditItemConfig} />,
    [router.query.component, router.query.story, reset]
  );

  useEffect(() => {
    let json = editItemConfig.json;
    if (editItemConfig.text) {
      try {
        json = JSON.parse(editItemConfig.text);
      } catch {
        return;
      }
    }

    storyComponentAreaResource.setValue({
      items: [
        {
          type: "StoryPlaygroundRender_o",
          props: {
            itemConfig: json,
          },
        },
      ],
    });
  }, [editItemConfig]);

  useEffect(() => {
    isDirty.setValue(isItemConfigDirty || isNotesDirty);
  }, [isItemConfigDirty, isNotesDirty]);

  useEffect(() => {
    setEditItemConfig({ json: itemConfig });
    setEditNotes(description);
  }, [description, itemConfig]);

  return (
    <div>
      {jsoneditor}
      <div id="StoryPlayground_buttons">
        {isItemConfigDirty && (
          <>
            <button
              className="button_o"
              onClick={() => {
                setEditItemConfig({ json: itemConfig });
                setReset({});
              }}
            >
              Reset
            </button>
            <button className="button_o">Save as</button>
            <button className="button_o">Save</button>
          </>
        )}
      </div>
      <div id="StoryPlayground_description_o">
        <label>Notes</label>
        <textarea
          className="StoryPlayground_textarea_o"
          value={editNotes}
          onChange={(event) => setEditNotes(event.target.value)}
        />
        {isNotesDirty && (
          <div className="jsoneditor_buttons_o">
            <button
              className="button_o"
              onClick={() => {
                setEditNotes(description);
              }}
            >
              Reset
            </button>
            <button className="button_o">Save as</button>
            <button className="button_o">Save</button>
          </div>
        )}
      </div>
    </div>
  );
}