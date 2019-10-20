class Square {

    constructor(location, id) {
        this.location = location;
        this.id = id;

        this.attacked = false;
        this.roque = null;
        this.glow = false;
        this.echec = false;
        this.selected = false;
    }

    setGlow(glow) {
        this.glow = glow;
    }

    setSelected(selected) {
        this.selected = selected;
    }

    setEchec(selected) {
        this.echec = echec;
    }

    setRoque(roque) {
        this.roque = roque;
    }

    setAttacked(attacked) {
        this.attacked = attacked;
    }

    getLocation() {
        return this.location;
    }

    isDefault() {
        return !this.attacked && this.roque === null && !this.selected && !this.glow && !this.echec;
    }

    toJSON() {
        return {id: this.id, attacked: this.attacked, roque: this.roque, glow: this.glow, echec: this.echec, selected: this.selected};
    }
}

exports.Square = Square;
