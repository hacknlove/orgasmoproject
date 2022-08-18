import Item from "./Item.dynamic";
import Slider from "orgasmo/Slider"
import { OouiArrowNextLtr } from './Icons'
import { OouiArrowPreviousLtr } from './Icons'

export default function Row ({ items, getMore, title }) {
    return (
        <div>
            <h2>{title}</h2>
            <Slider 
                Component={Item}
                items={items}
                getMore={getMore}
                cardWidth={210}
                ButtonNext={OouiArrowNextLtr}
                ButtonPrev={OouiArrowPreviousLtr}
            />
        </div>
    )
}