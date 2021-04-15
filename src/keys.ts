import type { imageType } from './types/imageType';
import typeHandlers from './types/typeHandlers';

const keys = Object.keys(typeHandlers) as imageType[];

/** @internal */
export default keys;
