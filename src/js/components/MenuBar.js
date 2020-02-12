import m from "mithril";
import {
  File,
  Github,
  Save,
  SkipBack,
  SkipForward,
} from "mithril-feather-icons";
import Mousetrap from "mousetrap";

import { Image } from "../models/Image";

// Helper class for creating menu bar items.
// Creates a list element with the provided title and icon. Depending on
// whether an 'href' or a 'handler' attribute is applited, the appropriate
// attribute will be set on the anchor element.
class MenuBarItem {
  buildAttrs(attrs) {
    const elemAttrs = { class: "cursor-pointer", title: attrs.title };
    if ("href" in attrs) {
      elemAttrs["href"] = attrs.href;
    } else if ("handler" in attrs) {
      elemAttrs["onclick"] = attrs.handler;
    }
    return elemAttrs;
  }

  view({ attrs }) {
    return m("li", m("a", this.buildAttrs(attrs), attrs.icon));
  }
}

export default class MenuBar {
  constructor() {
    this.items = [
      { title: "New", icon: File, handler: this.newDocument },
      { title: "Save", icon: Save, handler: this.saveDocument },
      { title: "Undo", icon: SkipBack, handler: Image.undo },
      { title: "Redo", icon: SkipForward, handler: Image.redo },
      null, // `null` indicates a spacer element
      {
        title: "View project on Github",
        icon: Github,
        href: "https://github.com/jessebraham/sprunk",
      },
    ];
  }

  newDocument() {
    if (confirm("Create a new document? All unsaved progress will be lost.")) {
      Image.reset();
    }
  }

  saveDocument(e) {
    let elem = e.target;
    while (elem.tagName !== "A") {
      elem = elem.parentElement;
    }

    const canvas = document.querySelector("#imageCanvas");
    elem.href = canvas.toDataURL();
    elem.download = "canvas.png";
  }

  registerEventHandlers() {
    // For both the Undo and Redo functionality, we need to force a redraw in
    // order to update the canvas, as the events fired by keyboard shortcuts
    // do not trigger one.
    Mousetrap.bind("ctrl+z", () => {
      Image.undo();
      m.redraw();
    });
    Mousetrap.bind(["ctrl+shift+z", "ctrl+y"], () => {
      Image.redo();
      m.redraw();
    });
  }

  oncreate() {
    this.registerEventHandlers();
  }

  view() {
    return m(
      "div",
      { id: "menu" },
      m(
        "ul",
        { class: "bg-gray-100 border border-black flex" },
        this.items.map(item =>
          item !== null ? m(MenuBarItem, item) : m("li", { class: "flex-1" }),
        ),
      ),
    );
  }
}
