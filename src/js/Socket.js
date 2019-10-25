import SocketIO from "socket.io-client";

export default class Socket {
    static socket = null;
    static connected = false;
    static connecting = true;

    static start(callback, askServer, invalid, disconnect) {
        let url_string = window.location.href
        let url = new URL(url_string);
        let c = url.searchParams.get("server");
        let target = c;
        if (target === null) {
            Socket.connecting = false;
            askServer();
            return;
        }
        window.history.replaceState({server: "server"}, "", window.location.href.split("%3A").join(':').split("%2F").join("/"));
        Socket.socket = SocketIO(target);
        Socket.socket.on('connect', () => {
            Socket.connected = true;
            Socket.connecting = false;
            callback();
        });
        Socket.socket.on('disconnect', () => {
            Socket.socket.disconnect();
            Socket.connected = false;
            Socket.connecting = false;
            disconnect(target.split("%3A").join(':').split("%2F").join("/"));
        });
        Socket.socket.on('connect_error', () => {
            Socket.socket.disconnect();
            Socket.connected = false;
            Socket.connecting = false;
            invalid(target.split("%3A").join(':').split("%2F").join("/"));
        });
    }

    static removeAllListeners(listener) {
        if (Socket.getSocket()) Socket.getSocket().removeAllListeners(listener);
    }

    static on(evt, callback) {
        if (Socket.getSocket()) Socket.socket.on(evt, data => callback(data));
    }

    static send(message, content) {
        if (Socket.getSocket()) Socket.getSocket().emit(message, content);
    }

    static getSocket() {
        return Socket.socket;
    }
}
