import PieceRender from './PieceRender';

export default class Piece extends PieceRender {

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
    return true;
  }

  canAttack(search, changements, tested, a) {
    let canAttack = false;
    if (this.attackPossibilities) {
      this.attackPossibilities.forEach(e => {
        let location = {x: this.state.location.x + e.x, y: this.state.location.y + e.y};
        if (!(location.x < 0 || location.x > 7 || location.y < 0 || location.y > 7 || tested.some(e => e.x === location.x && e.y === location.y))) {
            tested.push(location);
            let element = this.props.game.getPieceAt(location, changements);
            if (element !== null) {
                if (element === search) {canAttack = true; return;};
            }
        }
      });
    } else {
      this.possibilities.forEach(e => {
        if (e.x !== 999 && e.y !== 999) {
          let location = {x: this.state.location.x + e.x, y: this.state.location.y + e.y};
          if (!(location.x < 0 || location.x > 7 || location.y < 0 || location.y > 7 || tested.some(e => e.x === location.x && e.y === location.y))) {
              tested.push(location);
              let element = this.props.game.getPieceAt(location, changements);
              if (element !== null) {
                  if (element === search) {canAttack = true; return;};
              }
          }
        } else if (e.x === 999 && e.y !== 999) {
          for (let direction = -1; direction < 2; direction+=2) {
            for (let i = 1; i < 8; i++) {
              let location = {x: this.state.location.x + (i * direction), y: this.state.location.y + e.y};
              if (location.x < 0 || location.x > 7 || location.y < 0 || location.y > 7 || tested.some(e => e.x === location.x && e.y === location.y)) continue;
              tested.push(location);
              let element = this.props.game.getPieceAt(location, changements);
              if (element !== null) {
                  if (element === search) {canAttack = true; return;};
                  break;
              }
            }
          }
        } else if (e.y === 999 && e.x !== 999) {
          for (let direction = -1; direction < 2; direction+=2) {
            for (let i = 1; i < 8; i++) {
              let location = {x: this.state.location.x + e.x, y: this.state.location.y + (i * direction)};
              if (location.x < 0 || location.x > 7 || location.y < 0 || location.y > 7 || tested.some(e => e.x === location.x && e.y === location.y)) continue;
              tested.push(location);
              let element = this.props.game.getPieceAt(location, changements, a);
              if (element !== null) {
                  if (element === search) {canAttack = true; return;};
                  break;
              }
            }
          }
        } else if (e.x === 999 && e.y === 999) {
          for (let direction = -1; direction < 2; direction+=2) {
            for (let i = 1; i < 8; i++) {
              let location = {x: this.state.location.x + (i * direction), y: this.state.location.y + (i * direction)};
              if (location.x < 0 || location.x > 7 || location.y < 0 || location.y > 7 || tested.some(e => e.x === location.x && e.y === location.y)) continue;
              tested.push(location);
              let element = this.props.game.getPieceAt(location, changements);
              if (element !== null) {
                  if (element === search) {canAttack = true; return;};
                  break;
              }
            }
          }
          for (let direction = -1; direction < 2; direction+=2) {
            for (let i = 1; i < 8; i++) {
              let location = {x: this.state.location.x - (i * direction), y: this.state.location.y + (i * direction)};
              if (location.x < 0 || location.x > 7 || location.y < 0 || location.y > 7 || tested.some(e => e.x === location.x && e.y === location.y)) continue;
              tested.push(location);
              let element = this.props.game.getPieceAt(location, changements);
              if (element !== null) {
                  if (element === search) {canAttack = true; return;};
                  break;
              }
            }
          }
        }
      });
    }
    return canAttack;
  }

  getToGlowPossibilities() {
    let movePossibilities = [];
    let attackPossibilities = [];
    this.possibilities.forEach(e => {
      if (e.x !== 999 && e.y !== 999) {
        let location = {x: this.state.location.x + e.x, y: this.state.location.y + e.y};
        if (!(location.x < 0 || location.x > 7 || location.y < 0 || location.y > 7)) {
            let element = this.props.game.getPieceAt(location);
            if (element != null) {
              if (this.attackPossibilities) return;
              if (element.props.color !== this.props.color) attackPossibilities.push(location);
            } else {
              movePossibilities.push(location);
            }
        }
      } else if (e.x === 999 && e.y !== 999) {
        for (let direction = -1; direction < 2; direction+=2) {
          for (let i = 1; i < 8; i++) {
            let location = {x: this.state.location.x + (i * direction), y: this.state.location.y + e.y};
            if (location.x < 0 || location.x > 7 || location.y < 0 || location.y > 7) continue;
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
            let location = {x: this.state.location.x + e.x, y: this.state.location.y + (i * direction)};
            if (location.x < 0 || location.x > 7 || location.y < 0 || location.y > 7) continue;
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
            if (location.x < 0 || location.x > 7 || location.y < 0 || location.y > 7) continue;
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
            if (location.x < 0 || location.x > 7 || location.y < 0 || location.y > 7) continue;
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
        let element = this.props.game.getPieceAt(location, []);
        if (element != null && element.props.color !== this.props.color) attackPossibilities.push(location);
      });
    }
    return {glows: movePossibilities, attacked: attackPossibilities, roques: [], from: this.state.location};
  }

  onClick = () => {
    if (this.props.game.state.team !== this.props.color) return;
    this.props.game.setSelected(this);
  }
}
