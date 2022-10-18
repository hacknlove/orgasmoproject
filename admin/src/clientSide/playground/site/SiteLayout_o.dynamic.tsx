export default function StoryIndex() {
  return (
    <>
      <div id="PlaygroundTitle_o">
        <h1>Global Settings</h1>
      </div>
      <div id="StoryPlayground" style={{ color: "#fff" }}>
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
          <li>enable/disable drivers ?</li>
          <li>hooks to start e2e tests when the pages are edited...</li>
        </ul>
      </div>
    </>
  );
}
