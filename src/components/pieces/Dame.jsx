import Piece from './Piece.jsx';

export default class Dame extends Piece {

  constructor(props) {
    super(props);
    this.type = "dame";
    this.possibilities = [{x: 999, y: 999}, {x: 0, y: 999}, {x: 999, y: 0}];
  }
}
