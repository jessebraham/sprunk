import { Crosshair, Droplet, Edit2, Trash2 } from "mithril-feather-icons";

const TOOLS = [
  { name: "Draw", icon: Edit2 },
  { name: "Erase", icon: Trash2 },
  { name: "Select", icon: Crosshair },
  { name: "Fill", icon: Droplet },
];

export const Tool = {
  list: null,
  selected: null,

  init: () => {
    Tool.list = TOOLS;
    Tool.selected = Tool.list[0];
  },
};
