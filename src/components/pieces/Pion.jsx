import Piece from './Piece.jsx';

export default class Pion extends Piece {

  constructor(props) {
    super(props, "pion");

    if (props.color === "white") {
      this.possibilities = [{x: 0, y: -1}, {x: 0, y: -2}];
      this.attackPossibilities = [{x: 1, y: -1}, {x: -1, y: -1}]
    } else {
      this.possibilities = [{x: 0, y: 1}, {x: 0, y: 2}];
      this.attackPossibilities = [{x: 1, y: 1}, {x: -1, y: 1}]
    }
  }

  getToGlowPossibilities() {
    if (this.movements > 0) {
      if (this.props.color === "white") {
        this.possibilities = [{x: 0, y: -1}];
      } else {
        this.possibilities = [{x: 0, y: 1}];
      }
    }
    return super.getToGlowPossibilities();
  }
}
