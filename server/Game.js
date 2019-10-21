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
            new Tour({x: 0, y: 7}, "white", this),
            new Cavalier({x: 1, y: 7}, "white", this),
            new Fou({x: 2, y: 7}, "white", this),
            new Reine({x: 3, y: 7}, "white", this),
            new Roi({x: 4, y: 7}, "white", this),
            new Fou({x: 5, y: 7}, "white", this),
            new Cavalier({x: 6, y: 7}, "white", this),
            new Tour({x: 7, y: 7}, "white", this),
            new Pion({x: 0, y: 6}, "white", this),
            new Pion({x: 1, y: 6}, "white", this),
            new Pion({x: 2, y: 6}, "white", this),
            new Pion({x: 3, y: 6}, "white", this),
            new Pion({x: 4, y: 6}, "white", this),
            new Pion({x: 5, y: 6}, "white", this),
            new Pion({x: 6, y: 6}, "white", this),
            new Pion({x: 7, y: 6}, "white", this),
            new Tour({x: 0, y: 0}, "black", this),
            new Cavalier({x: 1, y: 0}, "black", this),
            new Fou({x: 2, y: 0}, "black", this),
            new Reine({x: 3, y: 0}, "black", this),
            new Roi({x: 4, y: 0}, "black", this),
            new Fou({x: 5, y: 0}, "black", this),
            new Cavalier({x: 6, y: 0}, "black", this),
            new Tour({x: 7, y: 0}, "black", this),
            new Pion({x: 0, y: 1}, "black", this),
            new Pion({x: 1, y: 1}, "black", this),
            new Pion({x: 2, y: 1}, "black", this),
            new Pion({x: 3, y: 1}, "black", this),
            new Pion({x: 4, y: 1}, "black", this),
            new Pion({x: 5, y: 1}, "black", this),
            new Pion({x: 6, y: 1}, "black", this),
            new Pion({x: 7, y: 1}, "black", this)
        ];
        this.player1 = player1;
        this.player1.setGame(this);
        this.player1.color = "white";
        this.player2 = player2;
        this.player2.setGame(this);
        this.player2.color = "black";
        this.player1.send("start", {team: this.player1.color});
        this.player2.send("start", {team: this.player2.color});
        this.player1.on("clickPiece", data => this.clickPiece(data.id, player1));
        this.player2.on("clickPiece", data => this.clickPiece(data.id, player2));
        this.player1.on("clickSquare", data => this.clickSquare(data.id, player1));
        this.player2.on("clickSquare", data => this.clickSquare(data.id, player2));
        this.player1.on("transform", data => this.transform(data.type, player1));
        this.player2.on("transform", data => this.transform(data.type, player2));
        this.update();
    }

    removeListeners(player) {
        player.removeListener("clickPiece");
        player.removeListener("clickSquare");
        player.removeListener("transform");
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
        let piece = this.pieces.find(e => e.id === id);
        if (!piece || piece.color !== this.team || this.team !== player.color || piece.color !== player.color) return;
        if (this.getSelected() === piece) {
            this.setSelected(null);
            this.plateau.glow(null, null);
        } else {
            this.setSelected(piece);
            this.plateau.glow(piece, piece.getToGlowPossibilities());
        }
        this.updateTable();
    }

    clickSquare(id, player) {
        if (this.team !== player.color) return;
        if (this.plateau.clickSquare(id)) this.update();
    }

    getSelected() {
        return this.selected;
    }

    setSelected(selected) {
      this.selected = selected;
    }

    showTransform() {
        if (this.team === this.player1.color) this.player1.send("transform");
        else if (this.team === this.player2.color) this.player2.send("transform");
    }

    checkForMat(king) {
      let inEchec = this.isInEchec(king);
      if (!inEchec) return false;
      for (let p of this.pieces) {
        if (!p.alive || p.color !== king.color) continue;
        let posss = p.getToGlowPossibilities();
        let glows = posss.glows.filter(location => {
          if (this.isInEchec(king, [{element: p, newPosition: location}])) {
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
      return this.pieces.find(e => e.type === "roi" && e.color === color);
    }

    getPlayerByColor(color) {
        return this.player1.color === color ? this.player1 : this.player2;
    }

    next() {
        if (!this.mat && !this.pat) {
            let king = this.getKing(this.team === "white" ? "black" : "white");
            this.resetClicked();
            this.plateau.removeEchecStyle();
            if (this.isInEchec(king)) {
                this.plateau.setEchecStyle(king.location);
                if (this.checkForMat(king)) {
                    this.end(getPlayerByColor(this.team), getPlayerByColor(this.team === "white" ? "black" : "white"));
                    return;
                }
            } else {
                if (this.checkForPat(king)) {
                    this.pat();
                    return;
                }
            }
            this.team = this.team === "white" ? "black" : "white";
        }
    }

    getPieceAt(location, changements = []) {
      let element = this.pieces.find(e => {
          if (!e.alive || changements.some(f => f.ignore ? f === e : false)) return false;
          let eLocation = e.location;
          if (changements.some(f => f.newPosition ? f.element === e : false)) eLocation = changements.find(f => f.newPosition ? f.element === e : false).newPosition;
          if (location.x === eLocation.x && location.y === eLocation.y) return true;
          return false;
      });
      return element ? element : null;
    }

    kill(piece) {
        if (!piece) return;
        piece.alive = false;
    }

    transform(type, player) {
        if (!this.selected || this.selected.color !== this.team || this.team !== player.color || this.selected.color !== player.color) return;
        this.pieces.splice(this.pieces.indexOf(this.selected), 1);
        let p = null;
        switch (type) {
            case "reine":
                p = new Reine(this.selected.location, this.selected.color, this);
                break;
            case "tour":
                p = new Tour(this.selected.location, this.selected.color, this);
                break;
            case "fou":
                p = new Fou(this.selected.location, this.selected.color, this);
                break;
            case "cavalier":
                p = new Cavalier(this.selected.location, this.selected.color, this);
                break;
            default:
                return;
        }
        this.setSelected(p);
        this.pieces.push(p);
        this.next();
        this.update();
    }

    stop(player) {
        let winner = this.player1 === player ? this.player2 : this.player1;
        winner.send("end", {title: "Victoir par forfait", message: player.getName() + " a quitté la partie."});
        winner.setGame(null);
        this.removeListeners(winner);
    }

    end(winner, loser) {
        winner.send("end", {title: "Victoir !", message: "Echec et mat !"});
        winner.setGame(null);
        loser.send("end", {title: "Defaite ;(", message: "Echec et mat !"});
        loser.setGame(null);
        this.removeListeners(this.player1);
        this.removeListeners(this.player2);
        updatePlayers();
    }

    pat() {
        this.player1.send("end", {title: "Pat", message: "La partie est finie"});
        this.player1.setGame(null);
        this.player2.send("end", {title: "Pat", message: "La partie est finie"});
        this.player2.setGame(null);
        this.removeListeners(this.player1);
        this.removeListeners(this.player2);
        updatePlayers();
    }

    /**
    * if newPosition is defined, it returns test with new pofition for piece
    */
    isTeamInEchec(team, changements = []) {
      return this.isInEchec(this.getKing(team), changements);
    }

    isInEchec(king, changements = []) {
      for (let p of this.pieces) {
        if (p.alive && p.color !== king.color && !changements.some(f => f.ignore ? f.element === p : false)) {
          if (p.canAttack(king, changements, [])) {
            return true;
          }
        }
      }
      return false;
    }
}

exports.Game = Game;
