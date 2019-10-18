class Piece {
    constructor(location, color, type, game) {
        this.color = color;
        this.alive = true;
        this.location = location;
        this.movements = 0;
        this.type = type;
        this.game = game;
        this.id = game.getNewId();
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
                let location = {x: this.location.x + e.x, y: this.location.y + e.y};
                console.log(location, search.location);
                if (!(location.x < 0 || location.x > 7 || location.y < 0 || location.y > 7 || tested.some(e => e.x === location.x && e.y === location.y))) {
                    tested.push(location);
                    let element = this.game.getPieceAt(location, changements);
                    if (element !== null) {
                        if (element === search) {canAttack = true; return;};
                    }
                }
            });
        } else {
            this.possibilities.forEach(e => {
                let start = e.start || 1;
                for (let i = start; i < (e.width + start); i++) {
                    let location = {x: this.location.x + (e.x * i), y: this.location.y + (e.y * i)};
                    if (location.x < 0 || location.x > 7 || location.y < 0 || location.y > 7 || tested.some(e => e.x === location.x && e.y === location.y)) continue;
                    tested.push(location);
                    let element = this.game.getPieceAt(location, changements);
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
                let location = {x: this.location.x + (e.x * i), y: this.location.y + (e.y * i)};
                if (location.x < 0 || location.x > 7 || location.y < 0 || location.y > 7) continue;
                let element = this.game.getPieceAt(location);
                if (location.x === this.location.x && location.y === this.location.y) continue;
                if (element != null) {
                    if (element.color !== this.color && !this.attackPossibilities) attackPossibilities.push(location);
                    break;
                }
                movePossibilities.push(location);
            }
        });
        if (this.attackPossibilities) {
          this.attackPossibilities.forEach(e => {
            let location = {x: this.location.x + e.x, y: this.location.y + e.y};
            let element = this.game.getPieceAt(location, []);
            if (element != null && element.color !== this.color) attackPossibilities.push(location);
          });
        }
        return {glows: movePossibilities, attacked: attackPossibilities, roques: [], from: this.location};
    }

    toJSON() {
        return {id: this.id, type: this.type, color: this.color, location: this.location}
    }
}

exports.Piece = Piece;
