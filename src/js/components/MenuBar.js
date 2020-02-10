import m from "mithril";
import { File, Save, Settings } from "mithril-feather-icons";

import { Image } from "../models/Image";

export default class MenuBar {
  newDocument(e) {
    const message = "Create a new document? All unsaved progress will be lost.";
    if (confirm(message)) {
      Image.clear();
    }
  }

  saveDocument(e) {
    const canvas = document.querySelector("#imageCanvas");
    console.info(canvas);

    let elem = e.target;
    while (elem.tagName !== "A") {
      elem = elem.parentElement;
    }

    elem.href = canvas.toDataURL();
    elem.download = "canvas.png";
  }

  view() {
    return m("div", { class: "flex mb-4" }, [
      m(
        "a",
        { href: "#", class: "mr-1", onclick: this.newDocument, title: "New" },
        File,
      ),
      m(
        "a",
        { href: "#", class: "mr-1", onclick: this.saveDocument, title: "Save" },
        Save,
      ),
    ]);
  }
}
