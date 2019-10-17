import React from 'react';
import Square from './Square.jsx';

export default class Plateau extends React.Component {

  constructor() {
    super();
    this.state = {squares: []};
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        this.state.squares.push({location:{x: x, y: y}, color: (x%2 - y%2 ? "black" : "white")});
      }
    }
  }

  render() {
    return (
      <section id="plateau">
        {this.state.squares.map((e, i) => {
            let prop = this.props.tableProperties.find(t => t.id === i);
            let selected = false,
            glow = false,
            roque = false,
            attacked = false,
            echec = false;
            if (prop) {
                if (prop.selected) selected = true;
                else if (prop.glow) glow = true;
                else if (prop.roque) roque = true;
                else if (prop.attacked) attacked = true;
                else if (prop.echec) echec = true;
            }
            return (<Square key={i} id={i} selected={selected} roque={roque} glow={glow} echec={echec} attacked={attacked} location={e.location} color={e.color} />)
        })}
      </section>
    )
  }
}
