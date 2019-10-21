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
    let p = new Player(socket);
    players.push(p);

    p.on('join', (data) => {
        if (isPlayer(data.name)) return;
        p.setName(data.name);
        p.send('name', {name: p.getName()});
        updatePlayers();
    });

    p.on('ask', (data) => {
        if (isPlayer(data.name)) {
            let dp = getPlayerFromName(data.name);
            if (!dp || dp.isInGame()) return;
            if (dp.getAsked() && dp.getAsked() === p) {
                p.setAsked(null);
                dp.setAsked(null);
                new Game(p, dp, updatePlayers);
                updatePlayers();
            } else {
                let old = p.getAsked();
                p.setAsked(dp);
                if (old) {
                    updatePlayersFor(old);
                }
                updatePlayersFor(dp);
            }
        }
    });

    p.on('disconnect', (data) => {
        if (p.isInGame()) p.getGame().stop(p);
        players = players.filter(e => e !== p);
        updatePlayers();
    });

    p.on('updatePlayers', () => {
        updatePlayersFor(p);
    });
});

var updatePlayers = () => {
    players.forEach(pl => {
        if (pl.isInGame() || !pl.isReady()) return;
        updatePlayersFor(pl);
    });
}

function updatePlayersFor(pl) {
    pl.send('players', {players: players.filter(e => e.isReady() && e !== pl).map(e => {return {name: e.getName(), inGame: e.isInGame(), asked: (e.getAsked() === pl)}})});
}

function getPlayerFromName(name) {
    return players.find(pl => pl.isReady() && pl.getName() === name);
}

function isPlayer(name) {
    return players.some(pl => pl.isReady() && pl.getName() === name);
}

server.listen(3001, function() {
    console.log('Serveur connecte sur le port 3001');
});
