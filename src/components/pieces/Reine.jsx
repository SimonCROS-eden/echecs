import Piece from './Piece.jsx';

export default class Reine extends Piece {

  constructor(props) {
    super(props);
    this.type = "reine";
    this.possibilities = [{x: 999, y: 999}, {x: 0, y: 999}, {x: 999, y: 0}];
  }
}
