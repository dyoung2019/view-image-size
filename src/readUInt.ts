/** @internal */
export function readInt16LE(view: DataView, offset: number) {
  return view.getInt16(offset, true);
}

/** @internal */
export function readInt32LE(view: DataView, offset: number): number {
  return view.getInt32(offset, true);
}

/** @internal */
export function readUInt24LE(view: DataView, offset: number): number {
  return view.getUint32(offset, true) & 0xffffff;
}

/** @internal */
export function readUInt16(
  view: DataView,
  offset: number,
  isBigEndian: boolean,
): number {
  return view.getUint16(offset, !isBigEndian);
}

/** @internal */
export function readUInt16BE(view: DataView, offset: number): number {
  return view.getUint16(offset, false);
}

/** @internal */
export function readUInt16LE(view: DataView, offset: number): number {
  return view.getUint16(offset, true);
}

/** @internal */
export function readUInt32(
  view: DataView,
  offset: number,
  isBigEndian: boolean,
): number {
  return view.getUint32(offset, !isBigEndian);
}

/** @internal */
export function readUInt32BE(view: DataView, offset: number): number {
  return view.getUint32(offset, false);
}

/** @internal */
export function readUInt32LE(view: DataView, offset: number): number {
  return view.getUint32(offset, true);
}
