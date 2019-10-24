import React from 'react';
import Resize from '../js/Resize';
import Rotate from '../js/Rotate';

export default class PieceRender extends React.Component {

  constructor(props) {
    super(props);
    if (!this.type) this.type = this.props.type;
  }

  onClick = () => {
      if (this.props.clicked) this.props.clicked(this.props.id);
  }

  render() {
    let location = this.props.location ? this.props.location : {x: 0, y: 0};
    if (this.props.reverse && !this.props.display3d) location = {x: 7 - this.props.location.x, y: 7 - this.props.location.y};
    let style = {backgroundSize: (Resize.getSize(8, 6).width + "px " + Resize.getSize(8, 2).width + "px"), top: location.y * Resize.getSize(8).width + 20 + "px", left: location.x * Resize.getSize(8).width + 20 + "px", width: Resize.getSize(8).width + "px", height: Resize.getSize(8).width + "px"};
    return (
      <span onClick={this.onClick} className={"piece " + this.props.color + " " + this.type + (this.props.display3d ? " display3d" : "")} style={this.props.display3d ? Rotate.getPicecStyle(location) : style}></span>
    )
  }
}
