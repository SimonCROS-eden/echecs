var Piece = require("./Piece.js").Piece;

class Cavalier extends Piece {

  constructor(location, color, game) {
    super(location, color, "cavalier", game);
    this.possibilities = [{x: 1, y: 2, width: 1}, {x: -1, y: 2, width: 1}, {x: -1, y: -2, width: 1}, {x: 1, y: -2, width: 1}, {x: 2, y: 1, width: 1}, {x: -2, y: 1, width: 1}, {x: -2, y: -1, width: 1}, {x: 2, y: -1, width: 1}];
  }
}

exports.Cavalier = Cavalier;
