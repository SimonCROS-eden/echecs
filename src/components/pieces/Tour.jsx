import Piece from './Piece.jsx';

export default class Tour extends Piece {

  constructor(props) {
    super(props, "tour");
    this.possibilities = [{x: 1, y: 0, width: 7}, {x: 0, y: -1, width: 7}, {x: -1, y: 0, width: 7}, {x: 0, y: 1, width: 7}];
  }
}
