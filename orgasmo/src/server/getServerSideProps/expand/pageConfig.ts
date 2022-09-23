import { decencode } from "cencode";
import { cleanAwaitJson } from "../../lib/cleanJson";
import { currentTimeChunk } from "../../lib/timechunks";
import rewrite from "../rewrite";
import expandLayout from "./layout";
import expandAreas from "./areas";

interface expandPageConfigParameters {
  ctx: any;
  pageConfig: any;
  key: string;
  params?: any;
}

export default async function expandPageConfig({
  ctx,
  pageConfig,
  key,
  params,
}: expandPageConfigParameters): Promise<any>;
export default async function expandPageConfig({
  ctx,
  pageConfig,
  key,
  params = undefined,
}) {
  if (pageConfig.getFlowControl) {
    params = params || decencode(key);
    pageConfig.flowControl = {
      ...pageConfig.flowControl,
      ...await ctx.driver[pageConfig.getFlowControl]?.({ ctx, params })
    }
  }

  if (pageConfig.flowControl?.redirect) {
    return {
      redirect: pageConfig.flowControl.redirect,
    };
  }

  if (pageConfig.flowControl?.rewrite) {
    return rewrite({ ctx, rewrite: pageConfig.flowControl.rewrite, key });
  }

  const timeChunk = currentTimeChunk(pageConfig.cache);

  params = params || decencode(key);

  return cleanAwaitJson({
    props: {
      layout: expandLayout({ ctx, params, layoutConfig: pageConfig.layout}),
      areas: expandAreas({ ctx, areasConfig: pageConfig.areas, params, timeChunk })
    }
  });
}
