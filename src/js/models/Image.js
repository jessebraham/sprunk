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
    Image.setPixel(x, y, "#FFFFFF");
  },
};
