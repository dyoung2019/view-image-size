import type { ISizeCalculationResult, ToAsciiCallback } from './types/interface';
import viewTiff from './viewTiffImage';
import { isBigEndian } from './types/tiffHelpers';
/**
 * get image size and type from a DataView of buffer
 *
 * @param {DataView} view - view of buffer
 * @param {function} toAscii - function to transform byte to ascii string
 * @returns {
 *  {
 *  width: number,
 *  height: number,
 *  orientation?: number,
 *  type?: string
 * }
 * } image size
 */
export declare const imageSize: {
    (view: DataView, toAscii: ToAsciiCallback): ISizeCalculationResult;
    default: any;
};
export declare const detectImageType: {
    (view: DataView, toAscii: ToAsciiCallback): "svg" | "icns" | "tiff" | "bmp" | "cur" | "dds" | "gif" | "ico" | "j2c" | "jp2" | "jpg" | "ktx" | "png" | "pnm" | "psd" | "webp" | undefined;
    default: any;
};
export declare const isTiffBigEndian: typeof isBigEndian;
export declare const viewTiffImage: typeof viewTiff;
export default imageSize;
