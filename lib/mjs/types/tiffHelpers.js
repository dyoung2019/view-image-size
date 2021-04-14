import { readUInt16, readUInt32 } from '../readUInt';
// Test if the TIFF is Big Endian or Little Endian
export function isBigEndian(view, toAscii, offset) {
    const signature = toAscii(view, offset, 2);
    if ('II' === signature) {
        return false;
    }
    else if ('MM' === signature) {
        return true;
    }
    else {
        throw new TypeError(`Tiff endian error - ${signature}`);
    }
}
const TIFF_FILE_DEFAULT = 4;
export function getIdfOffsetLocation() {
    return TIFF_FILE_DEFAULT;
}
export function getIdfOffset(view, isBigEndian, offset = TIFF_FILE_DEFAULT) {
    return readUInt32(view, offset, isBigEndian);
}
const SHORT_TYPE = 3;
const LONG_TYPE = 4;
export function getNoOfIdfEntries(view, offset, isBigEndian) {
    return readUInt16(view, offset, isBigEndian);
}
export const TIFF_IDF_COUNT_STRIDE = 2;
export const TIFF_IDF_OFFSET_SIZE = 4;
export const TIFF_IDF_ENTRY_STRIDE = 12;
export function beginIndexForIdf(offset) {
    return offset + 2;
}
export function getStrideForIdf() {
    return TIFF_IDF_ENTRY_STRIDE;
}
export function endIndexForIdf(offset, noOfEntries) {
    return offset + 2 + noOfEntries * TIFF_IDF_ENTRY_STRIDE;
}
// Extract IFD tags from TIFF metadata
export function extractIdfEntry(tags, view, directoryOffset, isBigEndian) {
    const code = readUInt16(view, directoryOffset + 0, isBigEndian);
    const type = readUInt16(view, directoryOffset + 2, isBigEndian);
    const count = readUInt32(view, directoryOffset + 4, isBigEndian);
    // 256 is width, 257 is height
    // if (code === 256 || code === 257) {
    // singular values not arrays or string
    if (count === 1) {
        const valueFieldOffset = directoryOffset + 8;
        switch (type) {
            case SHORT_TYPE:
                tags[code] = readUInt16(view, valueFieldOffset, isBigEndian);
                break;
            case LONG_TYPE:
                tags[code] = readUInt32(view, valueFieldOffset, isBigEndian);
                break;
        }
    }
}
const WIDTH_TAG = 256;
const HEIGHT_TAG = 257;
export function intoResult(tags) {
    const width = tags[WIDTH_TAG];
    const height = tags[HEIGHT_TAG];
    if (!width || !height) {
        throw new TypeError('Invalid Tiff. Missing tags');
    }
    return { height, width, type: 'tiff' };
}