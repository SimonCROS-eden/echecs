class Square {

    attacked = false;
    roque = null;
    glow = false;
    echec = false;
    selected = false;

    constructor(location, id) {
        this.location = location;
        this.id = id;
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
