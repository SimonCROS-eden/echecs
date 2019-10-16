import React from 'react';
import Resize from '../../js/Resize';

/**
* Call only if piece isn't on game table
*/
export default class PieceRender extends React.Component {

  constructor(props) {
    super(props);
    if (this.props.displayType) this.type = this.props.displayType;
  }

  onClick = () => {}

  render() {
    let location = this.state ? this.state.location ? this.state.location : {x: 0, y: 0} : {x: 0, y: 0};
    console.log(1);
    return (
      <span onClick={this.onClick} className={"piece " + this.props.color + " " + this.type} style={{backgroundSize: (Resize.getSize(8, 6).width + "px " + Resize.getSize(8, 2).width + "px"), top: location.y * Resize.getSize(8).width + "px", left: location.x * Resize.getSize(8).width + "px", width: Resize.getSize(8).width + "px", height: Resize.getSize(8).width + "px"}}></span>
    )
  }
}
