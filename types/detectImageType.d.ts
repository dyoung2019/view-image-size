import type { imageType } from './types/imageType.js';
import type { ToAsciiCallback } from './types/interface.js';
/**
 * detect the image type
 *
 * @param {DataView} view - view of buffer
 * @param {function} toAscii - function to transform byte to ascii string
 * @returns {imageType | undefined} - returns image type (as string)
 **/
export default function detectImageType(view: DataView, toAscii: ToAsciiCallback): imageType | undefined;
