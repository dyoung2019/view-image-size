import { readUInt32BE } from '../readUInt.js';
import toHexadecimal from '../toHexadecimal.js';
/** @internal */
export const J2C = {
    validate(buffer) {
        // TODO: this doesn't seem right. SIZ marker doesnt have to be right after the SOC
        return toHexadecimal(buffer, 0, 4) === 'ff4fff51';
    },
    calculate(buffer) {
        return {
            height: readUInt32BE(buffer, 12),
            width: readUInt32BE(buffer, 8),
        };
    },
};
