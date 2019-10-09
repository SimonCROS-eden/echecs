import React from 'react';
import Square from './Square.jsx';

export default class Plateau extends React.Component {

  constructor() {
    super();
    this.state = {squares: []};
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        this.state.squares.push({glow: false, location:{x: x, y: y}, color: (x%2 - y%2 ? "black" : "white")});
      }
    }
  }

  glow(glows) {
    this.setState({squares: this.state.squares.map(e => {
      e.glow = false;
      if (glows.some(f => f.x === e.location.x && f.y === e.location.y)) e.glow = true;
      return e;
    })})
  }

  render() {
    return (
      <section id="plateau">
        {this.state.squares.map((e, i) => (<Square key={i} glow={e.glow} location={e.location} color={e.color} />))}
      </section>
    )
  }
}
