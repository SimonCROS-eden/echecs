import Piece from './Piece.jsx';

export default class Roi extends Piece {

  constructor(props) {
    super(props, "roi");
    this.possibilities = [{x: 0, y: 1}, {x: 1, y: 1}, {x: 1, y: -0}, {x: 0, y: -1}, {x: -1, y: -1}, {x: -1, y: 0}, {x: -1, y: 1}, {x: 1, y: -1}];
  }

  getToGlowPossibilities() {
    let roque = this.checkForRoque();
    let result = super.getToGlowPossibilities();
    result.roques = roque;
    return result;
  }

  checkForRoque() {
    let roques = [];
    if (this.movements === 0) {
      if (!this.props.game.isTeamInEchec(this.props.color)) {
        let leftTour = this.props.game.getPieceAt({x: 0, y: this.state.location.y});
        let rightTour = this.props.game.getPieceAt({x: 7, y: this.state.location.y});
        if (leftTour != null && leftTour.movements === 0) {
          if (this.props.game.getPieceAt({x: 3, y: this.state.location.y}) == null && this.props.game.getPieceAt({x: 2, y: this.state.location.y}) == null && this.props.game.getPieceAt({x: 1, y: this.state.location.y}) == null) {
            if (!this.props.game.isTeamInEchec(this.props.color, [{element: this, newPosition: {x: 3, y: this.state.location.y}}]) && !this.props.game.isTeamInEchec(this.props.color, [{element: this, newPosition: {x: 2, y: this.state.location.y}}])) {
              roques.push({king: this, tour: leftTour, kingLocation: {x: 2, y: this.state.location.y}, tourLocation: {x: 3, y: this.state.location.y}});
            }
          }
        }
        if (rightTour != null && rightTour.movements === 0) {
          if (this.props.game.getPieceAt({x: 5, y: this.state.location.y}) == null && this.props.game.getPieceAt({x: 6, y: this.state.location.y}) == null) {
            if (!this.props.game.isTeamInEchec(this.props.color, [{element: this, newPosition: {x: 5, y: this.state.location.y}}]) && !this.props.game.isTeamInEchec(this.props.color, [{element: this, newPosition: {x: 6, y: this.state.location.y}}])) {
              roques.push({king: this, tour: rightTour, kingLocation: {x: 6, y: this.state.location.y}, tourLocation: {x: 5, y: this.state.location.y}});
            }
          }
        }
      }
    }
    return roques;
  }
}
