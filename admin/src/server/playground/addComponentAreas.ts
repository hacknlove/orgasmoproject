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

  areas.storyComponent_o = {
    items: [
      {
        type: "StoryRender_o",
        props: {
          itemConfig: storyConfig.itemConfig,
        },
      },
    ],
  };

  areas.storyPlayground_o = {
    items: [
      {
        type: "StoryPlayground_o",
        props: {
          story: ctx.query.story,
          description: storyConfig.description,
          itemConfig: storyConfig.itemConfig,
        },
      },
    ],
  };

  areas.playgroundTitle_o = {
    items: [
      {
        type: "PlaygroundTitle_o",
        props: {
          component: ctx.query.component,
          story: ctx.query.story,
          isDirty: false,
        },
      },
    ],
  };

  return true;
}
