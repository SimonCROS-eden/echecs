import React from 'react';
import Plateau from './Plateau';
import Pion from './pieces/Pion';
import Tour from './pieces/Tour';
import Fou from './pieces/Fou';
import Dame from './pieces/Dame';
import Cavalier from './pieces/Cavalier';

export default class Game extends React.Component {

  constructor() {
    super();
    this.plateau = React.createRef();
  }

  render() {
    return (
      <section id="game">
        <Plateau ref={this.plateau} />
        <Cavalier plateau={this.plateau} location={{x: 3, y: 3}} color="white" />
      </section>
    )
  }
}
