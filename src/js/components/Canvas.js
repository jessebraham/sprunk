import m from "mithril";

import { Colour } from "../models/Colour";
import { Image } from "../models/Image";
import { Tool } from "../models/Tool";

export default class Canvas {
  constructor() {
    this.gridSize = 16;
    this.pixelSize = 32;
    this.canvasSize = this.gridSize * this.pixelSize;

    Image.reset(this.gridSize);
  }

  drawGrid() {
    // Draw a grid on the canvas with `this.gridSize` number of "pixels" in
    // either dimension, each of which is `this.pixelSize` pixels square.
    this.gridCtx.beginPath();
    this.gridCtx.strokeStyle = "#DDDDDD";
    this.gridCtx.lineWidth = "1";

    for (let y = this.pixelSize; y < this.canvasSize; y += this.pixelSize) {
      this.gridCtx.moveTo(0.5 + y, 1);
      this.gridCtx.lineTo(0.5 + y, this.canvasSize - 1);
    }

    for (let x = this.pixelSize; x < this.canvasSize; x += this.pixelSize) {
      this.gridCtx.moveTo(1, 0.5 + x);
      this.gridCtx.lineTo(this.canvasSize - 1, 0.5 + x);
    }

    this.gridCtx.stroke();

    // Draw darker lines along the centers of both axes to clearly show the
    // location of the center of the canvas.
    this.gridCtx.beginPath();
    this.gridCtx.strokeStyle = "#000000";
    this.gridCtx.lineWidth = "1";

    this.gridCtx.moveTo(0.5 + this.canvasSize / 2, 1);
    this.gridCtx.lineTo(0.5 + this.canvasSize / 2, this.canvasSize - 1);

    this.gridCtx.moveTo(1, 0.5 + this.canvasSize / 2);
    this.gridCtx.lineTo(this.canvasSize - 1, 0.5 + this.canvasSize / 2);

    this.gridCtx.stroke();
  }

  drawImage() {
    for (let y = 0; y < this.canvasSize / this.pixelSize; y++) {
      for (let x = 0; x < this.canvasSize / this.pixelSize; x++) {
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

  oncreate() {
    const gridCanvas = document.querySelector("#gridCanvas");
    const imageCanvas = document.querySelector("#imageCanvas");

    this.gridCtx = gridCanvas.getContext("2d");
    this.ctx = imageCanvas.getContext("2d");

    // Force a redraw in order to draw the grid and images on their respective
    // canvases.
    m.redraw();

    imageCanvas.addEventListener("click", e => {
      const { clientX, clientY, target } = e;
      const x = Math.floor(
        (clientX - target.offsetParent.offsetLeft) / this.pixelSize,
      );
      const y = Math.floor(
        (clientY - target.offsetParent.offsetTop) / this.pixelSize,
      );

      if (Tool.selected.name === "Draw") {
        Image.setPixel(x, y, Colour.selected.hexValue);
      } else if (Tool.selected.name === "Erase") {
        Image.clearPixel(x, y);
      } else if (Tool.selected.name === "Select") {
        const pixel = Image.getPixel(x, y);
        const colour = Colour.fromHexValue(pixel);
        Colour.select(colour);
      }

      m.redraw();
    });
  }

  onupdate() {
    this.gridCtx.clearRect(0, 0, this.canvasSize, this.canvasSize);
    this.drawGrid();

    this.ctx.clearRect(0, 0, this.canvasSize, this.canvasSize);
    this.drawImage();
  }

  view() {
    return m("div", { class: "relative" }, [
      m("canvas", {
        height: this.canvasSize,
        width: this.canvasSize,
        id: "gridCanvas",
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
