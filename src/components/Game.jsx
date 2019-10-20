import React from 'react';
import Plateau from './Plateau';
import Choose from './Choose';
import Mat from './Mat';
import PieceRender from './PieceRender';
import Resize from '../js/Resize';
import Socket from '../js/Socket';
import Rotate from '../js/Rotate';

export default class Game extends React.Component {

  constructor(props) {
    super(props);
    this.plateau = React.createRef();
    this.squareElement = React.createRef();
    this.wrapperElement = React.createRef();
    this.state = {transformOpen: false, pieces: [], tableProperties: []};
    Socket.on("tableUpdate", data => this.setState({tableProperties: data.tableProperties}));
    Socket.on("update", data => this.setState({pieces: data.pieces, tableProperties: data.tableProperties, transformOpen: false}));
    Socket.on("transform", data => this.setState({transformOpen: true}));
  }

  componentDidMount() {
      Resize.setElement(this.wrapperElement.current);
      Resize.setSquareContainerElement(this.squareElement.current);

      Rotate.setElement(this.wrapperElement.current);

      Resize.onResize(() => this.forceUpdate());
      Rotate.setCallback(() => this.forceUpdate());
      this.forceUpdate();
  }

  clickPiece = (id) => {
      Socket.send("clickPiece", {id: id});
  }

  transform(type) {
      Socket.send("transform", {type: type});
  }

  render() {
    return (
        <section id="squareContainer" ref={this.squareElement}>
            <section id="game" style={{width: Resize.getContainerWidth() + "px", height: Resize.getContainerWidth() + "px"}} onContextMenu={evt => evt.preventDefault()} onTouchStart={Rotate.onClickStart} onTouchMove={Rotate.onMove} onTouchEnd={Rotate.onClickEnd} onMouseDown={Rotate.onClickStart} onMouseMove={Rotate.onMove} onMouseUp={Rotate.onClickEnd} className={this.state.team}>
                <div id="tableContainer" className={this.props.display3d ? "transform" : ""} style={Rotate.getStyle()} ref={this.tableElement} >
                    <section ref={this.wrapperElement} className={"wrapper " + this.props.team}>
                        <Plateau game={this} ref={this.plateau} tableProperties={this.state.tableProperties} />
                        {
                            this.state.pieces.map(e => {
                                return (<PieceRender key={e.id} id={e.id} type={e.type} location={e.location} color={e.color} clicked={this.clickPiece} />)
                            })
                        }
                    </section>
                </div>
                {this.state.transformOpen ? <Choose transform={(type) => this.transform(type)} color={this.props.team} /> : null}
                {this.state.end ? <Mat game={this} message={this.mat ? "Echec et mat !" : "Pat !"} /> : null}
            </section>
        </section>
    )
  }
}
