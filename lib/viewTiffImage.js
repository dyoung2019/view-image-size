import { getIdfOffsetLocation, getIdfOffset, getStrideForIdf, extractIdfEntry, intoResult, beginIndexForIdf, getNoOfIdfEntries, endIndexForIdf, TIFF_IDF_COUNT_STRIDE, TIFF_IDF_OFFSET_SIZE } from './types/tiffHelpers';
const moveToIdfCount = (pos, adjust) => {
    return adjust(pos, TIFF_IDF_COUNT_STRIDE); // 2 bytes
};
const getMinimumBufferSizeRequired = (location) => {
    return TIFF_IDF_COUNT_STRIDE + location + TIFF_IDF_OFFSET_SIZE;
};
const readIdfCount = (view, isBigEndian) => {
    const count = getNoOfIdfEntries(view, 0, isBigEndian);
    return count;
};
export default function viewTiffImage(isBigEndian, adjust) {
    const tags = {};
    // BEGINNING
    const START_OF_FILE = 0;
    const TIFF_HEADER_SIZE = 8;
    // user-specified / ADJUST
    let view = adjust(START_OF_FILE, TIFF_HEADER_SIZE);
    let initLocation = getIdfOffsetLocation(); // 4
    let offset = getIdfOffset(view, isBigEndian, initLocation);
    const stride = getStrideForIdf();
    do {
        const LOCAL_OFFSET = 0;
        view = moveToIdfCount(offset, adjust);
        const count = readIdfCount(view, isBigEndian);
        const end = endIndexForIdf(0, count);
        const bufferSize = getMinimumBufferSizeRequired(end);
        view = adjust(offset, bufferSize);
        const begin = beginIndexForIdf(LOCAL_OFFSET);
        for (let i = begin; i < end; i += stride) {
            extractIdfEntry(tags, view, i, isBigEndian);
        }
        // MOVE NEXT
        const nextOffset = getIdfOffset(view, isBigEndian, end);
        // console.log('nextOffset', nextOffset);
        offset = nextOffset;
    } while (offset !== 0);
    // console.log(JSON.stringify(tags));
    return intoResult(tags);
}
