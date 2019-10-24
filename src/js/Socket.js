import SocketIO from "socket.io-client";

export default class Socket {
    static socket = null;
    static connected = false;

    static start(callback, askServer) {
        let url_string = window.location.href
        let url = new URL(url_string);
        let c = url.searchParams.get("server");
        let target = c;
        if (target === null) {
            askServer();
            return;
        }
        Socket.socket = SocketIO(target);
        Socket.socket.on('connect', () => {
            Socket.connected = true;
            callback();
        });
        Socket.socket.on('disconnect', () => {
            alert("Connexion au serveur perdue ;(");
            Socket.socket.disconnect();
        });
        Socket.socket.on('connect_error', () => {
            Socket.socket.disconnect();
            console.log('Failed to connect to server');
        });
    }

    static on(evt, callback) {
        Socket.socket.on(evt, data => callback(data));
    }

    static send(message, content) {
        Socket.getSocket().emit(message, content);
    }

    static getSocket() {
        return Socket.socket;
    }
}
