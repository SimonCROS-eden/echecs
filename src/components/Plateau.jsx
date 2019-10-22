import React from 'react';
import Square from './Square.jsx';
import Rotate from '../js/Rotate';
import Resize from '../js/Resize';

export default class Plateau extends React.Component {

  constructor(props) {
    super(props);
    this.state = {squares: []};
    this.tableElement = React.createRef();
    Rotate.setGetSquareFunction(this.getSquareElementByLocation);
    let id = 0;
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        this.state.squares.push({id: id, elementRef: React.createRef(), location:{x: x, y: y}, color: (x%2 - y%2 ? "black" : "white")});
        id++;
      }
    }
    if (this.props.reverse) this.state.squares.reverse();
  }

  componentDidMount() {
      Resize.setElement(this.tableElement.current);
  }

  getSquareElementByLocation = (location) => {
      return this.state.squares.find(a => a.location.x === location.x && a.location.y === location.y).elementRef;
  }

  render() {
    return (
      <section id="plateau" ref={this.tableElement} style={Rotate.getStyle()} className={this.props.display3d ? "transform" : ""}>
        {this.state.squares.map((e, i) => {
            let prop = this.props.tableProperties.find(t => t.id === e.id);
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
            return (<Square key={i} elementRef={e.elementRef} id={e.id} display3d={this.props.display3d} selected={selected} roque={roque} glow={glow} echec={echec} attacked={attacked} location={e.location} color={e.color} />)
        })}
        <div className="numbers">
            {
                (() => {
                    let tr = [];
                    for (var i = 0; i < 8; i++) {
                        tr.push(<span key={i}>{i+1}</span>);
                    }
                    return tr;
                })()
            }
        </div>
        <div className="letters">
            {
                (() => {
                    let tr = [];
                    for (var i = 0; i < 8; i++) {
                        tr.push(<span key={i}>{String.fromCharCode(i + 65)}</span>);
                    }
                    return tr;
                })()
            }
        </div>
      </section>
    )
  }
}
