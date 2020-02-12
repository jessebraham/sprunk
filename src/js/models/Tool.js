import { Status } from "./Status";

// For icon names see https://feathericons.com/
const TOOLS = [
  { name: "Draw", icon: "Edit2", shortcut: "d" },
  { name: "Erase", icon: "Trash2", shortcut: "e" },
  { name: "Fill", icon: "Droplet", shortcut: "f" },
  { name: "Select", icon: "Crosshair", shortcut: "i" },
];

export const Tool = {
  list: null,
  selected: null,

  init: () => {
    Tool.list = TOOLS;
    Tool.selected = Tool.list[0];
  },

  select: tool => {
    document
      .querySelectorAll("#tools .active")
      .forEach(elem => elem.classList.remove("active"));

    const elem = document.querySelector(`#${tool.name.toLowerCase()}-tool`);
    elem.classList.add("active");

    Tool.selected = tool;
    Status.setMessage(`${tool.name} tool selected`);
  },
};
