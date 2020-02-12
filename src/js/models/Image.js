// Since JavaScript doesn't provide a way to deep copy objects, we'll make our
// own... with blackjack and hookers!
const clone = obj => {
  return JSON.parse(JSON.stringify(obj));
};

export const Image = {
  size: null,
  pixels: null,
  history: null,
  future: null,

  init: size => {
    Image.size = size;
    Image.reset();
  },

  reset: () => {
    Image.pixels = [];
    for (let y = 0; y < Image.size; y++) {
      Image.pixels[y] = [];
      for (let x = 0; x < Image.size; x++) {
        Image.pixels[y][x] = null;
      }
    }

    Image.history = [];
    Image.future = [];
  },

  getPixel: (x, y) => {
    return Image.pixels[y][x];
  },

  setPixel: (x, y, colour) => {
    if (Image.future.length) {
      Image.future = [];
    }
    Image.history.push(clone(Image.pixels));
    Image.pixels[y][x] = colour;
  },

  clearPixel: (x, y) => {
    if (Image.future.length) {
      Image.future = [];
    }
    Image.setPixel(x, y, null);
  },

  clear: () => {
    for (let y = 0; y < Image.pixels.length; y++) {
      for (let x = 0; x < Image.pixels[y].length; x++) {
        Image.clearPixel(x, y);
      }
    }
  },

  fill: (x, y, targetColour, replacementColour) => {
    if (Image.future.length) {
      Image.future = [];
    }
    Image.history.push(clone(Image.pixels));
    Image.floodFill(x, y, targetColour, replacementColour);
  },

  // https://en.wikipedia.org/wiki/Flood_fill#Stack-based_recursive_implementation_(four-way)
  floodFill: (x, y, targetColour, replacementColour) => {
    if (
      Image.validCoordinate(x, y) &&
      Image.getPixel(x, y) === targetColour &&
      targetColour !== replacementColour
    ) {
      Image.pixels[y][x] = replacementColour;
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

  undo: () => {
    if (Image.history.length) {
      Image.future.push(clone(Image.pixels));
      Image.pixels = Image.history.pop();
    }
  },

  redo: () => {
    if (Image.future.length) {
      Image.history.push(clone(Image.pixels));
      Image.pixels = Image.future.pop();
    }
  },
};
