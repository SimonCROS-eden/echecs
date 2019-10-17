var Piece = require("./Piece.js").Piece;

class Roi extends Piece {

  constructor(location, color, game) {
    super(location, color, "roi", game);
    this.possibilities = [{x: 0, y: 1, width: 1}, {x: 1, y: 1, width: 1}, {x: 1, y: -0, width: 1}, {x: 0, y: -1, width: 1}, {x: -1, y: -1, width: 1}, {x: -1, y: 0, width: 1}, {x: -1, y: 1, width: 1}, {x: 1, y: -1, width: 1}];
  }

  getToGlowPossibilities() {
    let roque = this.checkForRoque();
    let result = super.getToGlowPossibilities();
    result.roques = roque;
    return result;
  }

  checkForRoque() {
    let roques = [];
    if (this.movements === 0) {
      if (!this.game.isTeamInEchec(this.color)) {
        let leftTour = this.game.getPieceAt({x: 0, y: this.location.y});
        let rightTour = this.game.getPieceAt({x: 7, y: this.location.y});
        if (leftTour != null && leftTour.movements === 0) {
          if (this.game.getPieceAt({x: 3, y: this.location.y}) == null && this.game.getPieceAt({x: 2, y: this.location.y}) == null && this.game.getPieceAt({x: 1, y: this.location.y}) == null) {
            if (!this.game.isTeamInEchec(this.color, [{element: this, newPosition: {x: 3, y: this.location.y}}]) && !this.game.isTeamInEchec(this.color, [{element: this, newPosition: {x: 2, y: this.location.y}}])) {
              roques.push({king: this, tour: leftTour, kingLocation: {x: 2, y: this.location.y}, tourLocation: {x: 3, y: this.location.y}});
            }
          }
        }
        if (rightTour != null && rightTour.movements === 0) {
          if (this.game.getPieceAt({x: 5, y: this.location.y}) == null && this.game.getPieceAt({x: 6, y: this.location.y}) == null) {
            if (!this.game.isTeamInEchec(this.color, [{element: this, newPosition: {x: 5, y: this.location.y}}]) && !this.game.isTeamInEchec(this.color, [{element: this, newPosition: {x: 6, y: this.location.y}}])) {
              roques.push({king: this, tour: rightTour, kingLocation: {x: 6, y: this.location.y}, tourLocation: {x: 5, y: this.location.y}});
            }
          }
        }
      }
    }
    return roques;
  }
}

exports.Roi = Roi;
