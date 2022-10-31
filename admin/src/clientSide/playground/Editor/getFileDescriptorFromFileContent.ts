const configs = {
  page: (content) => ({
    type: "page",
    filePath: `/page/${content.pageId}`,
    path: content.exactPath ?? content.patternPath,
    pageId: content.pageId,
    description: content.description ?? "",
  }),
  component: (content) => ({
    type: "component",
    filePath: `/component/${content.itemConfig.type}/${content.story}`,
    component: content.itemConfig.type,
    story: content.story,
    description: content.description ?? "",
  }),
  KVStorage: (content) => ({
    type: "KVstorage",
    filePath: `/value/${content.key}`,
    description: content.description ?? "",
  }),
};

export default function getFileDescriptorFromFileContent(fileContent) {
  if (fileContent.pageId) {
    return configs.page(fileContent);
  } else if (fileContent.story) {
    return configs.component(fileContent);
  } else if (fileContent.key) {
    return configs.KVStorage(fileContent);
  }
}
