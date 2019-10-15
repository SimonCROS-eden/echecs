import Piece from './Piece.jsx';

export default class Reine extends Piece {

  constructor(props) {
    super(props, "reine");
    this.possibilities = [{x: 0, y: 1, width: 7}, {x: 1, y: 1, width: 7}, {x: 1, y: -0, width: 7}, {x: 0, y: -1, width: 7}, {x: -1, y: -1, width: 7}, {x: -1, y: 0, width: 7}, {x: -1, y: 1, width: 7}, {x: 1, y: -1, width: 7}];
  }
}
