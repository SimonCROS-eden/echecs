import React from 'react';

export default class Piece extends React.Component {

  constructor(props, type) {
    super(props);
    this.type = type;
    this.state={location: props.defaultLocation};
    this.id = props.registerId;
    props.game.register(this, this.id);
    this.movements = 0;
  }

  move(location) {
    this.movements++;
    this.setState({location: location});
  }

  canAttack(location, changements) {
    if (this.attackPossibilities) {
      this.attackPossibilities.forEach(e => {
        let location = {x: this.state.location.x + e.x, y: this.state.location.y + e.y};
        if (this.props.game.getPieceAt(location, changements) != null && this.props.game.getPieceAt(location, changements).props.color !== this.props.color) return true;
      });
    } else {
      this.possibilities.forEach(e => {
        if (e.x !== 999 && e.y !== 999) {
          let location = {x: this.state.location.x + e.x, y: this.state.location.y + e.y};
          let element = this.props.game.getPieceAt(location, changements);
          if (element != null && element.props.color !== this.props.color) return true;
        } else if (e.x === 999 && e.y !== 999) {
          for (let direction = -1; direction < 2; direction+=2) {
            for (let i = 1; i < 8; i++) {
              let location = {x: this.state.location.x + (i * direction), y: this.state.location.y + e.y};
              let element = this.props.game.getPieceAt(location, changements);
              if (element != null && element.props.color !== this.props.color) return true;
            }
          }
        } else if (e.y === 999 && e.x !== 999) {
          for (let direction = -1; direction < 2; direction+=2) {
            for (let i = 1; i < 8; i++) {
              let location = {y: this.state.location.y + (i * direction), x: this.state.location.x + e.x};
              let element = this.props.game.getPieceAt(location, changements);
              if (element != null && element.props.color !== this.props.color) return true;
            }
          }
        } else if (e.x === 999 && e.y === 999) {
          for (let direction = -1; direction < 2; direction+=2) {
            for (let i = 1; i < 8; i++) {
              let location = {x: this.state.location.x + (i * direction), y: this.state.location.y + (i * direction)};
              let element = this.props.game.getPieceAt(location, changements);
//              console.log(element);
              if (element != null && element.props.color !== this.props.color) return true;
            }
          }
          for (let direction = -1; direction < 2; direction+=2) {
            for (let i = 1; i < 8; i++) {
              let location = {x: this.state.location.x - (i * direction), y: this.state.location.y + (i * direction)};
              let element = this.props.game.getPieceAt(location, changements);
              if (element != null && element.props.color !== this.props.color) return true;
            }
          }
        }
      });
    }
    return false;
  }

  getToGlowPossibilities() {
    let movePossibilities = [];
    let attackPossibilities = [];
    this.possibilities.forEach(e => {
      if (e.x !== 999 && e.y !== 999) {
        let location = {x: this.state.location.x + e.x, y: this.state.location.y + e.y};
        let element = this.props.game.getPieceAt(location);
        if (element != null) {
          if (this.attackPossibilities) return;
          if (element.props.color !== this.props.color) attackPossibilities.push(location);
        } else {
          movePossibilities.push(location);
        }
      } else if (e.x === 999 && e.y !== 999) {
        for (let direction = -1; direction < 2; direction+=2) {
          for (let i = 1; i < 8; i++) {
            let location = {x: this.state.location.x + (i * direction), y: this.state.location.y + e.y};
            let element = this.props.game.getPieceAt(location);
            if (location.x === this.state.location.x && location.y === this.state.location.y) continue;
            if (element != null) {
              if (element.props.color !== this.props.color) attackPossibilities.push(location);
              break;
            }
            movePossibilities.push(location);
          }
        }
      } else if (e.y === 999 && e.x !== 999) {
        for (let direction = -1; direction < 2; direction+=2) {
          for (let i = 1; i < 8; i++) {
            let location = {y: this.state.location.y + (i * direction), x: this.state.location.x + e.x};
            let element = this.props.game.getPieceAt(location);
            if (location.x === this.state.location.x && location.y === this.state.location.y) continue;
            if (element != null) {
              if (element.props.color !== this.props.color) attackPossibilities.push(location);
              break;
            }
            movePossibilities.push(location);
          }
        }
      } else if (e.x === 999 && e.y === 999) {
        for (let direction = -1; direction < 2; direction+=2) {
          for (let i = 1; i < 8; i++) {
            let location = {x: this.state.location.x + (i * direction), y: this.state.location.y + (i * direction)};
            let element = this.props.game.getPieceAt(location);
            if (location.x === this.state.location.x && location.y === this.state.location.y) continue;
            if (element != null) {
              if (element.props.color !== this.props.color) attackPossibilities.push(location);
              break;
            }
            movePossibilities.push(location);
          }
        }
        for (let direction = -1; direction < 2; direction+=2) {
          for (let i = 1; i < 8; i++) {
            let location = {x: this.state.location.x - (i * direction), y: this.state.location.y + (i * direction)};
            let element = this.props.game.getPieceAt(location);
            if (location.x === this.state.location.x && location.y === this.state.location.y) continue;
            if (element != null) {
              if (element.props.color !== this.props.color) attackPossibilities.push(location);
              break;
            }
            movePossibilities.push(location);
          }
        }
      }
    });
    if (this.attackPossibilities) {
      this.attackPossibilities.forEach(e => {
        let location = {x: this.state.location.x + e.x, y: this.state.location.y + e.y};
        let element = this.props.game.getPieceAt(location);
        if (element != null && element.props.color !== this.props.color) attackPossibilities.push(location);
      });
    }
    return {glows: movePossibilities, attacked: attackPossibilities, from: this.state.location};
  }

  onClick = () => {
    if (this.props.game.state.team !== this.props.color) return;
    this.props.game.setSelected(this);
  }

  render() {
    return (
      <span onClick={this.onClick} className={"piece " + this.props.color + " " + this.type} style={{top: this.state.location.y * 102.63 + "px", left: this.state.location.x * 102.63 + "px"}}></span>
    )
  }
}
