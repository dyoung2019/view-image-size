import sizeOf from './sizeOf';
export { default as detectImageType } from './detectImageType';
export { default as viewTiffImage } from './viewTiffImage';
export { default as isTiffBigEndian } from './isTiffBigEndian';
/**
 * get image size and type from a DataView of buffer
 *
 * @param {DataView} view - view of buffer
 * @param {function} toAscii - function to transform byte to ascii string
 * @returns {
 *  {
 *    width: number,
 *    height: number,
 *    images: []
 *    type: string
 *  }
 * } image size
 */
export const imageSize = (view, toAscii) => {
    return sizeOf(view, toAscii);
};
imageSize.default = sizeOf;
export default imageSize;
