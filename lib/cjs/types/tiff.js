"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIFF = void 0;
require("../readUInt");
const toHexadecimal_1 = __importDefault(require("../toHexadecimal"));
const tiffHelpers_1 = require("./tiffHelpers");
const signatures = [
    // '492049', // currently not supported
    '49492a00',
    '4d4d002a', // Big Endian
    // '4d4d002a', // BigTIFF > 4GB. currently not supported
];
exports.TIFF = {
    validate(view, toAscii) {
        const fileSignature = toHexadecimal_1.default(view, 0, 4);
        // console.log('file sig', fileSignature);
        return signatures.includes(fileSignature);
    },
    calculate(view, toAscii) {
        // Determine BE/LE
        const initialLocation = tiffHelpers_1.getIdfOffsetLocation();
        const isBigEndian = tiffHelpers_1.isBigEndian(view, toAscii, initialLocation);
        // read the IFD
        const ifdOffset = tiffHelpers_1.getIdfOffset(view, isBigEndian);
        // extract the tags from the IFD
        const tags = {};
        let nextOffset = ifdOffset;
        do {
            const noOfEntries = tiffHelpers_1.getNoOfIdfEntries(view, nextOffset, isBigEndian);
            const start = tiffHelpers_1.beginIndexForIdf(nextOffset);
            const end = tiffHelpers_1.endIndexForIdf(nextOffset, noOfEntries);
            const stride = tiffHelpers_1.getStrideForIdf();
            for (let i = start; i < end; i += stride) {
                tiffHelpers_1.extractIdfEntry(tags, view, i, isBigEndian);
            }
            nextOffset = tiffHelpers_1.getIdfOffset(view, isBigEndian, end);
        } while (nextOffset !== 0);
        return tiffHelpers_1.intoResult(tags);
    },
};
