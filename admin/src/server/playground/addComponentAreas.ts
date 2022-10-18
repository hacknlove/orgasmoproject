export default function addComponentAreas({ areas, ctx, stories }) {
  const storyConfig = stories[ctx.query.component]?.[ctx.query.story];

  if (!storyConfig) {
    return;
  }

  areas.mainArea_o = {
    items: [
      {
        type: "StoryLayout_o",
      },
    ],
  };

  areas.PlaygroundRender_o = {
    items: [
      {
        type: "PlaygroundRenderComponent_o",
        props: {
          itemConfig: storyConfig.itemConfig,
        },
      },
    ],
  };

  areas.PlaygroundEditor_o = {
    items: [
      {
        type: "PlaygroundEditorComponent_o",
        props: {
          story: ctx.query.story,
          description: storyConfig.description,
          itemConfig: storyConfig.itemConfig,
        },
      },
    ],
  };

  areas.PlaygroundTitle_o = {
    items: [
      {
        type: "PlaygroundDeleteItem_o",
        props: {
          label: "Delete Component",
          action: `/api/_oadmin/story?component=${ctx.query.component}&story=${ctx.query.story}`,
        },
      },
    ],
  };

  return true;
}
