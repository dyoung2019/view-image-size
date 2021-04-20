import toHexadecimal from '../toHexadecimal.js';

/** @internal */
export default function validateJPG(view: DataView): string {
  const SOIMarker = toHexadecimal(view, 0, 2);
  return SOIMarker;
}
