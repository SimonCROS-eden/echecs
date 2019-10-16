var Tour = require("./pieces/Tour.js").Tour;
var Cavalier = require("./pieces/Cavalier.js").Cavalier;
var Fou = require("./pieces/Fou.js").Fou;
var Reine = require("./pieces/Reine.js").Reine;
var Roi = require("./pieces/Roi.js").Roi;
var Pion = require("./pieces/Pion.js").Pion;

class Game {

    constructor(player1, player2) {
        this.pions = [
            new Tour({x: 0, y: 7}, "white"),
            new Cavalier({x: 1, y: 7}, "white"),
            new Fou({x: 2, y: 7}, "white"),
            new Reine({x: 3, y: 7}, "white"),
            new Roi({x: 4, y: 7}, "white"),
            new Fou({x: 5, y: 7}, "white"),
            new Cavalier({x: 6, y: 7}, "white"),
            new Tour({x: 7, y: 7}, "white"),
            new Pion({x: 0, y: 6}, "white"),
            new Pion({x: 1, y: 6}, "white"),
            new Pion({x: 2, y: 6}, "white"),
            new Pion({x: 3, y: 6}, "white"),
            new Pion({x: 4, y: 6}, "white"),
            new Pion({x: 5, y: 6}, "white"),
            new Pion({x: 6, y: 6}, "white"),
            new Pion({x: 7, y: 6}, "white"),
            new Tour({x: 0, y: 0}, "black"),
            new Cavalier({x: 1, y: 0}, "black"),
            new Fou({x: 2, y: 0}, "black"),
            new Reine({x: 3, y: 0}, "black"),
            new Roi({x: 4, y: 0}, "black"),
            new Fou({x: 5, y: 0}, "black"),
            new Cavalier({x: 6, y: 0}, "black"),
            new Tour({x: 7, y: 0}, "black"),
            new Pion({x: 0, y: 1}, "black"),
            new Pion({x: 1, y: 1}, "black"),
            new Pion({x: 2, y: 1}, "black"),
            new Pion({x: 3, y: 1}, "black"),
            new Pion({x: 4, y: 1}, "black"),
            new Pion({x: 5, y: 1}, "black"),
            new Pion({x: 6, y: 1}, "black"),
            new Pion({x: 7, y: 1}, "black")
        ];
        this.player1 = player1;
        this.player2 = player2;
        player1.send("start");
        player2.send("start");
        player1.on("select", data => this.setSelected(data.id));
        player2.on("select", data => this.setSelected(data.id));
        player1.on("square", data => this.clickSquare(data.id));
        player2.on("square", data => this.clickSquare(data.id));
        this.whiteEchec = false;
        this.blackEchec = false;
        this.mat = false;
        this.pat = false;
    }

    clickSquare(square) {
      this.player1.send("square", {id: square});
      this.player2.send("square", {id: square});
    }

    setSelected(selected) {
      this.player1.send("select", {id: selected});
      this.player2.send("select", {id: selected});
    }

    checkForMat(king) {
      let inEchec = this.isInEchec(king);
      if (!inEchec) return false;
      for (let p of this.pions) {
        if (!p.alive || p.color !== king.color) continue;
        let posss = p.element.getToGlowPossibilities();
        let glows = posss.glows.filter(location => {
          if (this.isInEchec(king, [{element: p.element, newPosition: location}], true)) {
            return false;
          }
          return true;
        });
        let attacked = posss.attacked.filter(location => {
          if (this.isInEchec(king, [{element: p.element, newPosition: location}, {element: this.getPieceAt(location), ignore: true}])) {
            return false;
          }
          return true;
        });
        if (glows.length > 0 || attacked.length > 0) return false;
      }
      this.mat = true;
      this.setState({end: true});
      return true;
    }

    checkForPat(king) {
      let inEchec = this.isInEchec(king);
      if (inEchec) return false;
      for (let p of this.pions) {
        if (!p.alive || p.color !== king.color) continue;
        let posss = p.element.getToGlowPossibilities();
        let glows = posss.glows.filter(location => {
          if (this.isInEchec(king, [{element: p.element, newPosition: location}], true)) {
            return false;
          }
          return true;
        });
        let attacked = posss.attacked.filter(location => {
          if (this.isInEchec(king, [{element: p.element, newPosition: location}, {element: this.getPieceAt(location), ignore: true}])) {
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
      return this.kings.find(e => e.color === this.state.team);
    }

    componentDidUpdate() {
      if (!this.state.end) {
        let king = this.getKing(this.state.team);
        if (this.isInEchec(king)) {
            this.plateau.current.setEchecStyle(king.element.state.location);
            this.checkForMat(king);
        } else {
          this.checkForPat(king);
        }
      }
    }

    next() {
      this.resetClicked();
      this.plateau.current.removeEchecStyle();
      this.setState({team: (this.state.team === "white" ? "black" : "white")});
    }

    getPieceAt(location, changements = []) {
      let element = this.pions.find(e => {
          if (!e.alive || changements.some(f => f.ignore ? f.element === e.element : false)) return false;
          let eLocation = e.element.state.location;
          if (changements.some(f => f.newPosition ? f.element === e.element : false)) eLocation = changements.find(f => f.newPosition ? f.element === e.element : false).newPosition;
          if (location.x === eLocation.x && location.y === eLocation.y) return true;
          return false;
      });
      return element ? element.element : null;
    }

    showTransform() {
      this.setState({transformOpen: true});
    }

    transform(type) {
      let o = this.pions.find((e) => this.selected === e.element);
      o.defaultLocation = this.selected.state.location;
      o.type = type;
      this.setState({transformOpen: false});
      this.next();
    }

    /**
    * if newPosition is defined, it returns test with new pofition for piece
    */
    isTeamInEchec(team, changements = []) {
      return this.isInEchec(this.getKing(team), changements);
    }

    isInEchec(king, changements = []) {
      for (let p of this.pions) {
        if (p.alive && p.color !== king.color && !changements.some(f => f.ignore ? f.element === p.element : false)) {
          if (p.element.canAttack(king.element, changements, [])) {
            return true;
          }
        }
      }
      return false;
    }
}

exports.Game = Game;
