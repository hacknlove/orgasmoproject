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
        <div id="_oadmin_menu_pageId">
          <span>{title || name}</span>
          <button className="_oadmin_button" onClick={() => resolve()}>
            ✖
          </button>
        </div>
        <div>{text || message}</div>
      </div>
    </div>
  );
}
