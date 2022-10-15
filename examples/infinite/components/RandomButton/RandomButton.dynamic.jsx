import { useDynamicResource } from "@orgasmo/dynamicstate/react";

export default function RandomButton({ text }) {
  const mainAreaResource = useDynamicResource("var://areas/main");

  return (
    <div className="RandomButton">
      <button
        onClick={() => {
          const mainNewArea = { ...areas.main };
          mainNewArea.items[0].props.number = Math.floor(Math.random() * 100);
          mainNewArea.items[0].props.string = Math.random()
            .toString(36)
            .substring(2);

          mainAreaResource.setValue(mainNewArea);
        }}
      >
        {text}
      </button>
    </div>
  );
}
