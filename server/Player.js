class Player {

    color = "";

    constructor(socket) {
        this.setSocket(socket);
    }

    setSocket(socket) {
        this.socket = socket;
    }

    getSocket() {
        return this.socket;
    }

    on(evt, callback) {
        this.getSocket().on(evt, data => callback(data, this));
    }

    send(message, content) {
        this.socket.emit(message, content);
    }
}

exports.Player = Player;
