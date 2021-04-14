"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intoResult = exports.extractIdfEntry = exports.endIndexForIdf = exports.getStrideForIdf = exports.beginIndexForIdf = exports.TIFF_IDF_ENTRY_STRIDE = exports.TIFF_IDF_OFFSET_SIZE = exports.TIFF_IDF_COUNT_STRIDE = exports.getNoOfIdfEntries = exports.getIdfOffset = exports.getIdfOffsetLocation = exports.isBigEndian = void 0;
const readUInt_1 = require("../readUInt");
// Test if the TIFF is Big Endian or Little Endian
function isBigEndian(view, toAscii, offset) {
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
exports.isBigEndian = isBigEndian;
const TIFF_FILE_DEFAULT = 4;
function getIdfOffsetLocation() {
    return TIFF_FILE_DEFAULT;
}
exports.getIdfOffsetLocation = getIdfOffsetLocation;
function getIdfOffset(view, isBigEndian, offset = TIFF_FILE_DEFAULT) {
    return readUInt_1.readUInt32(view, offset, isBigEndian);
}
exports.getIdfOffset = getIdfOffset;
const SHORT_TYPE = 3;
const LONG_TYPE = 4;
function getNoOfIdfEntries(view, offset, isBigEndian) {
    return readUInt_1.readUInt16(view, offset, isBigEndian);
}
exports.getNoOfIdfEntries = getNoOfIdfEntries;
exports.TIFF_IDF_COUNT_STRIDE = 2;
exports.TIFF_IDF_OFFSET_SIZE = 4;
exports.TIFF_IDF_ENTRY_STRIDE = 12;
function beginIndexForIdf(offset) {
    return offset + 2;
}
exports.beginIndexForIdf = beginIndexForIdf;
function getStrideForIdf() {
    return exports.TIFF_IDF_ENTRY_STRIDE;
}
exports.getStrideForIdf = getStrideForIdf;
function endIndexForIdf(offset, noOfEntries) {
    return offset + 2 + noOfEntries * exports.TIFF_IDF_ENTRY_STRIDE;
}
exports.endIndexForIdf = endIndexForIdf;
// Extract IFD tags from TIFF metadata
function extractIdfEntry(tags, view, directoryOffset, isBigEndian) {
    const code = readUInt_1.readUInt16(view, directoryOffset + 0, isBigEndian);
    const type = readUInt_1.readUInt16(view, directoryOffset + 2, isBigEndian);
    const count = readUInt_1.readUInt32(view, directoryOffset + 4, isBigEndian);
    // 256 is width, 257 is height
    // if (code === 256 || code === 257) {
    // singular values not arrays or string
    if (count === 1) {
        const valueFieldOffset = directoryOffset + 8;
        switch (type) {
            case SHORT_TYPE:
                tags[code] = readUInt_1.readUInt16(view, valueFieldOffset, isBigEndian);
                break;
            case LONG_TYPE:
                tags[code] = readUInt_1.readUInt32(view, valueFieldOffset, isBigEndian);
                break;
        }
    }
}
exports.extractIdfEntry = extractIdfEntry;
const WIDTH_TAG = 256;
const HEIGHT_TAG = 257;
function intoResult(tags) {
    const width = tags[WIDTH_TAG];
    const height = tags[HEIGHT_TAG];
    if (!width || !height) {
        throw new TypeError('Invalid Tiff. Missing tags');
    }
    return { height, width, type: 'tiff' };
}
exports.intoResult = intoResult;
