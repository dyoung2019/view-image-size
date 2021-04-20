# view-image-size

[![NPM version](https://img.shields.io/npm/v/view-image-size.svg?style=flat)](https://www.npmjs.com/package/view-image-size)

An in-browser module to get dimensions (i.e. width, height, type) of an image file (by using a DataView).

common.js & es6 module supported
node v12.7.0 (vscode) is required

## Installation

```shell
npm install view-image-size --save
```

## Supported formats

* BMP
* CUR
* DDS
* GIF
* ICNS
* ICO
* JPEG
* KTX
* PNG
* PNM (PAM, PBM, PFM, PGM, PPM)
* PSD
* SVG
* TIFF
* WebP

## API

> Types

````typescript
export interface ISize {
  width: number; 
  height: number;
}

export interface ISizeCalculationResult {
  width: number;
  height: number;
  type: string;
  images?: ISize[];
};

// js callback
export type ToAsciiCallback = {
  (view: DataView, begin: number, end: number): string;
};
````

> retrieve size from a DataView

````typescript
export function imageSize(
  view: DataView,
  toAscii: ToAsciiCallback
): ISizeCalculationResult;

````

> retrieve size of TIFF image (in a DataView) instead of loading the entire image into memory

````typescript
// 1) detect the image type
export function detectImageType(
  view: DataView,
  toAscii: ToAsciiCallback,
): string | undefined;

// 2) Test if the TIFF is Big Endian or Little Endian
export default function isTiffBigEndian(
  view: DataView,
  toAscii: ToAsciiCallback,
  offset: number,
): boolean;

// 3) Retrieve size by stepping thru each IFD directory at a time
export default function viewTiffImage(
  isBigEndian: boolean,
  adjust: (position: number, minimumSize: number) => DataView
): ISizeCalculationResult

````

## Examples 

### Node 

>  Example 1 (js / commonjs)

````js
import { imageSize } from 'view-image-size/es6';

function toAscii(view, begin, end) {
  return Buffer.from(view.buffer).toString('ascii', begin, end);
}

// load image into ArrayBuffer
const view = new DataView( /** ... ***/ );
const result = imageSize(view, toAscii);

// { height: 100, width: 100, type: 'jpg' }
console.log(result);
````

>  Example 2 (typescript / es6)

````typescript
import { imageSize } from 'view-image-size/es6';

export default function toAscii(view: DataView, begin: number, end: number): string {
  return Buffer.from(view.buffer).toString('ascii', begin, end);
}

// load image into ArrayBuffer
const view = new DataView( ... );
const result = imageSize(view, toAscii);

// { height: 100, width: 100, type: 'jpg' }
console.log(result);

````

>  Example 3 - loading a tiff image (typescript / es6)

````typescript
import { 
  imageSize, 
  detectImageType,
  isTiffBigEndian
} from 'view-image-size/es6';

const toAscii = (view: DataView, begin: number, end: number) :string => {
  return Buffer.from(view.buffer).toString('ascii', begin, end);
}

const adjustView = (position: number, minimumSize: number): DataView => {
  return setupView(testFilePath, 1024, position);
}

const view = new DataView( ... );
const imageType = detectImageType(view, toAscii);
if (imageType === 'tiff') {
  const offset = 0
  const isBigEndian = isTiffBigEndian(view, toAscii ,offset);

  // get image size
  const size = viewTiffImage(isBigEndian, adjustView);
}

````

### In-browser

> Html

````html
<div class="output-panel"></div>
````

> JS Script 
````js
const outputPanel = document.querySelector('.output-panel');

const decoder = new TextDecoder('ascii');
const toAscii = (view: DataView, begin: number, end: number) => {
  const segment = view.buffer.slice(begin, end);
  return decoder.decode(segment);
}

function getImageResponse(imgPath) {
  let myRequest = new Request(imgPath);

  fetch(myRequest)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.arrayBuffer();
  })
  .then(arrayBuf => {
    const sizeOfImage = () => {
      const dv = new DataView(arrayBuf);
      return imageSize(dv, toAscii);
    }

    const output = sizeOfImage();
    outputPanel.textContent = JSON.stringify(output);
  });
}
````

## License

MIT License

## Credits

fork of [image-size](https://github.com/image-size/image-size)

