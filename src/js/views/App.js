import m from "mithril";

import Canvas from "../components/Canvas";
import MenuBar from "../components/MenuBar";
import Palette from "../components/Palette";
import Tools from "../components/Tools";

export default class App {
  view() {
    return m("div", { class: "p-4" }, [
      m(MenuBar),
      m("div", { class: "flex" }, [
        m("div", m(Canvas)),
        m("div", { class: "flex flex-col ml-4" }, [m(Tools), m(Palette)]),
      ]),
    ]);
  }
}
