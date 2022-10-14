import EpCloseBold from "./icons/EpCloseBold";

export default function Alert({ title, text, resolve, name, message }) {
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
          <span>{title || name}</span>
          <EpCloseBold
            className="_oadmin_modal_close"
            onClick={() => resolve()}
          />
        </div>
        <div className="_oadmin_modal_body">
          <div>{text || message}</div>
          <div className="_oadmin_modal_buttons">
            <button className="_oadmin_button" onClick={() => resolve()}>
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
