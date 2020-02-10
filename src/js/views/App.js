import m from "mithril";

import Canvas from "../components/Canvas";
import Palette from "../components/Palette";

export default class App {
  view() {
    return m("div", { class: "p-4" }, [
      m("div", { class: "flex" }, [
        m("div", m(Canvas)),
        m("div", { class: "flex flex-col ml-4" }, m(Palette)),
      ]),
    ]);
  }
}
