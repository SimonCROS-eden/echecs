class Player {

    constructor(socket) {
        this.color = "";
        this.game = null;
        this.ready = false;
        this.asked = null;
        this.setSocket(socket);
    }

    setSocket(socket) {
        this.socket = socket;
    }

    getSocket() {
        return this.socket;
    }

    isReady() {
        return this.ready;
    }

    setAsked(player) {
        this.asked = player;
    }

    getAsked() {
        return this.asked;
    }

    setName(name) {
        this.ready = true;
        this.name = name;
    }

    getName() {
        return this.name;
    }

    on(evt, callback) {
        this.getSocket().on(evt, data => callback(data, this));
    }

    removeListener(listener) {
        this.getSocket().removeAllListeners(listener);
    }

    send(message, content) {
        this.socket.emit(message, content);
    }

    isInGame() {
        return this.game !== null;
    }

    setGame(game) {
        this.game = game;
    }

    getGame() {
        return this.game;
    }
}

exports.Player = Player;
