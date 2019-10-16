class Piece {
    constructor(location, color) {
        this.color = color;
        this.alive = true;
        this.location = location;
        this.movements = 0;
    }

    move(location) {
        this.movements++;
        this.location = location;
        return true;
    }

    canAttack(search, changements, tested) {
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
                let start = e.start || 1;
                for (let i = start; i < (e.width + start); i++) {
                    let location = {x: this.state.location.x + (e.x * i), y: this.state.location.y + (e.y * i)};
                    if (location.x < 0 || location.x > 7 || location.y < 0 || location.y > 7 || tested.some(e => e.x === location.x && e.y === location.y)) continue;
                    tested.push(location);
                    let element = this.props.game.getPieceAt(location, changements);
                    if (element !== null) {
                        if (element === search) {canAttack = true; return;};
                        break;
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
            let start = e.start || 1;
            for (let i = start; i < (e.width + start); i++) {
                let location = {x: this.state.location.x + (e.x * i), y: this.state.location.y + (e.y * i)};
                if (location.x < 0 || location.x > 7 || location.y < 0 || location.y > 7) continue;
                let element = this.props.game.getPieceAt(location);
                if (location.x === this.state.location.x && location.y === this.state.location.y) continue;
                if (element != null) {
                    if (element.props.color !== this.props.color && !this.attackPossibilities) attackPossibilities.push(location);
                    break;
                }
                movePossibilities.push(location);
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
}

exports.Piece = Piece;
