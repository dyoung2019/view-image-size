import firstBytes from './firstBytes.js';
import type { imageType } from './types/imageType.js';
import typeHandlers from './types/typeHandlers.js';
import type { ToAsciiCallback } from './types/interface.js';
import { specificHandlers } from './types/specificHandlers.js';

/**
 * detect the image type
 *
 * @param {DataView} view - view of buffer
 * @param {function} toAscii - function to transform byte to ascii string
 * @returns {imageType | undefined} - returns image type (as string)
 **/
export default function detectImageType(
  view: DataView,
  toAscii: ToAsciiCallback,
): imageType | undefined {
  const detectionByFirstByte = (): [
    found: boolean,
    handleType: imageType | undefined,
  ] => {
    const byte = view.getUint8(0);
    if (byte in firstBytes) {
      const byteType = firstBytes[byte];
      if (byteType && typeHandlers[byteType].validate(view, toAscii)) {
        return [true, byteType];
      }
    }
    return [false, undefined];
  };

  const loopThruSpecificHandlers = (): imageType | undefined => {
    for (let i = 0; i < specificHandlers.length; i += 1) {
      const key = specificHandlers[i];
      const handler = typeHandlers[key];
      const specificResult = handler.validate(view, toAscii);
      if (specificResult) {
        return key;
      }
    }
    return undefined;
  };

  const [found, handleType] = detectionByFirstByte();

  if (found) {
    return handleType;
  } else {
    return loopThruSpecificHandlers();
  }
};
