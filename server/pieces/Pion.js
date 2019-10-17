var Piece = require("./Piece.js").Piece;

class Pion extends Piece {

  constructor(location, color, game) {
    super(location, color, "pion", game);

    if (color === "white") {
      this.possibilities = [{x: 0, y: -1, width: 2}];
      this.attackPossibilities = [{x: 1, y: -1, width: 1}, {x: -1, y: -1, width: 1}]
    } else {
      this.possibilities = [{x: 0, y: 1, width: 2}];
      this.attackPossibilities = [{x: 1, y: 1, width: 1}, {x: -1, y: 1, width: 1}]
    }
  }

  move(location) {
    super.move(location);
    if ((this.color === "white" && location.y === 0) || (this.color === "black" && location.y === 7)) {
      return false;
    }
    return true;
  }

  getToGlowPossibilities() {
    if (this.movements > 0) {
      if (this.color === "white") {
        this.possibilities = [{x: 0, y: -1, width: 1}];
      } else {
        this.possibilities = [{x: 0, y: 1, width: 1}];
      }
    }
    return super.getToGlowPossibilities();
  }
}

exports.Pion = Pion;
