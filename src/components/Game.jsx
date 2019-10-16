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
import Socket from '../js/Socket';

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
    Resize.onResize(() => {
        this.setState({pieceSize: Resize.getSize(8)});
    });
    Socket.on("select", data => this.setSelected(data.id));
  }

  render() {
      // {this.pions.map((e, i) => {
      //   if (!e.alive) return null;
      //   switch (e.type) {
      //     case "pion":
      //       return <Pion key={i} registerId={i} width={this.state.pieceSize.width} game={this} plateau={this.plateau} color={e.color} defaultLocation={e.defaultLocation} />
      //     case "tour":
      //       return <Tour key={i} registerId={i} width={this.state.pieceSize.width} game={this} plateau={this.plateau} color={e.color} defaultLocation={e.defaultLocation} />
      //     case "cavalier":
      //       return <Cavalier key={i} registerId={i} width={this.state.pieceSize.width} game={this} plateau={this.plateau} color={e.color} defaultLocation={e.defaultLocation} />
      //     case "fou":
      //       return <Fou key={i} registerId={i} width={this.state.pieceSize.width} game={this} plateau={this.plateau} color={e.color} defaultLocation={e.defaultLocation} />
      //     case "reine":
      //       return <Reine key={i} registerId={i} width={this.state.pieceSize.width} game={this} plateau={this.plateau} color={e.color} defaultLocation={e.defaultLocation} />
      //     case "roi":
      //       return <Roi key={i} registerId={i} width={this.state.pieceSize.width} game={this} plateau={this.plateau} color={e.color} defaultLocation={e.defaultLocation} />
      //     default:
      //       break;
      //   }
      //   return null;
      // })}
    return (
        <section id="squareContainer">
          <section id="game" ref={this.gameElement} className={this.state.team}>
            <Plateau game={this} ref={this.plateau} />

            {this.state.transformOpen ? <Choose game={this} color={this.selected.props.color} /> : null}
            {this.state.end ? <Mat game={this} message={this.mat ? "Echec et mat !" : "Pat !"} /> : null}
          </section>
        </section>
    )
  }
}
