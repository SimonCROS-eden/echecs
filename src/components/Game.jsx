import React from 'react';
import Plateau from './Plateau';
import Choose from './Choose';
import End from './End';
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
    this.state = {transformOpen: false, pieces: [], tableProperties: [], end: false, endTitle: "", endMessage: ""};
    Socket.on("tableUpdate", data => this.setState({tableProperties: data.tableProperties}));
    Socket.on("update", data => this.setState({pieces: data.pieces, tableProperties: data.tableProperties, transformOpen: false}));
    Socket.on("transform", data => this.setState({transformOpen: true}));
    Socket.on("end", data => {this.setState({end: true, endTitle: data.title, endMessage: data.message})});
  }

  componentDidMount() {
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
            <section id="game" style={{width: Resize.getContainerWidth() + "px", height: Resize.getContainerWidth() + "px"}} onContextMenu={evt => evt.preventDefault()} onTouchStart={Rotate.onClickStart} onTouchMove={Rotate.onMove} onTouchEnd={Rotate.onClickEnd} onMouseDown={Rotate.onClickStart} onMouseMove={Rotate.onMove} onMouseUp={Rotate.onClickEnd} className={this.props.team}>
                <div id="tableContainer" ref={this.tableElement} >
                    <section ref={this.wrapperElement} className={"wrapper " + this.props.team}>
                        <Plateau display3d={this.props.display3d} game={this} ref={this.plateau} tableProperties={this.state.tableProperties} />
                        {
                            this.state.pieces.map(e => {
                                return (<PieceRender display3d={this.props.display3d} key={e.id} id={e.id} type={e.type} location={e.location} color={e.color} clicked={this.clickPiece} />)
                            })
                        }
                    </section>
                </div>
                {this.state.end ? <End quit={this.props.quit} title={this.state.endTitle} message={this.state.endMessage} /> : null}
                {this.state.transformOpen && !this.state.end ? <Choose transform={(type) => this.transform(type)} color={this.props.team} /> : null}
            </section>
        </section>
    )
  }
}
