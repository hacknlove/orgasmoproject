import Monaco from "./Monaco";
import Tabs from "./Tabs";

export default function Editor() {
  return (
    <div id="PlaygroundEditor_o" style={{ color: "#fff" }}>
      <Tabs />
      <Monaco />
    </div>
  );
}
