import Piece from './Piece.jsx';

export default class Pion extends Piece {

  constructor(props) {
    super(props);
    this.type = "pion";
    this.possibilities = [{x: 0, y: 1}, {x: 0, y: 2}];
    this.attackPossibilities = [{x: 1, y: 1}, {x: -1, y: 1}]
  }
}
