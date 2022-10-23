import { useRef } from "react";
import EpCloseBold from "../icons/EpCloseBold";

export default function SaveAsInput({
  resolve,
  defaultValue = "",
  label = "",
  title = "Save as...",
  pattern,
  ...more
}) {
  pattern = pattern?.toString()?.replace?.(/^\/(.*)\/[igm]?$/, "$1");

  const ref = useRef() as any;

  function onSubmit() {
    resolve(ref.current.value);
  }

  return (
    <div className="modal_o_wrapper">
      <form
        className="modal_o"
        onSubmit={onSubmit}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal_o_title">
          <span>{title}</span>
          <EpCloseBold
            className="modal_o_close"
            onClick={() => {
              resolve();
            }}
          />
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
              {...more}
            />
          </div>
          <div className="modal_o_buttons">
            <button
              type="button"
              className="button_o"
              onClick={() => resolve()}
            >
              Cancel
            </button>
            <button type="submit" className="button_o">
              Ok
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
