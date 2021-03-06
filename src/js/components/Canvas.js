import m from "mithril";

import { Colour } from "../models/Colour";
import { Image } from "../models/Image";
import { Tool } from "../models/Tool";
import { Status } from "../models/Status";

export default class Canvas {
  constructor() {
    this.gridSize = 16;
    this.pixelSize = 32;
    this.canvasSize = this.gridSize * this.pixelSize;

    Image.init(this.gridSize);
  }

  drawGrid() {
    // Draw a grid on the grid canvas with `this.gridSize` number of "pixels"
    // in either dimension, each of which is `this.pixelSize` pixels square.
    this.gridCtx.beginPath();
    this.gridCtx.strokeStyle = "#DDDDDD";
    this.gridCtx.lineWidth = 1;

    for (let i = this.pixelSize; i < this.canvasSize; i += this.pixelSize) {
      // Draw the horizontal grid lines.
      this.gridCtx.moveTo(0.5 + i, 0);
      this.gridCtx.lineTo(0.5 + i, this.canvasSize);

      // Draw the vertical grid lines.
      this.gridCtx.moveTo(0, 0.5 + i);
      this.gridCtx.lineTo(this.canvasSize, 0.5 + i);
    }

    this.gridCtx.stroke();

    // Draw darker lines along the centers of both axes to clearly show the
    // location of the center of the grid canvas.
    this.gridCtx.beginPath();
    this.gridCtx.strokeStyle = "#000000";
    this.gridCtx.lineWidth = 1;

    // Draw the horizontal dark grid line.
    this.gridCtx.moveTo(0, 0.5 + this.canvasSize / 2);
    this.gridCtx.lineTo(this.canvasSize, 0.5 + this.canvasSize / 2);

    // Draw the vertical dark grid line.
    this.gridCtx.moveTo(0.5 + this.canvasSize / 2, 0);
    this.gridCtx.lineTo(0.5 + this.canvasSize / 2, this.canvasSize);

    this.gridCtx.stroke();
  }

  drawImage() {
    // Draw the image data, stored in `Image.pixels`, to the image canvas.
    for (let y = 0; y < this.canvasSize / this.pixelSize; y++) {
      for (let x = 0; x < this.canvasSize / this.pixelSize; x++) {
        // If the colour for the given "pixel" is set to `null`, we'll leave
        // the "pixel"'s fill colour set to transparent.
        const pixel = Image.getPixel(x, y);
        if (pixel === null) {
          continue;
        }

        this.ctx.fillStyle = pixel;
        this.ctx.fillRect(
          x * this.pixelSize,
          y * this.pixelSize,
          this.pixelSize,
          this.pixelSize,
        );
      }
    }
  }

  gridCoordinate(e) {
    const {
      clientX,
      clientY,
      target: {
        offsetParent: { offsetLeft, offsetTop },
      },
    } = e;

    const x = Math.floor((clientX - offsetLeft) / this.pixelSize);
    const y = Math.floor((clientY - offsetTop) / this.pixelSize);

    return { x, y };
  }

  registerClickHandler() {
    this.imageCanvas.addEventListener("click", e => {
      const { x, y } = this.gridCoordinate(e);

      let targetColour;
      switch (Tool.selected.name) {
        case "Draw":
          Image.setPixel(x, y, Colour.selected);
          break;
        case "Erase":
          Image.clearPixel(x, y);
          break;
        case "Select":
          Colour.select(Image.getPixel(x, y));
          break;
        case "Fill":
          targetColour = Image.getPixel(x, y);
          Image.fill(x, y, targetColour, Colour.selected);
          break;
      }

      m.redraw();
    });
  }

  registerMouseMoveHandler() {
    this.imageCanvas.addEventListener("mousemove", e => {
      const coord = this.gridCoordinate(e);
      Status.setCoordinate(coord);
      m.redraw();
    });

    this.imageCanvas.addEventListener("mouseleave", e => {
      Status.setCoordinate(null);
      m.redraw();
    });
  }

  oncreate({ dom }) {
    // Two separate canvases exist. The grid canvas is for drawing the grid.
    // The image canvas is for displaying the image. Pretty self-explanatory.
    // This makes it easy to save the image data to a file without including
    // the grid lines.
    this.gridCanvas = dom.querySelector("#gridCanvas");
    this.gridCtx = this.gridCanvas.getContext("2d");

    this.imageCanvas = dom.querySelector("#imageCanvas");
    this.ctx = this.imageCanvas.getContext("2d");

    // Register all canvas event listeners once the dom element has been
    // created.
    this.registerClickHandler();
    this.registerMouseMoveHandler();

    // Forcing an immediate redraw will display the grid on the canvas upon
    // initial load.
    m.redraw();
  }

  onupdate() {
    // Clear the grid canvas, and redraw the grid.
    this.gridCtx.clearRect(0, 0, this.canvasSize, this.canvasSize);
    this.drawGrid();

    // Clear the image canvas, and redraw the image.
    this.ctx.clearRect(0, 0, this.canvasSize, this.canvasSize);
    this.drawImage();
  }

  view() {
    return m("div", { class: "border border-black relative" }, [
      m("canvas", {
        height: this.canvasSize,
        width: this.canvasSize,
        id: "gridCanvas",
        class: "bg-gray-100",
      }),
      m("canvas", {
        height: this.canvasSize,
        width: this.canvasSize,
        id: "imageCanvas",
        class: "absolute bg-transparent top-0 z-50",
      }),
    ]);
  }
}
