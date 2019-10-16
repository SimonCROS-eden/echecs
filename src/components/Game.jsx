import React from 'react';
import Plateau from './Plateau';
import Choose from './Choose';
import Mat from './Mat';
import PieceRender from './PieceRender';
import Resize from '../js/Resize';
import Socket from '../js/Socket';

export default class Game extends React.Component {

  constructor() {
    super();
    this.plateau = React.createRef();
    this.gameElement = React.createRef();
    this.state = {team: "white", end: false, pieceSize: {width: 102, height: 102}, transformOpen: false, pieces: []};
    Resize.onResize(() => {
        this.setState({pieceSize: Resize.getSize(8)});
    });
    Socket.on("select", data => this.setSelected(data.id));
    Socket.on("update", data => this.setState({pieces: data.pieces}));
  }

  componentDidMount() {
      Resize.setGameElement(this.gameElement.current);
  }

  render() {
    return (
        <section id="squareContainer">
          <section id="game" ref={this.gameElement} className={this.state.team}>
            <Plateau game={this} ref={this.plateau} />
            {
                this.state.pieces.map(e =>
                    (<PieceRender location={e.location} color={e.color} onClick={() => {}} />)
                )
            }
            {this.state.transformOpen ? <Choose game={this} color={this.selected.props.color} /> : null}
            {this.state.end ? <Mat game={this} message={this.mat ? "Echec et mat !" : "Pat !"} /> : null}
          </section>
        </section>
    )
  }
}
