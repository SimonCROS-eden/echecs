import React from 'react';

export default class Square extends React.Component {

  onClick = () => {
    if (!this.props.glow && !this.props.attacked && !this.props.roque) return;
    if (this.props.attacked) {
      this.props.game.kill(this.props.game.getPieceAt(this.props.location));
    }
    if (this.props.roque) {
      this.props.roque.king.move(this.props.roque.kingLocation);
      this.props.roque.tour.move(this.props.roque.tourLocation);
      this.props.game.next();
      return;
    }
    if (this.props.game.getSelected().move(this.props.location)) {
      this.props.game.next();
    } else {
      this.props.game.showTransform();
    }
  }

  render() {
    return (
      <div onClick={this.onClick} className={"square " + this.props.color + (this.props.glow ? " glow" : "") + (this.props.selected ? " selected" : "") + (this.props.attacked ? " attacked" : "") + (this.props.echec ? " echec" : "") + (this.props.roque != null ? " roque" : "")}></div>
    )
  }
}
