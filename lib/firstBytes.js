import typeHandlers from './types/typeHandlers.js';
const keys = Object.keys(typeHandlers);
// This map helps avoid validating for every single image type
const firstBytes = {
    0x38: 'psd',
    0x42: 'bmp',
    0x44: 'dds',
    0x47: 'gif',
    // 0x49: 'tiff',
    // 0x4d: 'tiff',
    0x52: 'webp',
    0x69: 'icns',
    0x89: 'png',
    0xff: 'jpg',
};
/** @internal */
export default firstBytes;
