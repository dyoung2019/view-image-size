import { detector } from './detector.js';
import type { imageType } from './types/index.js';
import { typeHandlers } from './types/index.js';
import type { ISizeCalculationResult, ToAsciiCallback } from './types/interface.js';

/**
 * Return size information based on a buffer
 *
 * @param {imageType | undefined} type detector return by detectType()
 * @param {DataView} view
 * @param {function} toAscii - function to transform byte to ascii string
 * @returns {ISizeCalculationResult}
 */
export function lookup(
  type: imageType | undefined,
  view: DataView,
  cb: ToAsciiCallback
): ISizeCalculationResult { 

  if (typeof type !== 'undefined') {
    // find an appropriate handler for this file type
    if (type in typeHandlers) {
      const size = typeHandlers[type].calculate(view, cb);
      if (size !== undefined) {
        size.type = type;
        return size;
      }
    }
  }

  // throw up, if we don't understand the image type
  throw new TypeError(
    'unsupported image type: ' + type,
  );
}

/**
 * detect the image type 
 * 
 * @param {DataView} view - view of buffer
 * @param {function} toAscii - function to transform byte to ascii string
 * @returns {
 **/
export function detect(view: DataView, toAscii: ToAsciiCallback): imageType | undefined {
  return detector(view, toAscii);
}

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
export function imageSize(view: DataView, toAscii: ToAsciiCallback): ISizeCalculationResult {
  if (typeof toAscii !== 'function') {
    throw new Error('toAscii is not a callback function')
  }
  
  // detect the file type.. don't rely on the extension
  const type = detect(view, toAscii);
  return lookup(type, view, toAscii);
}