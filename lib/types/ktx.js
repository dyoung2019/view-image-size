import { readUInt32LE } from '../readUInt';
const SIGNATURE = 'KTX 11';
/** @internal */
export const KTX = {
    validate(buffer, toAscii) {
        return SIGNATURE === toAscii(buffer, 1, 7);
    },
    calculate(buffer) {
        return {
            height: readUInt32LE(buffer, 40),
            width: readUInt32LE(buffer, 36),
        };
    },
};
