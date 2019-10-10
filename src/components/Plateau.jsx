import React from 'react';
import Square from './Square.jsx';

export default class Plateau extends React.Component {

  constructor() {
    super();
    this.state = {squares: []};
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        this.state.squares.push({glow: false, selected: false, attacked: false, location:{x: x, y: y}, color: (x%2 - y%2 ? "black" : "white")});
      }
    }
  }

  glow(object) {
    let glows = object.glows;
    let attacked = object.attacked;
    let from = object.from;
    this.setState({squares: this.state.squares.map(e => {
      e.glow = false;
      e.selected = false;
      e.attacked = false;
      if (from.x === e.location.x && from.y === e.location.y) e.selected = true;
      else if (attacked.some(f => f.x === e.location.x && f.y === e.location.y)) e.attacked = true;
      else if (glows.some(f => f.x === e.location.x && f.y === e.location.y)) e.glow = true;
      return e;
    })});
  }

  render() {
    return (
      <section id="plateau">
        {this.state.squares.map((e, i) => (<Square key={i} selected={e.selected} glow={e.glow} attacked={e.attacked} location={e.location} color={e.color} game={this.props.game} />))}
      </section>
    )
  }
}
