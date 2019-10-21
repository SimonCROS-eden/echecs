import SocketIO from "socket.io-client";

export default class Socket {
    static target = "http://192.168.1.71:3001";
    static socket = null;

    static start() {
        Socket.socket = SocketIO(Socket.target);
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
