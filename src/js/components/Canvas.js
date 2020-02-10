import m from "mithril";

export default class Canvas {
  constructor() {
    this.gridSize = 16;
    this.pixelSize = 32;
    this.canvasSize = this.gridSize * this.pixelSize;
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

  oncreate({ dom }) {
    this.ctx = dom.getContext("2d");
    m.redraw();
  }

  onupdate() {
    this.ctx.clearRect(0, 0, this.canvasSize, this.canvasSize);
    this.drawGrid();
  }

  view() {
    return m("canvas", { height: this.canvasSize, width: this.canvasSize });
  }
}
