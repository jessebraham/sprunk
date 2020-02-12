import m from "mithril";
import * as icons from "mithril-feather-icons";
import Mousetrap from "mousetrap";

import { Tool } from "../models/Tool";

// Helper class for creating toolbox items.
class ToolboxItem {
  view({ attrs }) {
    return m(
      "div",
      {
        id: `${attrs.name.toLowerCase()}-tool`,
        title: `${attrs.name} (${attrs.shortcut.toUpperCase()})`,
        onclick: e => {
          e.preventDefault();
          Tool.select(attrs); // `attrs` ===  `tool`
        },
      },
      icons[attrs.icon],
    );
  }
}

export default class Toolbox {
  constructor() {
    Tool.init();
  }

  registerEventHandlers() {
    for (const tool of Tool.list) {
      if ("shortcut" in tool) {
        Mousetrap.bind(tool.shortcut, () => {
          // Once the tool has been selected, we need to force a redraw in
          // order to update the status bar, as the event fired by keyboard
          // shortcut does not trigger one.
          Tool.select(tool);
          m.redraw();
        });
      }
    }
  }

  oncreate() {
    this.registerEventHandlers();
    Tool.select(Tool.list[0]);
  }

  view() {
    return m("div", { class: "border border-black mb-4" }, [
      m(
        "div",
        { id: "tools", class: "flex flex-wrap w-16" },
        Tool.list.map(tool => m(ToolboxItem, tool)),
      ),
    ]);
  }
}
