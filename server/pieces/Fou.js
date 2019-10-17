var Piece = require("./Piece.js").Piece;

class Fou extends Piece {

  constructor(location, color, game) {
    super(location, color, "fou", game);
    this.possibilities = [{x: 1, y: 1, width: 7}, {x: 1, y: -1, width: 7}, {x: -1, y: -1, width: 7}, {x: -1, y: 1, width: 7}];
  }
}

exports.Fou = Fou;
