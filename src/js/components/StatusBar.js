import m from "mithril";

import { Status } from "../models/Status";

export default class StatusBar {
  view() {
    return m(
      "div",
      {
        class:
          "bg-gray-100 border border-black border-t-0 flex h-6 justify-between items-center px-2 text-xs w-full",
        id: "statusBar",
      },
      m("span", Status.message()),
      m("span", Status.coordinate()),
    );
  }
}
