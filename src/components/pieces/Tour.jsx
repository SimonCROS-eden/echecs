import Piece from './Piece.jsx';

export default class Tour extends Piece {

  constructor(props) {
    super(props, "tour");
    this.possibilities = [{x: 999, y: 0}, {x: 0, y: 999}];
  }
}
