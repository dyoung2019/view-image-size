import { readUInt16, readUInt32 } from '../readUInt';

/** @internal */
export type TiffTagLookup = { [key: number]: number };

const TIFF_FILE_DEFAULT = 4;
/** @internal */
export function getIdfOffsetLocation(): number {
  return TIFF_FILE_DEFAULT;
}

/** @internal */
export function getIdfOffset(
  view: DataView,
  isBigEndian: boolean,
  offset: number = TIFF_FILE_DEFAULT,
) {
  return readUInt32(view, offset, isBigEndian);
}

const SHORT_TYPE = 3;
const LONG_TYPE = 4;

/** @internal */
export function getNoOfIdfEntries(
  view: DataView,
  offset: number,
  isBigEndian: boolean,
) {
  return readUInt16(view, offset, isBigEndian);
}

/** @internal */
export const TIFF_IDF_COUNT_STRIDE = 2;
/** @internal */
export const TIFF_IDF_OFFSET_SIZE = 4;
/** @internal */
export const TIFF_IDF_ENTRY_STRIDE = 12;

/** @internal */
export function beginIndexForIdf(offset: number): number {
  return offset + 2;
}

/** @internal */
export function getStrideForIdf(): number {
  return TIFF_IDF_ENTRY_STRIDE;
}

/** @internal */
export function endIndexForIdf(offset: number, noOfEntries: number): number {
  return offset + 2 + noOfEntries * TIFF_IDF_ENTRY_STRIDE;
}

// Extract IFD tags from TIFF metadata
/** @internal */
export function extractIdfEntry(
  tags: TiffTagLookup,
  view: DataView,
  directoryOffset: number,
  isBigEndian: boolean,
): void {
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

/** @internal */
export function intoResult(tags: TiffTagLookup) {
  const width = tags[WIDTH_TAG];
  const height = tags[HEIGHT_TAG];

  if (!width || !height) {
    throw new TypeError('Invalid Tiff. Missing tags');
  }

  return { height, width, type: 'tiff' };
}
