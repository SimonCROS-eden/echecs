import React from 'react';
import Socket from '../js/Socket';

export default class Square extends React.Component {

    onClick = () => {
        Socket.getSocket().emit("clickSquare", {id: this.props.id});
    }

  render() {
    return (
      <div onClick={this.onClick} ref={this.props.elementRef} className={"square " + this.props.color + (this.props.glow ? " glow" : "") + (this.props.selected ? " selected" : "") + (this.props.attacked ? " attacked" : "") + (this.props.echec ? " echec" : "") + (this.props.roque ? " roque" : "")}></div>
    )
  }
}
