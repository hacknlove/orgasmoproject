import { useContext } from "react";
import AreasContext from "@orgasmo/orgasmo/AreasContext";

export default function RandomButton({ text }) {
  const { setAreas, areas } = useContext(AreasContext);

  return (
    <div className="RandomButton">
      <button
        onClick={() => {
          const newAreas = {
            ...areas,
            main: { ...areas.main },
          };
          newAreas.main.items[0].props.number = Math.floor(Math.random() * 100);
          newAreas.main.items[0].props.string = Math.random()
            .toString(36)
            .substring(2);

          setAreas(newAreas);
        }}
      >
        {text}
      </button>
    </div>
  );
}
