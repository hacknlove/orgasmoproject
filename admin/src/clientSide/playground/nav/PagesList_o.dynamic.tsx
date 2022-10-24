import PageList_o from "./PageUl";

export default function PagesList_o({ pages }) {
  return (
    <>
      <h2 className="MainLayout_nav_list_title_o">Pages</h2>
      {Object.entries(pages).map(([path, stories]) => (
        <PageList_o key={path} path={path} stories={stories as any} />
      ))}
    </>
  );
}
