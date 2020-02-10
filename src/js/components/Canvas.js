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
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#DDDDDD";
    this.ctx.lineWidth = "1";

    for (let y = this.pixelSize; y < this.canvasSize; y += this.pixelSize) {
      this.ctx.moveTo(0.5 + y, 1);
      this.ctx.lineTo(0.5 + y, this.canvasSize - 1);
    }

    for (let x = this.pixelSize; x < this.canvasSize; x += this.pixelSize) {
      this.ctx.moveTo(1, 0.5 + x);
      this.ctx.lineTo(this.canvasSize - 1, 0.5 + x);
    }

    this.ctx.stroke();

    // Draw darker lines along the centers of both axes to clearly show the
    // location of the center of the canvas.
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#000000";
    this.ctx.lineWidth = "1";

    this.ctx.moveTo(0.5 + this.canvasSize / 2, 1);
    this.ctx.lineTo(0.5 + this.canvasSize / 2, this.canvasSize - 1);

    this.ctx.moveTo(1, 0.5 + this.canvasSize / 2);
    this.ctx.lineTo(this.canvasSize - 1, 0.5 + this.canvasSize / 2);

    this.ctx.stroke();
  }

  drawImage() {
    for (let y = 0; y < this.canvasSize / this.pixelSize; y++) {
      for (let x = 0; x < this.canvasSize / this.pixelSize; x++) {
        this.ctx.fillStyle = Image.getPixel(x, y);
        this.ctx.fillRect(
          0.5 + x * this.pixelSize,
          0.5 + y * this.pixelSize,
          this.pixelSize - 1,
          this.pixelSize - 1,
        );
      }
    }
  }

  oncreate({ dom }) {
    this.ctx = dom.getContext("2d");
    m.redraw();

    dom.addEventListener("click", e => {
      const { clientX, clientY, target } = e;
      const x = Math.floor((clientX - target.offsetLeft) / this.pixelSize);
      const y = Math.floor((clientY - target.offsetTop) / this.pixelSize);

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
    this.ctx.clearRect(0, 0, this.canvasSize, this.canvasSize);
    this.drawGrid();
    this.drawImage();
  }

  view() {
    return m("canvas", { height: this.canvasSize, width: this.canvasSize });
  }
}
