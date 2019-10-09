import React from 'react';

export default class Square extends React.Component {

  state={
    glow: false
  }

  glow() {
    this.setState({glow: true});
  }

  unglow() {
    this.setState({glow: false});
  }

  render() {
    return (
      <div className={"square " + this.props.color + (this.props.glow ? " glow" : "")}></div>
    )
  }
}
