// Test if the TIFF is Big Endian or Little Endian
export default function isTiffBigEndian(view, toAscii, offset) {
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