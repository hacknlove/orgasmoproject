import StoryListComponent from "./StoryUl";

export default function StoryLis_o({ stories }) {
  return (
    <>
      <h2 className="MainLayout_nav_list_title_o">Stories</h2>
      {Object.entries(stories).map(([component, stories]) => (
        <StoryListComponent
          key={component}
          component={component}
          stories={stories as any}
        />
      ))}
    </>
  );
}
