import m from "mithril";

import { Tool } from "../models/Tool";

export default class Tools {
  constructor() {
    Tool.init();
  }

  displayTools() {
    return Tool.list.map(tool =>
      m(
        "div",
        {
          id: `${tool.name.toLowerCase()}-tool`,
          title: tool.name,
          onclick: e => {
            e.preventDefault();
            this.selectTool(e.target, tool);
          },
        },
        tool.icon,
      ),
    );
  }

  selectTool(elem, tool) {
    document
      .querySelectorAll("#tools .active")
      .forEach(elem => elem.classList.remove("active"));

    while (
      elem.tagName !== "DIV" ||
      (elem.classList && elem.classList.contains("icon"))
    ) {
      elem = elem.parentElement;
    }

    elem.classList.add("active");
    Tool.selected = tool;
  }

  oncreate() {
    const elem = document.querySelector("#draw-tool");
    this.selectTool(elem, Tool.list[0]);
  }

  view() {
    return m("div", { class: "border border-black mb-4" }, [
      m(
        "div",
        { id: "tools", class: "flex flex-wrap w-16" },
        this.displayTools(),
      ),
    ]);
  }
}
