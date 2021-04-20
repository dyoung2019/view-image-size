import type { imageType } from './types/imageType.js';
import typeHandlers from './types/typeHandlers.js';

const keys = Object.keys(typeHandlers) as imageType[];

/** @internal */
export default keys;
