import EpCloseBold from "../icons/EpCloseBold";

export default function Alert({ title, text, resolve, name, message }) {
  return (
    <div
      className="modal_o_wrapper"
      onClick={(event) => {
        event.stopPropagation();
        if (
          (event.target as HTMLDivElement).className === "modal_o_wrapper"
        ) {
          resolve();
        }
      }}
    >
      <div className="modal_o">
        <div className="modal_o_title">
          <span>{title || name}</span>
          <EpCloseBold
            className="modal_o_close"
            onClick={() => resolve()}
          />
        </div>
        <div className="modal_o_body">
          <div>{text || message}</div>
          <div className="modal_o_buttons">
            <button className="button_o" onClick={() => resolve()}>
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
