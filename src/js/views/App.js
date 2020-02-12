import m from "mithril";

import Canvas from "../components/Canvas";
import MenuBar from "../components/MenuBar";
import Palette from "../components/Palette";
import StatusBar from "../components/StatusBar";
import Toolbox from "../components/Toolbox";

export default class App {
  view() {
    return m("div", { class: "p-4" }, [
      m(MenuBar),
      m(StatusBar),
      m("div", { class: "flex mt-4", id: "editor" }, [
        m("div", m(Canvas)),
        m("div", { class: "flex flex-col ml-4" }, [m(Toolbox), m(Palette)]),
      ]),
    ]);
  }
}
