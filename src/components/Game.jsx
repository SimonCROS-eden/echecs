import React from 'react';
import Plateau from './Plateau';
import Choose from './Choose';
import Mat from './Mat';
import Pion from './pieces/Pion';
import Tour from './pieces/Tour';
import Cavalier from './pieces/Cavalier';
import Fou from './pieces/Fou';
import Reine from './pieces/Reine';
import Roi from './pieces/Roi';
import Resize from '../js/Resize';

export default class Game extends React.Component {

  constructor() {
    super();
    this.plateau = React.createRef();
    this.gameElement = React.createRef();
    this.selected = null;
    this.state = {team: "white", end: false, pieceSize: {width: 102, height: 102}, transformOpen: false};
    this.pions = [
      {alive: true, element: null, type: "tour", defaultLocation: {x: 0, y: 7}, color: "white"},
      {alive: true, element: null, type: "cavalier", defaultLocation: {x: 1, y: 7}, color: "white"},
      {alive: true, element: null, type: "fou", defaultLocation: {x: 2, y: 7}, color: "white"},
      {alive: true, element: null, type: "reine", defaultLocation: {x: 3, y: 7}, color: "white"},
      {alive: true, element: null, type: "roi", defaultLocation: {x: 4, y: 7}, color: "white"},
      {alive: true, element: null, type: "fou", defaultLocation: {x: 5, y: 7}, color: "white"},
      {alive: true, element: null, type: "cavalier", defaultLocation: {x: 6, y: 7}, color: "white"},
      {alive: true, element: null, type: "tour", defaultLocation: {x: 7, y: 7}, color: "white"},
      {alive: true, element: null, type: "pion", defaultLocation: {x: 0, y: 6}, color: "white"},
      {alive: true, element: null, type: "pion", defaultLocation: {x: 1, y: 6}, color: "white"},
      {alive: true, element: null, type: "pion", defaultLocation: {x: 2, y: 6}, color: "white"},
      {alive: true, element: null, type: "pion", defaultLocation: {x: 3, y: 6}, color: "white"},
      {alive: true, element: null, type: "pion", defaultLocation: {x: 4, y: 6}, color: "white"},
      {alive: true, element: null, type: "pion", defaultLocation: {x: 5, y: 6}, color: "white"},
      {alive: true, element: null, type: "pion", defaultLocation: {x: 6, y: 6}, color: "white"},
      {alive: true, element: null, type: "pion", defaultLocation: {x: 7, y: 6}, color: "white"},
      {alive: true, element: null, type: "tour", defaultLocation: {x: 0, y: 0}, color: "black"},
      {alive: true, element: null, type: "cavalier", defaultLocation: {x: 1, y: 0}, color: "black"},
      {alive: true, element: null, type: "fou", defaultLocation: {x: 2, y: 0}, color: "black"},
      {alive: true, element: null, type: "reine", defaultLocation: {x: 3, y: 0}, color: "black"},
      {alive: true, element: null, type: "roi", defaultLocation: {x: 4, y: 0}, color: "black"},
      {alive: true, element: null, type: "fou", defaultLocation: {x: 5, y: 0}, color: "black"},
      {alive: true, element: null, type: "cavalier", defaultLocation: {x: 6, y: 0}, color: "black"},
      {alive: true, element: null, type: "tour", defaultLocation: {x: 7, y: 0}, color: "black"},
      {alive: true, element: null, type: "pion", defaultLocation: {x: 0, y: 1}, color: "black"},
      {alive: true, element: null, type: "pion", defaultLocation: {x: 1, y: 1}, color: "black"},
      {alive: true, element: null, type: "pion", defaultLocation: {x: 2, y: 1}, color: "black"},
      {alive: true, element: null, type: "pion", defaultLocation: {x: 3, y: 1}, color: "black"},
      {alive: true, element: null, type: "pion", defaultLocation: {x: 4, y: 1}, color: "black"},
      {alive: true, element: null, type: "pion", defaultLocation: {x: 5, y: 1}, color: "black"},
      {alive: true, element: null, type: "pion", defaultLocation: {x: 6, y: 1}, color: "black"},
      {alive: true, element: null, type: "pion", defaultLocation: {x: 7, y: 1}, color: "black"}
    ];
    this.kings = [];
    this.whiteEchec = false;
    this.blackEchec = false;
    this.mat = false;
    this.pat = false;
    Resize.onResize(() => {
        this.setState({pieceSize: Resize.getSize(8)});
    });
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

  kill(piece) {
    if (!piece) return;
    this.pions[piece.id].alive = false;
  }

  setSelected(selected) {
    this.selected = selected;
    this.plateau.current.glow(selected, this.selected.getToGlowPossibilities());
  }

  getSelected() {
    return this.selected;
  }

  resetClicked() {
    this.selected = null;
    this.plateau.current.glow(null, {glows: [], attacked: [], roques: [], from: {x: -1, y: -1}});
  }

  next() {
    this.resetClicked();
    this.plateau.current.removeEchecStyle();
    this.setState({team: (this.state.team === "white" ? "black" : "white")});
  }

  register(piece, id) {
    this.pions[id].element = piece;
    if (piece.type === "roi") this.kings.push({color: piece.props.color, element: piece});
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

  render() {
    return (
        <section id="squareContainer">
          <section id="game" ref={this.gameElement} className={this.state.team}>
            <Plateau game={this} ref={this.plateau} />
            {this.pions.map((e, i) => {
              if (!e.alive) return null;
              switch (e.type) {
                case "pion":
                  return <Pion key={i} registerId={i} width={this.state.pieceSize.width} game={this} plateau={this.plateau} color={e.color} defaultLocation={e.defaultLocation} />
                case "tour":
                  return <Tour key={i} registerId={i} width={this.state.pieceSize.width} game={this} plateau={this.plateau} color={e.color} defaultLocation={e.defaultLocation} />
                case "cavalier":
                  return <Cavalier key={i} registerId={i} width={this.state.pieceSize.width} game={this} plateau={this.plateau} color={e.color} defaultLocation={e.defaultLocation} />
                case "fou":
                  return <Fou key={i} registerId={i} width={this.state.pieceSize.width} game={this} plateau={this.plateau} color={e.color} defaultLocation={e.defaultLocation} />
                case "reine":
                  return <Reine key={i} registerId={i} width={this.state.pieceSize.width} game={this} plateau={this.plateau} color={e.color} defaultLocation={e.defaultLocation} />
                case "roi":
                  return <Roi key={i} registerId={i} width={this.state.pieceSize.width} game={this} plateau={this.plateau} color={e.color} defaultLocation={e.defaultLocation} />
                default:
                  break;
              }
              return null;
            })}
            {this.state.transformOpen ? <Choose game={this} color={this.selected.props.color} /> : null}
            {this.state.end ? <Mat game={this} message={this.mat ? "Echec et mat !" : "Pat !"} /> : null}
          </section>
        </section>
    )
  }
}
