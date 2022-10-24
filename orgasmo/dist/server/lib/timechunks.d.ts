export interface currentChunkParameters {
    cacheExpiration?: number;
    cacheRenew?: number;
}
export interface currentChunkReturn {
    revalidate: number;
    expire: number;
}
export declare function currentTimeChunk(parameters: currentChunkParameters): currentChunkReturn;
export declare function currentTimeChunk(): currentChunkReturn;
interface maxTimeChunkParameters {
    timeChunkConf?: currentChunkParameters;
    timeChunk: currentChunkReturn;
}
export declare function maxTimeChunk({ timeChunkConf, timeChunk, }: maxTimeChunkParameters): currentChunkReturn;
export {};
