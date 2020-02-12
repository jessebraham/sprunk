import stream from "mithril/stream";

export const Status = {
  message: stream(""),
  coordinate: stream(""),

  setMessage: message => {
    Status.message(message);
  },

  setCoordinate: coord => {
    Status.coordinate(coord !== null ? `(${coord.x}, ${coord.y})` : "");
  },
};
