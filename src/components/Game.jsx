import React from 'react';
import Plateau from './Plateau';
import Choose from './Choose';
import Mat from './Mat';
import PieceRender from './PieceRender';
import Resize from '../js/Resize';
import Socket from '../js/Socket';

export default class Game extends React.Component {

  constructor(props) {
    super(props);
    this.plateau = React.createRef();
    this.gameElement = React.createRef();
    this.state = {pieceSize: {width: 102, height: 102}, transformOpen: false, pieces: [], tableProperties: []};
    Resize.onResize(() => {
        this.setState({pieceSize: Resize.getSize(8)});
    });
    Socket.on("tableUpdate", data => this.setState({tableProperties: data.tableProperties}));
    Socket.on("update", data => this.setState({pieces: data.pieces, tableProperties: data.tableProperties}));
  }

  componentDidMount() {
      Resize.setGameElement(this.gameElement.current);
  }

  clickPiece = (id) => {
      Socket.send("clickPiece", {id: id});
  }

  render() {
    return (
        <section id="squareContainer">
          <section id="game" ref={this.gameElement} className={this.state.team}>
            <div id="tableContainer" className={this.props.team}>
                <Plateau game={this} ref={this.plateau} tableProperties={this.state.tableProperties} />
                {
                    this.state.pieces.map((e, i) =>{
                        return (<PieceRender key={e.id} id={e.id} type={e.type} location={e.location} color={e.color} clicked={this.clickPiece} />)
                    })
                }
            </div>
            {this.state.transformOpen ? <Choose game={this} color={this.selected.props.color} /> : null}
            {this.state.end ? <Mat game={this} message={this.mat ? "Echec et mat !" : "Pat !"} /> : null}
          </section>
        </section>
    )
  }
}
