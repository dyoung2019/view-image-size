"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firstBytes_1 = __importDefault(require("./firstBytes"));
const typeHandlers_1 = __importDefault(require("./types/typeHandlers"));
const specificHandlers_1 = require("./types/specificHandlers");
/**
 * detect the image type
 *
 * @param {DataView} view - view of buffer
 * @param {function} toAscii - function to transform byte to ascii string
 * @returns {imageType | undefined} - returns image type (as string)
 **/
const detectType = (view, toAscii) => {
    const detectionByFirstByte = () => {
        const byte = view.getUint8(0);
        if (byte in firstBytes_1.default) {
            const byteType = firstBytes_1.default[byte];
            if (byteType && typeHandlers_1.default[byteType].validate(view, toAscii)) {
                return [true, byteType];
            }
        }
        return [false, undefined];
    };
    const loopThruSpecificHandlers = () => {
        for (let i = 0; i < specificHandlers_1.specificHandlers.length; i += 1) {
            const key = specificHandlers_1.specificHandlers[i];
            const handler = typeHandlers_1.default[key];
            const specificResult = handler.validate(view, toAscii);
            if (specificResult) {
                return key;
            }
        }
        return undefined;
    };
    const [found, handleType] = detectionByFirstByte();
    if (found) {
        return handleType;
    }
    else {
        return loopThruSpecificHandlers();
    }
};
detectType.default = detectType;
exports.default = detectType;
