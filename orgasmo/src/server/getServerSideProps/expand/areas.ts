import { expandArea } from "./area";

export default async function expandAreas({
  ctx,
  areasConfig,
  params,
  timeChunk,
  pageId,
}) {
  if (!areasConfig) {
    return {};
  }
  const response = {};
  for (const name of Object.keys(areasConfig)) {
    response[name] = expandArea({
      ctx,
      params,
      name,
      pageId,
      areaConfig: areasConfig[name],
      timeChunk,
    });
  }
  return response;
}
