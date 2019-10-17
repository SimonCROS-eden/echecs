var Tour = require("./pieces/Tour.js").Tour;
var Cavalier = require("./pieces/Cavalier.js").Cavalier;
var Fou = require("./pieces/Fou.js").Fou;
var Reine = require("./pieces/Reine.js").Reine;
var Roi = require("./pieces/Roi.js").Roi;
var Pion = require("./pieces/Pion.js").Pion;
var Plateau = require("./Plateau.js").Plateau;

class Game {

    constructor(player1, player2) {
        this.whiteEchec = false;
        this.blackEchec = false;
        this.mat = false;
        this.pat = false;
        this.team = "white";
        this.selected = null;
        this.newId = 0;
        this.plateau = new Plateau(this);
        this.pieces = [
            // new Tour({x: 0, y: 7}, "white", this),
            // new Cavalier({x: 1, y: 7}, "white", this),
            // new Fou({x: 2, y: 7}, "white", this),
            new Reine({x: 3, y: 7}, "white", this),
            new Roi({x: 4, y: 7}, "white", this),
            // new Fou({x: 5, y: 7}, "white", this),
            // new Cavalier({x: 6, y: 7}, "white", this),
            // new Tour({x: 7, y: 7}, "white", this),
            // new Pion({x: 0, y: 6}, "white", this),
            // new Pion({x: 1, y: 6}, "white", this),
            // new Pion({x: 2, y: 6}, "white", this),
            // new Pion({x: 3, y: 6}, "white", this),
            // new Pion({x: 4, y: 6}, "white", this),
            // new Pion({x: 5, y: 6}, "white", this),
            // new Pion({x: 6, y: 6}, "white", this),
            // new Pion({x: 7, y: 6}, "white", this),
            // new Tour({x: 0, y: 0}, "black", this),
            // new Cavalier({x: 1, y: 0}, "black", this),
            // new Fou({x: 2, y: 0}, "black", this),
            // new Reine({x: 3, y: 0}, "black", this),
            new Roi({x: 4, y: 0}, "black", this),
            // new Fou({x: 5, y: 0}, "black", this),
            // new Cavalier({x: 6, y: 0}, "black", this),
            // new Tour({x: 7, y: 0}, "black", this),
            // new Pion({x: 0, y: 1}, "black", this),
            // new Pion({x: 1, y: 1}, "black", this),
            // new Pion({x: 2, y: 1}, "black", this),
            // new Pion({x: 3, y: 1}, "black", this),
            // new Pion({x: 4, y: 1}, "black", this),
            // new Pion({x: 5, y: 1}, "black", this),
            // new Pion({x: 6, y: 1}, "black", this),
            // new Pion({x: 7, y: 1}, "black", this)
        ];
        this.player1 = player1;
        this.player1.color = "white";
        this.player2 = player2;
        this.player2.color = "black";
        this.player1.send("start", {team: this.player1.color});
        this.player2.send("start", {team: this.player2.color});
        this.player1.on("clickPiece", data => this.clickPiece(data.id, player1));
        this.player2.on("clickPiece", data => this.clickPiece(data.id, player2));
        this.player1.on("clickSquare", data => this.clickSquare(data.id, player1));
        this.player2.on("clickSquare", data => this.clickSquare(data.id, player2));
        this.update();
    }

    getNewId() {
        return this.newId++;
    }

    getPieceId(piece) {
        return this.pieces.indexOf(piece);
    }

    resetClicked() {
        this.setSelected(null);
        this.plateau.glow(null, {glows: [], attacked: [], roques: [], from: {x: -1, y: -1}});
    }

    toPacket(array) {
        return array.map(e => e.toJSON());
    }

    update() {
        this.player1.send("update", {team: this.team, pieces: this.toPacket(this.getPiecesToSend()), tableProperties: this.toPacket(this.plateau.getSquaresToSend())});
        this.player2.send("update", {team: this.team, pieces: this.toPacket(this.getPiecesToSend()), tableProperties: this.toPacket(this.plateau.getSquaresToSend())});
    }

    updateTable() {
        if (this.team === this.player1.color) this.player1.send("tableUpdate", {tableProperties: this.toPacket(this.plateau.getSquaresToSend())});
        else if (this.team === this.player2.color) this.player2.send("tableUpdate", {tableProperties: this.toPacket(this.plateau.getSquaresToSend())});
    }

    getPiecesToSend() {
        return this.pieces.filter(e => e.alive);
    }

    clickPiece(id, player) {
        let piece = this.pieces[id];
        if (piece.color !== this.team || this.team !== player.color || piece.color !== player.color) return;
        this.setSelected(piece);
        this.plateau.glow(piece, piece.getToGlowPossibilities());
        this.updateTable();
    }

    clickSquare(id, player) {
        if (this.team !== player.color) return;
        this.plateau.clickSquare(id);
        this.update();
    }

    getSelected() {
        return this.selected;
    }

    setSelected(selected) {
      this.selected = selected;
    }

    checkForMat(king) {
      let inEchec = this.isInEchec(king);
      console.log(1);
      if (!inEchec) return false;
      console.log(2);
      for (let p of this.pieces) {
          console.log(3);
        if (!p.alive || p.color !== king.color) continue;
        console.log(4);
        let posss = p.getToGlowPossibilities();
        console.log(5);
        let glows = posss.glows.filter(location => {
          if (this.isInEchec(king, [{element: p, newPosition: location}], true)) {
            return false;
          }
          return true;
        });
        let attacked = posss.attacked.filter(location => {
          if (this.isInEchec(king, [{element: p, newPosition: location}, {element: this.getPieceAt(location), ignore: true}])) {
            return false;
          }
          return true;
        });
        if (glows.length > 0 || attacked.length > 0) return false;
      }
      this.mat = true;
      return true;
    }

    checkForPat(king) {
      let inEchec = this.isInEchec(king);
      if (inEchec) return false;
      for (let p of this.pieces) {
        if (!p.alive || p.color !== king.color) continue;
        let posss = p.getToGlowPossibilities();
        let glows = posss.glows.filter(location => {
          if (this.isInEchec(king, [{element: p, newPosition: location}], true)) {
            return false;
          }
          return true;
        });
        let attacked = posss.attacked.filter(location => {
          if (this.isInEchec(king, [{element: p, newPosition: location}, {element: this.getPieceAt(location), ignore: true}])) {
            return false;
          }
          return true;
        });
        if (glows.length > 0 || attacked.length > 0) return false;
      }
      this.pat = true;
      this.setState({end: true});
      return true;
    }

    componentDidMount() {
      Resize.setGameElement(this.gameElement.current);
    }

    getKing(color) {
      return this.pieces.find(e => e.type === "roi" && e.color === this.team);
    }

    next() {
        if (!this.mat && !this.pat) {
            let king = this.getKing(this.team === "white" ? "black" : "white");
            console.log(this.isInEchec(king));
            if (this.isInEchec(king)) {
                this.plateau.setEchecStyle(king.location);
                if (this.checkForMat(king)) return;
            } else {
                if (this.checkForPat(king)) return;
            }
            this.resetClicked();
            this.plateau.removeEchecStyle();
            this.team = this.team === "white" ? "black" : "white";
        }
    }

    getPieceAt(location, changements = []) {
      let element = this.pieces.find(e => {
          if (!e.alive || changements.some(f => f.ignore ? f === e : false)) return false;
          let eLocation = e.location;
          if (changements.some(f => f.newPosition ? f === e : false)) eLocation = changements.find(f => f.newPosition ? f === e : false).newPosition;
          if (location.x === eLocation.x && location.y === eLocation.y) return true;
          return false;
      });
      return element ? element : null;
    }

    kill(piece) {
        if (!piece) return;
        piece.alive = false;
    }

    transform(type) {

    }

    /**
    * if newPosition is defined, it returns test with new pofition for piece
    */
    isTeamInEchec(team, changements = []) {
      return this.isInEchec(this.getKing(team), changements);
    }

    isInEchec(king, changements = []) {
      for (let p of this.pieces) {
        if (p.alive && p.color !== king.color && !changements.some(f => f.ignore ? f === p : false)) {
            console.log(p);
          if (p.canAttack(king, changements, [])) {
              console.log(4);
            return true;
          }
        }
      }
      return false;
    }
}

exports.Game = Game;
