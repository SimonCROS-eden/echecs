import React from 'react';

export default class Piece extends React.Component {

  constructor(props) {
    super();
    this.state={location: props.location}
  }

  move(location) {
    this.setState({location: location});
  }

  componentDidMount() {
    this.glowPossibilities();
  }

  glowPossibilities() {
    let allPossibilities = [];
    this.possibilities.forEach(e => {
      if (e.x !== 999 && e.y !== 999) {
        allPossibilities.push({x: this.state.location.x + e.x, y: this.state.location.y + e.y});
      } else if (e.x === 999 && e.y !== 999) {
        for (let i = 0; i < 8; i++) {
          allPossibilities.push({x: i, y: this.state.location.y + e.y});
          allPossibilities.push({x: i, y: this.state.location.y - e.y});
        }
      } else if (e.y === 999 && e.x !== 999) {
        for (let i = 0; i < 8; i++) {
          allPossibilities.push({y: i, x: this.state.location.x + e.x});
          allPossibilities.push({y: i, x: this.state.location.x - e.x});
        }
      } else if (e.x === 999 && e.y === 999) {
        for (let i = -8; i < 8; i++) {
          allPossibilities.push({x: this.state.location.x + i, y: this.state.location.y + i});
          allPossibilities.push({x: this.state.location.x - i, y: this.state.location.y + i});
        }
      }
    })
    this.props.plateau.current.glow(allPossibilities);
  }

  render() {
    return (
      <span className={"piece " + this.color + " " + this.type} style={{top: this.state.location.y + "px", left: this.state.location.x + "px"}}></span>
    )
  }
}
