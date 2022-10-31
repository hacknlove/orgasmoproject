import KVStorageLi from "./KVStorageLi";

export default function StoryList_o({ KVStorages }) {
  return (
    <>
      <h2 className="MainLayout_nav_list_title_o">Storage</h2>
      <ul className="MainLayout_nav_li_ul">
        {Object.entries(KVStorages).map(([key, description]) => (
          <KVStorageLi key={key} label={key} description={description} />
        ))}
      </ul>
    </>
  );
}
