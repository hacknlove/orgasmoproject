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

  areas.storyComponent = {
    items: [
      {
        type: "StoryRender",
        props: {
          itemConfig: storyConfig.itemConfig,
        },
      },
    ],
  };

  areas.storyPlayground = {
    items: [
      {
        type: "StoryPlayground",
        props: {
          story: ctx.query.story,
          description: storyConfig.description,
          itemConfig: storyConfig.itemConfig,
        },
      },
    ],
  };

  areas.playgroundTitle = {
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
