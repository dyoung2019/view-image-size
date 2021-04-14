import type { ToAsciiCallback } from './interface';
export declare type TiffTagLookup = {
    [key: number]: number;
};
export declare function isBigEndian(view: DataView, toAscii: ToAsciiCallback, offset: number): boolean;
export declare function getIdfOffsetLocation(): number;
export declare function getIdfOffset(view: DataView, isBigEndian: boolean, offset?: number): number;
export declare function getNoOfIdfEntries(view: DataView, offset: number, isBigEndian: boolean): number;
export declare const TIFF_IDF_COUNT_STRIDE = 2;
export declare const TIFF_IDF_OFFSET_SIZE = 4;
export declare const TIFF_IDF_ENTRY_STRIDE = 12;
export declare function beginIndexForIdf(offset: number): number;
export declare function getStrideForIdf(): number;
export declare function endIndexForIdf(offset: number, noOfEntries: number): number;
export declare function extractIdfEntry(tags: TiffTagLookup, view: DataView, directoryOffset: number, isBigEndian: boolean): void;
export declare function intoResult(tags: TiffTagLookup): {
    height: number;
    width: number;
    type: string;
};
