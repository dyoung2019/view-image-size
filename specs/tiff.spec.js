const toAscii = require('./toAscii');
const {default: detectImageType} = require('../build/detectImageType.js');
const setupView = require('./setupView');
const {TIFF: tiff} = require('../build/types/tiff');
const {default: isTiffBigEndian} = require('../build/isTiffBigEndian');
const {default: viewTiffImage} = require('../build/viewTiffImage');
const th = require('../build/types/tiffHelpers');
    // getIdfOffset, 
    // beginIndexForIdf,
    // getNoOfIdfEntries,
    // endIndexForIdf,
    // getStrideForIdf,
    // extractIdfEntry


describe('tiff file test', () => {
  const testCases = [
    [
      "specs/images/valid/tiff/big-endian.tiff",
      1024,
      "tiff",
      true,
      224360,
      17,
      {type: 'tiff', width: 123, height: 456}
    ],
    [
      "specs/images/valid/tiff/jpeg.tiff",
      4096,
      "tiff",
      false,
      33416,
      18,
      {type: 'tiff', width: 123, height: 456}
    ],
    [
      "specs/images/valid/tiff/little-endian.tiff",
      4096,
      "tiff",
      false,
      157220,
      17,
      {type: 'tiff', width: 123, height: 456}
    ],
  ]

  describe.each(testCases)('%s', (testFilePath, bufferSize, imageType, isBigEndian, idfOffset, noOfEntries, expected) => {
    test('imageType', () => {
      const view = setupView(testFilePath, bufferSize);
      const type = detectImageType(view, toAscii);
      expect(type).toBe(imageType)
    })

    test('validate', () => {
      const view = setupView(testFilePath, bufferSize);
      const actual = tiff.validate(view, toAscii);
      expect(actual).toEqual(true);
    })

    test('isBigEndian', () => {
      const view = setupView(testFilePath, 1024);
      const actual = isTiffBigEndian(view, toAscii, 0);
      expect(actual).toEqual(isBigEndian);
    })

    test('isOffset', () => {
      const view = setupView(testFilePath, 1024);
      const actual = th.getIdfOffset(view, isBigEndian);
      expect(actual).toEqual(idfOffset);
    })

    test('noOfEntries', () => {
      const tags = {}
      const view = setupView(testFilePath, 1024, idfOffset);
      
      const actual = th.getNoOfIdfEntries(view, 0, isBigEndian);

      expect(actual).toEqual(noOfEntries);
    });

    describe('single loop', () => {
      const tags = {}
      const view = setupView(testFilePath, 1024, idfOffset);
      
      const doLoop  = () => {
        const zeroOffset = 0
        const begin = th.beginIndexForIdf(zeroOffset);
        const end = th.endIndexForIdf(zeroOffset, noOfEntries);
        const stride = th.getStrideForIdf();

        for (let i = begin; i < end; i += stride) {
          th.extractIdfEntry(tags, view, i, isBigEndian);
        }
      }
      
      test('loop no throw', () => {
        expect(doLoop).not.toThrow();
      })
    });

    const adjustView = (position, minimumSize) => {
      return setupView(testFilePath, 1024, position);
    }

    describe('full loop', () => {
      const doLoop  = () => {
        viewTiffImage(isBigEndian, adjustView);
      }
      
      test('loop no throw', () => {
        expect(doLoop).not.toThrow();
      })
    })

    describe('result', () => {
      const actual = viewTiffImage(isBigEndian, adjustView);
      test('width', () => {
        expect(actual.width).toEqual(expected.width)
      })
      test('height', () => {
        expect(actual.height).toEqual(expected.height)
      })
      test('type', () => {
        expect(actual.type).toEqual(expected.type)
      })
    })
  })
})