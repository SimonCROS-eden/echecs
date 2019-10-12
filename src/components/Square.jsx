import React from 'react';

export default class Square extends React.Component {

  onClick = () => {
    if (!this.props.glow && !this.props.attacked) return;
    if (this.props.attacked) {
      this.props.game.kill(this.props.game.getPieceAt(this.props.location));
    }
    this.props.game.getSelected().move(this.props.location);
    this.props.game.next();
  }

  render() {
    return (
      <div onClick={this.onClick} className={"square " + this.props.color + (this.props.glow ? " glow" : "") + (this.props.selected ? " selected" : "") + (this.props.attacked ? " attacked" : "") + (this.props.echec ? " echec" : "")}></div>
    )
  }
}
