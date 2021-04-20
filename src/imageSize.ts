import type {
  ISizeCalculationResult,
  ToAsciiCallback,
} from './types/interface.js';
import lookup from './lookup.js';
import detectImageType from './detectImageType.js';

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
/** @internal */
export default function imageSize(
  view: DataView,
  toAscii: ToAsciiCallback,
): ISizeCalculationResult {
  if (typeof toAscii !== 'function') {
    throw new Error('toAscii is not a callback function');
  }

  // detect the file type.. don't rely on the extension
  const type = detectImageType(view, toAscii);
  return lookup(type, view, toAscii);
};
