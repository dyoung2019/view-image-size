import toHexadecimal from '../toHexadecimal';

/** @internal */
export default function validateJPG(view: DataView): string {
  const SOIMarker = toHexadecimal(view, 0, 2);
  return SOIMarker;
}
