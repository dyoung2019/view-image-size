function toAscii(view, begin, end) {
  return Buffer.from(view.buffer).toString('ascii', begin, end);
}

module.exports = toAscii;