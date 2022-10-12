import { useRouter } from "next/router";
import { useState } from "react";

import JSONEditor from "./JsonEditor";
export default function StoryPlayground({ description, itemConfig, story }) {
  const router = useRouter();

  const [editItemConfig, setEditItemConfig] = useState(itemConfig);

  return (
    <div>
      <h2>
        {router.query.component} {story}
      </h2>
      <p>{description}</p>
      <JSONEditor content={editItemConfig} onChange={setEditItemConfig} />
    </div>
  );
}
