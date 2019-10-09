import Piece from './Piece.jsx';

export default class Fou extends Piece {

  constructor(props) {
    super(props);
    this.type = "fou";
    this.possibilities = [{x: 999, y: 999}];
  }
}
