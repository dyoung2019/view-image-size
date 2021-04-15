import { readUInt32BE } from '../readUInt';
export const PSD = {
    validate(buffer, toAscii) {
        return '8BPS' === toAscii(buffer, 0, 4);
    },
    calculate(buffer) {
        return {
            height: readUInt32BE(buffer, 14),
            width: readUInt32BE(buffer, 18),
        };
    },
};