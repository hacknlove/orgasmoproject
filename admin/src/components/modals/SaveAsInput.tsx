import { useState } from "react";
import EpCloseBold from "../icons/EpCloseBold";

export default function SaveAsInput({
  resolve,
  defaultValue = "",
  label = "",
  title = "Save as...",
}) {
  const [value, setValue] = useState<string>(defaultValue);
  return (
    <div
      className="_oadmin_modal_wrapper"
      onClick={(event) => {
        event.stopPropagation();
        if (
          (event.target as HTMLDivElement).className === "_oadmin_modal_wrapper"
        ) {
          resolve();
        }
      }}
    >
      <div className="_oadmin_modal">
        <div className="_oadmin_modal_title">
          <span>{title}</span>
          <EpCloseBold
            className="_oadmin_modal_close"
            onClick={() => resolve()}
          />
        </div>
        <div className="_oadmin_modal_body">
          <div className="_oadmin_modal_fields">
            <label>{label}</label>
            <input
              className="_oadmin_input"
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
          </div>
          {value && (
            <div className="_oadmin_modal_buttons">
              <button className="_oadmin_button" onClick={() => resolve()}>
                Cancel
              </button>
              <button className="_oadmin_button" onClick={() => resolve(value)}>
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
