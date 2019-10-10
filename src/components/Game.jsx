import React from 'react';
import Plateau from './Plateau';
import Pion from './pieces/Pion';
import Tour from './pieces/Tour';
import Cavalier from './pieces/Cavalier';
import Fou from './pieces/Fou';
import Reine from './pieces/Reine';
import Roi from './pieces/Roi';

export default class Game extends React.Component {

  constructor() {
    super();
    this.plateau = React.createRef();
    this.selected = null;
    this.state = {team: "white"};
    this.pions = [
      {element: null, type: "tour", defaultLocation: {x: 0, y: 7}, color: "white"},
      {element: null, type: "cavalier", defaultLocation: {x: 1, y: 7}, color: "white"},
      {element: null, type: "fou", defaultLocation: {x: 2, y: 7}, color: "white"},
      {element: null, type: "reine", defaultLocation: {x: 3, y: 7}, color: "white"},
      {element: null, type: "roi", defaultLocation: {x: 4, y: 7}, color: "white"},
      {element: null, type: "fou", defaultLocation: {x: 5, y: 7}, color: "white"},
      {element: null, type: "cavalier", defaultLocation: {x: 6, y: 7}, color: "white"},
      {element: null, type: "tour", defaultLocation: {x: 7, y: 7}, color: "white"},
      {element: null, type: "pion", defaultLocation: {x: 0, y: 6}, color: "white"},
      {element: null, type: "pion", defaultLocation: {x: 1, y: 6}, color: "white"},
      {element: null, type: "pion", defaultLocation: {x: 2, y: 6}, color: "white"},
      {element: null, type: "pion", defaultLocation: {x: 3, y: 6}, color: "white"},
      {element: null, type: "pion", defaultLocation: {x: 4, y: 6}, color: "white"},
      {element: null, type: "pion", defaultLocation: {x: 5, y: 6}, color: "white"},
      {element: null, type: "pion", defaultLocation: {x: 6, y: 6}, color: "white"},
      {element: null, type: "pion", defaultLocation: {x: 7, y: 6}, color: "white"},
      {element: null, type: "tour", defaultLocation: {x: 0, y: 0}, color: "black"},
      {element: null, type: "cavalier", defaultLocation: {x: 1, y: 0}, color: "black"},
      {element: null, type: "fou", defaultLocation: {x: 2, y: 0}, color: "black"},
      {element: null, type: "reine", defaultLocation: {x: 3, y: 0}, color: "black"},
      {element: null, type: "roi", defaultLocation: {x: 4, y: 0}, color: "black"},
      {element: null, type: "fou", defaultLocation: {x: 5, y: 0}, color: "black"},
      {element: null, type: "cavalier", defaultLocation: {x: 6, y: 0}, color: "black"},
      {element: null, type: "tour", defaultLocation: {x: 7, y: 0}, color: "black"},
      {element: null, type: "pion", defaultLocation: {x: 0, y: 1}, color: "black"},
      {element: null, type: "pion", defaultLocation: {x: 1, y: 1}, color: "black"},
      {element: null, type: "pion", defaultLocation: {x: 2, y: 1}, color: "black"},
      {element: null, type: "pion", defaultLocation: {x: 3, y: 1}, color: "black"},
      {element: null, type: "pion", defaultLocation: {x: 4, y: 1}, color: "black"},
      {element: null, type: "pion", defaultLocation: {x: 5, y: 1}, color: "black"},
      {element: null, type: "pion", defaultLocation: {x: 6, y: 1}, color: "black"},
      {element: null, type: "pion", defaultLocation: {x: 7, y: 1}, color: "black"}
    ];
  }

  kill(piece) {
    if (!piece) return;
    for (let e of this.pions) {
      if (e.element) return e;
    }
    this.pions.splice
  }

  setSelected(selected) {
    this.selected = selected;
    this.plateau.current.glow(this.selected.getToGlowPossibilities());
  }

  getSelected() {
    return this.selected;
  }

  next() {
    this.selected = null;
    this.plateau.current.glow({glows: [], attacked: [], from: {x: -1, y: -1}});
    this.setState({team: (this.state.team === "white" ? "black" : "white")});
  }

  register(piece, id) {
    this.pions[id].element = piece;
  }

  getPieceAt(location) {
    for (let e of this.pions) {
      if (location.x === e.element.state.location.x && location.y === e.element.state.location.y) return e.element;
    }
    return null;
  }

  render() {
    return (
      <section id="game">
        <Plateau game={this} ref={this.plateau} />
        {this.pions.map((e, i) => {
          switch (e.type) {
            case "pion":
              return <Pion key={i} registerId={i} game={this} plateau={this.plateau} color={e.color} location={e.location} />
            case "tour":
              return <Tour key={i} registerId={i} game={this} plateau={this.plateau} color={e.color} location={e.location} />
            case "cavalier":
              return <Cavalier key={i} registerId={i} game={this} plateau={this.plateau} color={e.color} location={e.location} />
            case "fou":
              return <Fou key={i} registerId={i} game={this} plateau={this.plateau} color={e.color} location={e.location} />
            case "reine":
              return <Reine key={i} registerId={i} game={this} plateau={this.plateau} color={e.color} location={e.location} />
            case "roi":
              return <Roi key={i} registerId={i} game={this} plateau={this.plateau} color={e.color} location={e.location} />
            default:
              break;
          }
        })}
      </section>
    )
  }
}
