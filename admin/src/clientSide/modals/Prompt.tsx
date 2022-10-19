import { useRef } from "react";
import EpCloseBold from "../icons/EpCloseBold";

export default function SaveAsInput({
  resolve,
  defaultValue = "",
  label = "",
  title = "Save as...",
  pattern,
}) {
  pattern = pattern?.replace(/^\/(.*)\/$/, "$1");

  const ref = useRef() as any;
  return (
    <div
      className="modal_o_wrapper"
      onClick={(event) => {
        event.stopPropagation();
        if ((event.target as HTMLDivElement).className === "modal_o_wrapper") {
          resolve();
        }
      }}
    >
      <div className="modal_o">
        <div className="modal_o_title">
          <span>{title}</span>
          <EpCloseBold className="modal_o_close" onClick={() => resolve()} />
        </div>
        <div className="modal_o_body">
          <div className="modal_o_fields">
            <label>{label}</label>
            <input
              pattern={pattern}
              autoFocus
              className="input_o"
              ref={ref}
              defaultValue={defaultValue}
            />
          </div>
          <div className="modal_o_buttons">
            <button className="button_o" onClick={() => resolve()}>
              Cancel
            </button>
            <button
              className="button_o"
              onClick={() => {
                resolve(
                  ref.current.validity.patternMismatch || ref.current.value
                );
              }}
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
