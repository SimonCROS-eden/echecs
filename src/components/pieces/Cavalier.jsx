import Piece from './Piece.jsx';

export default class Cavalier extends Piece {

  constructor(props) {
    super(props, "cavalier");
    this.possibilities = [{x: 1, y: 2, width: 1}, {x: -1, y: 2, width: 1}, {x: -1, y: -2, width: 1}, {x: 1, y: -2, width: 1}, {x: 2, y: 1, width: 1}, {x: -2, y: 1, width: 1}, {x: -2, y: -1, width: 1}, {x: 2, y: -1, width: 1}];
  }
}
