export default function SiteLayout() {
  return (
    <>
      <div id="PlaygroundTitle_o">
        <h1>Global Settings</h1>
      </div>
      <div id="PlaygroundEditor_o" style={{ color: "#fff" }}>
        <h2>Work in progress</h2>
        <p>
          Here you will be able to edit global settings for the whole site,
          like:
        </p>
        <ul>
          <li>css vars</li>
          <li>meta tags</li>
          <li>js snippets</li>
          <li>flush cache ?</li>
          <li>hooks to start e2e tests when the pages are edited ?</li>
          <li>enable/disable drivers ?</li>
          <li>custom private global data (used only by drivers) ?</li>
          <li>custom public global data (used by drivers and components) ?</li>
          <li>Feature flagging ?</li>
        </ul>
      </div>
    </>
  );
}
