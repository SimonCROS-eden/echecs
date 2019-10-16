import React from 'react';
import Resize from '../js/Resize';

export default class PieceRender extends React.Component {

  constructor(props) {
    super(props);
    if (this.props.displayType) this.type = this.props.displayType;
  }

  onClick = () => {
      if (this.props.onClick) this.props.onClick(this.id);
  }

  render() {
    let location = this.props.location ? this.props.location : {x: 0, y: 0};
    return (
      <span onClick={this.onClick} className={"piece " + this.props.color + " " + this.type} style={{backgroundSize: (Resize.getSize(8, 6).width + "px " + Resize.getSize(8, 2).width + "px"), top: location.y * Resize.getSize(8).width + "px", left: location.x * Resize.getSize(8).width + "px", width: Resize.getSize(8).width + "px", height: Resize.getSize(8).width + "px"}}></span>
    )
  }
}
