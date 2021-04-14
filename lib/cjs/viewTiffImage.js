"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tiffHelpers_1 = require("./types/tiffHelpers");
const moveToIdfCount = (pos, adjust) => {
    return adjust(pos, tiffHelpers_1.TIFF_IDF_COUNT_STRIDE); // 2 bytes
};
const getMinimumBufferSizeRequired = (location) => {
    return tiffHelpers_1.TIFF_IDF_COUNT_STRIDE + location + tiffHelpers_1.TIFF_IDF_OFFSET_SIZE;
};
const readIdfCount = (view, isBigEndian) => {
    const count = tiffHelpers_1.getNoOfIdfEntries(view, 0, isBigEndian);
    return count;
};
function viewTiffImage(isBigEndian, adjust) {
    const tags = {};
    // BEGINNING
    const START_OF_FILE = 0;
    const TIFF_HEADER_SIZE = 8;
    // user-specified / ADJUST
    let view = adjust(START_OF_FILE, TIFF_HEADER_SIZE);
    let initLocation = tiffHelpers_1.getIdfOffsetLocation(); // 4
    let offset = tiffHelpers_1.getIdfOffset(view, isBigEndian, initLocation);
    const stride = tiffHelpers_1.getStrideForIdf();
    do {
        const LOCAL_OFFSET = 0;
        view = moveToIdfCount(offset, adjust);
        const count = readIdfCount(view, isBigEndian);
        const end = tiffHelpers_1.endIndexForIdf(0, count);
        const bufferSize = getMinimumBufferSizeRequired(end);
        view = adjust(offset, bufferSize);
        const begin = tiffHelpers_1.beginIndexForIdf(LOCAL_OFFSET);
        for (let i = begin; i < end; i += stride) {
            tiffHelpers_1.extractIdfEntry(tags, view, i, isBigEndian);
        }
        // MOVE NEXT
        const nextOffset = tiffHelpers_1.getIdfOffset(view, isBigEndian, end);
        // console.log('nextOffset', nextOffset);
        offset = nextOffset;
    } while (offset !== 0);
    // console.log(JSON.stringify(tags));
    return tiffHelpers_1.intoResult(tags);
}
exports.default = viewTiffImage;
