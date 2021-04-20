import type { ISizeCalculationResult, ToAsciiCallback } from './types/interface.js';
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
export default function imageSize(view: DataView, toAscii: ToAsciiCallback): ISizeCalculationResult;
