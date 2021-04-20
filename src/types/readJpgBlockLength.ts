import { readUInt16BE } from '../readUInt.js';

/** @internal */
export default function readJpgBlockLength(view: DataView, offset: number) {
  // read length of the next block
  return readUInt16BE(view, offset);
}
