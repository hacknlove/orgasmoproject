import Item from "../Item/Item.dynamic";
import Slider from "@orgasmo/orgasmo/Slider";
import { OouiArrowNextLtr, OouiArrowPreviousLtr } from "../Icons";

export default function Row({ items, src, title }) {
  return (
    <div>
      <h2>{title}</h2>
      <Slider
        Component={Item}
        items={items}
        src={src}
        ButtonNext={OouiArrowNextLtr}
        ButtonPrev={OouiArrowPreviousLtr}
      />
    </div>
  );
}
