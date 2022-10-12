import { useRouter } from "next/router";
import { useState, useMemo, useEffect, useContext } from "react";
import * as equal from "fast-deep-equal";
import AreasContext from "@orgasmo/orgasmo/AreasContext";
import { useDynamicResource } from "@orgasmo/dynamicstate/react";

import JSONEditor from "./JsonEditor";
export default function StoryPlayground({ description, itemConfig }) {
  const router = useRouter();
  const [editItemConfig, setEditItemConfig] = useState<Record<string, any>>({
    json: itemConfig,
  });
  const { setAreas } = useContext(AreasContext);
  const [reset, setReset] = useState({});
  const [editNotes, setEditNotes] = useState(description);
  const isDirty = useDynamicResource(
    `var://${router.query.component}/${router.query.story}/isDirty`
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

    setAreas((areas) => ({
      ...areas,
      storyComponent: {
        items: [
          {
            type: "StoryRender",
            props: {
              itemConfig: json,
            },
          },
        ],
      },
    }));
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
              className="_oadmin_button"
              onClick={() => {
                setEditItemConfig({ json: itemConfig });
                setReset({});
              }}
            >
              Reset
            </button>
            <button className="_oadmin_button">Save as</button>
            <button className="_oadmin_button">Save</button>
          </>
        )}
      </div>
      <div id="StoryPlayground_description">
        <label>Notes</label>
        <textarea
          className="StoryPlayground_textarea"
          value={editNotes}
          onChange={(event) => setEditNotes(event.target.value)}
        />
        {isNotesDirty && (
          <div className="øbotonera">
            <button
              className="_oadmin_button"
              onClick={() => {
                setEditNotes(description);
              }}
            >
              Reset
            </button>
            <button className="_oadmin_button">Save as</button>
            <button className="_oadmin_button">Save</button>
          </div>
        )}
      </div>
    </div>
  );
}
