import toHexadecimal from '../toHexadecimal';
/** @internal */
export default function validateJPG(view) {
    const SOIMarker = toHexadecimal(view, 0, 2);
    return SOIMarker;
}
