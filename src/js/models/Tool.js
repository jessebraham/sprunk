import { Droplet, Edit2, XCircle } from "mithril-feather-icons";

const TOOLS = [
  { name: "Draw", icon: Edit2 },
  { name: "Erase", icon: XCircle },
  { name: "Select", icon: Droplet },
];

export const Tool = {
  list: null,
  selected: null,

  init: () => {
    Tool.list = TOOLS;
    Tool.selected = Tool.list[0];
  },
};
