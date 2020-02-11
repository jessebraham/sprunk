const DEFAULT_COLOUR_PALETTE = [
  { name: "Black", hexValue: "#000000" },
  { name: "White", hexValue: "#FFFFFF" },
  { name: "Grey", hexValue: "#9D9D9D" },
  { name: "Red", hexValue: "#BE2633" },
  { name: "Pink", hexValue: "#E06F8B" },
  { name: "Dark Brown", hexValue: "#493C2B" },
  { name: "Light Brown", hexValue: "#A46422" },
  { name: "Orange", hexValue: "#EB8931" },
  { name: "Yellow", hexValue: "#F7E26B" },
  { name: "Dark Green", hexValue: "#2F484E" },
  { name: "Green", hexValue: "#44891A" },
  { name: "Yellow-Green", hexValue: "#A3CE27" },
  { name: "Navy Blue", hexValue: "#1B2632" },
  { name: "Blue", hexValue: "#005784" },
  { name: "Light Blue", hexValue: "#31A2F2" },
  { name: "Sky Blue", hexValue: "#B2DCEF" },
];

export const Colour = {
  palette: null,
  selected: null,

  init: () => {
    Colour.palette = DEFAULT_COLOUR_PALETTE;
    Colour.selected = Colour.palette[0];
  },

  select: hexValue => {
    const colour = Colour.palette.find(colour => colour.hexValue === hexValue);
    Colour.selected = colour;
  },
};
