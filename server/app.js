var http = require('http');
var fs = require('fs');
var Player = require('./Player.js').Player;
var Game = require('./Game.js').Game;

var players = [];

console.log('Demarrage...');

var server = http.createServer();

// Chargement de socket.io
var io = require('socket.io').listen(server);
io.set('origins', '*:*');

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function(socket) {
    players.push(new Player(socket));
    console.log("Connexion");
    if (players.length === 2) {
        new Game(players[0], players[1]);
    }
});

server.listen(3001, function() {
    console.log('Serveur connecte sur le port 3001');
});
