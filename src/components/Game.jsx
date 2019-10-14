import React from 'react';
import Plateau from './Plateau';
import Choose from './Choose';
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
    this.state = {team: "white", pieceSize: {width: 102, height: 102}, transformOpen: false};
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
      {alive: true, element: null, type: "pion", defaultLocation: {x: 1, y: 3}, color: "white"},
      {alive: true, element: null, type: "pion", defaultLocation: {x: 2, y: 6}, color: "white"},
      {alive: true, element: null, type: "pion", defaultLocation: {x: 3, y: 6}, color: "white"},
      {alive: true, element: null, type: "pion", defaultLocation: {x: 4, y: 6}, color: "white"},
      {alive: true, element: null, type: "pion", defaultLocation: {x: 5, y: 6}, color: "white"},
      {alive: true, element: null, type: "pion", defaultLocation: {x: 6, y: 6}, color: "white"},
      {alive: true, element: null, type: "pion", defaultLocation: {x: 7, y: 6}, color: "white"},
      // {alive: true, element: null, type: "tour", defaultLocation: {x: 0, y: 0}, color: "black"},
      // {alive: true, element: null, type: "cavalier", defaultLocation: {x: 1, y: 0}, color: "black"},
      // {alive: true, element: null, type: "fou", defaultLocation: {x: 2, y: 0}, color: "black"},
      // {alive: true, element: null, type: "reine", defaultLocation: {x: 3, y: 0}, color: "black"},
      {alive: true, element: null, type: "roi", defaultLocation: {x: 4, y: 0}, color: "black"},
      // {alive: true, element: null, type: "fou", defaultLocation: {x: 5, y: 0}, color: "black"},
      // {alive: true, element: null, type: "cavalier", defaultLocation: {x: 6, y: 0}, color: "black"},
      // {alive: true, element: null, type: "tour", defaultLocation: {x: 7, y: 0}, color: "black"},
      // {alive: true, element: null, type: "pion", defaultLocation: {x: 0, y: 1}, color: "black"},
      // {alive: true, element: null, type: "pion", defaultLocation: {x: 1, y: 1}, color: "black"},
      // {alive: true, element: null, type: "pion", defaultLocation: {x: 2, y: 1}, color: "black"},
      // {alive: true, element: null, type: "pion", defaultLocation: {x: 3, y: 1}, color: "black"},
      // {alive: true, element: null, type: "pion", defaultLocation: {x: 4, y: 1}, color: "black"},
      // {alive: true, element: null, type: "pion", defaultLocation: {x: 5, y: 1}, color: "black"},
      // {alive: true, element: null, type: "pion", defaultLocation: {x: 6, y: 1}, color: "black"},
      // {alive: true, element: null, type: "pion", defaultLocation: {x: 7, y: 1}, color: "black"}
    ];
    this.kings = [];
    this.whiteEchec = false;
    this.blackEchec = false;
    Resize.onResize(() => {
        this.setState({pieceSize: Resize.getSize(8)});
    });
  }

  componentDidMount() {
      Resize.setGameElement(this.gameElement.current);
  }

  componentDidUpdate() {
      this.plateau.current.removeEchecStyle();
      if (this.isInEchec(this.kings.find(e => e.color === (this.state.team)))) {
          this.plateau.current.setEchecStyle(this.kings.find(e => e.color === this.state.team).element.state.location);
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

  next() {
    this.selected = null;
    this.plateau.current.glow(null, {glows: [], attacked: [], from: {x: -1, y: -1}});
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
  isTeamInEchec(team, changements = [], tested = []) {
    return this.isInEchec(this.kings.find(e => e.color === team), changements, tested);
  }

  isInEchec(king, changements = [], tested = []) {
    for (let p of this.pions) {
      if (p.alive && p.color !== king.color && !changements.some(f => f.ignore ? f.element === p.element : false)) {
        if (p.element.canAttack(king.element, changements, tested)) {
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
          </section>
        </section>
    )
  }
}
