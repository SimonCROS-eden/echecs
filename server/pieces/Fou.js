var Piece = require("./Piece.js").Piece;

class Fou extends Piece {

  constructor(location, color) {
    super(location, color);
    this.possibilities = [{x: 1, y: 1, width: 7}, {x: 1, y: -1, width: 7}, {x: -1, y: -1, width: 7}, {x: -1, y: 1, width: 7}];
  }
}

exports.Fou = Fou;
