import React from 'react';
import Socket from '../js/Socket';

export default class Square extends React.Component {$

    onClick = () => {
        Socket.getSocket().emit("square", {id: this.props.id});
    }

  render() {
    return (
      <div onClick={this.onClick} className={"square " + this.props.color + (this.props.glow ? " glow" : "") + (this.props.selected ? " selected" : "") + (this.props.attacked ? " attacked" : "") + (this.props.echec ? " echec" : "") + (this.props.roque != null ? " roque" : "")}></div>
    )
  }
}
