import lookup from './lookup';
import detectType from './detectImageType';
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
export const imageSize = (view, toAscii) => {
    if (typeof toAscii !== 'function') {
        throw new Error('toAscii is not a callback function');
    }
    // detect the file type.. don't rely on the extension
    const type = detectType(view, toAscii);
    return lookup(type, view, toAscii);
};
export const detectImageType = detectType;
export const isTiffBigEndian = isBigEndian;
export const viewTiffImage = viewTiff;
imageSize.default = imageSize;
export default imageSize;
