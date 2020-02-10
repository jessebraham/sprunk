export const Image = {
  pixels: null,

  reset: size => {
    Image.pixels = [];
    for (let y = 0; y < size; y++) {
      Image.pixels[y] = [];
      for (let x = 0; x < size; x++) {
        Image.clearPixel(x, y);
      }
    }
  },

  getPixel: (x, y) => {
    return Image.pixels[y][x];
  },

  setPixel: (x, y, colour) => {
    Image.pixels[y][x] = colour;
  },

  clearPixel: (x, y) => {
    Image.setPixel(x, y, null);
  },

  clear: () => {
    for (let y = 0; y < Image.pixels.length; y++) {
      for (let x = 0; x < Image.pixels[y].length; x++) {
        Image.clearPixel(x, y);
      }
    }
  },

  // https://en.wikipedia.org/wiki/Flood_fill#Stack-based_recursive_implementation_(four-way)
  floodFill: (x, y, targetColour, replacementColour) => {
    if (
      Image.validCoordinate(x, y) &&
      Image.getPixel(x, y) === targetColour &&
      targetColour !== replacementColour
    ) {
      Image.setPixel(x, y, replacementColour);
    } else {
      return;
    }

    Image.floodFill(x + 0, y + 1, targetColour, replacementColour);
    Image.floodFill(x + 0, y - 1, targetColour, replacementColour);
    Image.floodFill(x - 1, y + 0, targetColour, replacementColour);
    Image.floodFill(x + 1, y + 0, targetColour, replacementColour);
  },

  validCoordinate: (x, y) => {
    return (
      x >= 0 && y >= 0 && x < Image.pixels[0].length && y < Image.pixels.length
    );
  },
};
