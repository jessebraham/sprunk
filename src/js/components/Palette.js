import m from "mithril";

import { Colour } from "../models/Colour";

export default class Palette {
  constructor() {
    Colour.init();
  }

  buildColourPalette() {
    return Colour.palette.map(colour =>
      m("div", {
        class: "cursor-pointer h-8 w-8",
        style: `background: ${colour.hexValue}`,
        onclick: () => Colour.select(colour.hexValue),
        title: colour.name,
      }),
    );
  }

  view() {
    return m("div", [
      m(
        "div",
        { class: "border border-black mb-4" },
        m("div", { class: "flex flex-wrap w-16" }, this.buildColourPalette()),
      ),
      m("div", { class: "border border-black" }, [
        m("div", {
          class: "bg-gray-100 h-16 w-16",
          style: `background: ${Colour.selected}`,
        }),
      ]),
    ]);
  }
}
