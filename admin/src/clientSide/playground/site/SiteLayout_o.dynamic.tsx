import Editor from "../Editor/Editor";
import Render from "../Render/Render";
import Title from "../Title/Title";

export default function SiteLayout() {
  return (
    <>
      <Title />
      <Render />
      <Editor />
    </>
  );
}
