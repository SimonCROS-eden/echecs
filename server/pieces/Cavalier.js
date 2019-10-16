var Piece = require("./Piece.js").Piece;

class Cavalier extends Piece {

  constructor(location, color) {
    super(location, color);
    this.possibilities = [{x: 1, y: 2, width: 1}, {x: -1, y: 2, width: 1}, {x: -1, y: -2, width: 1}, {x: 1, y: -2, width: 1}, {x: 2, y: 1, width: 1}, {x: -2, y: 1, width: 1}, {x: -2, y: -1, width: 1}, {x: 2, y: -1, width: 1}];
  }
}

exports.Cavalier = Cavalier;
