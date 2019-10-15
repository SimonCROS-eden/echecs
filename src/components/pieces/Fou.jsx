import Piece from './Piece.jsx';

export default class Fou extends Piece {

  constructor(props) {
    super(props, "fou");
    this.possibilities = [{x: 1, y: 1, width: 7}, {x: 1, y: -1, width: 7}, {x: -1, y: -1, width: 7}, {x: -1, y: 1, width: 7}];
  }
}
