import Piece from './Piece.jsx';

export default class Roi extends Piece {

  constructor(props) {
    super(props);
    this.type = "roi";
    this.possibilities = [{x: 0, y: 1}, {x: 1, y: 1}, {x: 1, y: -0}, {x: 0, y: -1}, {x: -1, y: -1}, {x: -1, y: 0}, {x: -1, y: 1}, {x: 1, y: -1}];
  }
}
