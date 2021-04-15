# view-image-size

A in-browser module to get dimensions (i.e. width, height, type) of an image file (by using a DataView)

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

## Installation

```shell
npm install view-image-size --save
```

## API

````ts

export interface ISizeCalculationResult {
  width: number | undefined;
  height: number | undefined;
  type: string;
  images?: ISize[];
};

// js callback
export type ToAsciiCallback = {
  (view: DataView, begin: number, end: number): string;
};

export function imageSize(
  view: DataView,
  toAscii: ToAsciiCallback,
): ISizeCalculationResult

/**
 * detect the image type
 *
 * @param {DataView} view - view of buffer
 * @param {function} toAscii - function to transform byte to ascii string
 * @returns {imageType | undefined} - returns image type (as string)
 **/
export function detectImageType = (
  view: DataView,
  toAscii: ToAsciiCallback,
): imageType | undefined => {

````

## Examples 

### Node

````js
const sizeOf = require('view-image-size');




````

### Web

````js

````

#### Snowpack

````js

````


## Credits

fork of [image-size](https://github.com/image-size/image-size)

## [Contributors](Contributors.md)
