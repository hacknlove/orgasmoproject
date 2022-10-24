import type { currentChunkReturn } from "../../lib/timechunks";
interface getItemsParameters {
    items: any[];
    params?: Record<string, any>;
    ctx: Record<string, any>;
    limit?: number;
    timeChunk: currentChunkReturn;
    getItem?: string;
}
export default function getItems({ items: itemsProp, params, ctx, limit, timeChunk, getItem, }: getItemsParameters): Promise<any[]>;
export {};
