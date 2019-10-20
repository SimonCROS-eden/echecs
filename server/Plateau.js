var Square = require("./Square.js").Square;

class Plateau {

  constructor(game) {
      this.game = game;
      this.squares = [];
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        this.squares.push(new Square({x: x, y: y}, this.squares.length));
      }
    }
  }

  getSquaresToSend() {
      return this.squares.filter(e => !e.isDefault());
  }

  clickSquare(id) {
    let square = this.squares[id];
    if (!square.glow && !square.attacked && !square.roque) return false;
    if (square.attacked) {
      this.game.kill(this.game.getPieceAt(square.location));
    }
    if (square.roque) {
      square.roque.king.move(square.roque.kingLocation);
      square.roque.tour.move(square.roque.tourLocation);
      this.game.next();
      return true;
    }
    if (this.game.getSelected().move(square.location)) {
      this.game.next();
    } else {
      this.game.showTransform();
      return false;
    }
    return true;
  }

  removeEchecStyle() {
      this.squares.forEach(e => e.echec = false);
  }

  setEchecStyle(location) {
      this.squares.find(e => e.location.x === location.x && e.location.y === location.y).echec = true;
  }

  glow(piece, object) {
    if (piece && object) {
        let glows = object.glows.filter(location => {
          if (this.game.isTeamInEchec(piece.color, [{element: piece, newPosition: location}])) {
            return false;
          }
          return true
        });
        let attacked = object.attacked.filter(location => {
          if (this.game.isTeamInEchec(piece.color, [{element: piece, newPosition: location}, {element: this.game.getPieceAt(location), ignore: true}])) {
            return false;
          }
          return true
        });
        let roques = object.roques.filter(location => {
          if (this.game.isTeamInEchec(piece.color, [{element: piece, newPosition: location}, {element: this.game.getPieceAt(location), ignore: true}])) {
            return false;
          }
          return true
        });
        let from = object.from;
        this.squares.forEach(e => {
          e.glow = false;
          e.selected = false;
          e.attacked = false;
          e.roque = null;
          if (from.x === e.location.x && from.y === e.location.y) e.selected = true;
          else if (attacked.some(f => f.x === e.location.x && f.y === e.location.y)) e.attacked = true;
          else if (glows.some(f => f.x === e.location.x && f.y === e.location.y)) e.glow = true;
          else if (roques.some(f => f.kingLocation.x === e.location.x && f.kingLocation.y === e.location.y)) e.roque = roques.find(f => f.kingLocation.x === e.location.x && f.kingLocation.y === e.location.y);
        });
    } else {
        this.squares.forEach(e => {
          e.glow = false;
          e.selected = false;
          e.attacked = false;
          e.roque = null;
        });
    }
  }
}

exports.Plateau = Plateau;
